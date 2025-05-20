import { Head } from '@inertiajs/react';
import { Package, User } from '@/types';
import AppLayout from '@/layouts/app-layout';
import PackageLayout from '@/layouts/package/layout';
import { type BreadcrumbItem } from '@/types';

interface ShowProps {
    package: Package;
    user: User;
}

export default function Show({ package: pkg, user }: ShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Packages',
            href: '/packages',
        },
        {
            title: pkg.name,
            href: `/packages/${pkg.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={pkg.name} />
            <PackageLayout>
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 bg-white border-b border-gray-200">
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h2 className="text-2xl font-bold">{pkg.name}</h2>
                                        <p className="text-gray-600">{pkg.short_description}</p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <a
                                            href={route('packages.edit', pkg)}
                                            className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:border-indigo-900 focus:ring ring-indigo-300 disabled:opacity-25 transition ease-in-out duration-150"
                                        >
                                            Edit Package
                                        </a>
                                        <a
                                            href={route('packages.modules.create', pkg)}
                                            className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 active:bg-green-900 focus:outline-none focus:border-green-900 focus:ring ring-green-300 disabled:opacity-25 transition ease-in-out duration-150"
                                        >
                                            Add Module
                                        </a>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="md:col-span-2">
                                        <div className="mb-6">
                                            <h3 className="text-lg font-semibold mb-2">Description</h3>
                                            <p className="text-gray-600">{pkg.description}</p>
                                        </div>

                                        <div className="mb-6">
                                            <h3 className="text-lg font-semibold mb-2">Modules</h3>
                                            <div className="space-y-4">
                                                {pkg.modules.map((module) => (
                                                    <div
                                                        key={module.id}
                                                        className="border rounded-lg p-4"
                                                    >
                                                        <div className="flex justify-between items-start mb-2">
                                                            <h4 className="text-lg font-medium">
                                                                {module.title}
                                                            </h4>
                                                            <div className="flex space-x-2">
                                                                <a
                                                                    href={route(
                                                                        'packages.modules.edit',
                                                                        [pkg, module]
                                                                    )}
                                                                    className="text-indigo-600 hover:text-indigo-900"
                                                                >
                                                                    Edit
                                                                </a>
                                                                <a
                                                                    href={route(
                                                                        'packages.modules.contents.create',
                                                                        [pkg, module]
                                                                    )}
                                                                    className="text-green-600 hover:text-green-900"
                                                                >
                                                                    Add Content
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <p className="text-gray-600 mb-2">
                                                            {module.description}
                                                        </p>
                                                        <div className="text-sm text-gray-500">
                                                            Duration: {module.estimated_duration_days}{' '}
                                                            days
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="bg-gray-50 rounded-lg p-6">
                                            <h3 className="text-lg font-semibold mb-4">
                                                Package Details
                                            </h3>
                                            <div className="space-y-2">
                                                <div>
                                                    <span className="text-gray-600">Price:</span>
                                                    <span className="ml-2 font-semibold">
                                                        ${pkg.price}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-600">
                                                        Billing Cycle:
                                                    </span>
                                                    <span className="ml-2 font-semibold">
                                                        {pkg.billing_cycle}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-600">
                                                        Duration:
                                                    </span>
                                                    <span className="ml-2 font-semibold">
                                                        {pkg.duration_weeks} weeks
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-600">
                                                        Max Clients:
                                                    </span>
                                                    <span className="ml-2 font-semibold">
                                                        {pkg.max_clients || 'Unlimited'}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-600">Status:</span>
                                                    <span
                                                        className={`ml-2 font-semibold ${
                                                            pkg.is_published
                                                                ? 'text-green-600'
                                                                : 'text-gray-600'
                                                        }`}
                                                    >
                                                        {pkg.is_published ? 'Published' : 'Draft'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </PackageLayout>
        </AppLayout>
    );
} 
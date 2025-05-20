import { Head } from '@inertiajs/react';
import { Package, User } from '@/types';
import AppLayout from '@/layouts/app-layout';
import PackageLayout from '@/layouts/package/layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

interface IndexProps {
    packages: {
        data: Package[];
        links: any[];
    };
    user: User;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Packages',
        href: '/packages',
    },
];

export default function Index({ packages, user }: IndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="All Packages" />
            <PackageLayout>
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">All Packages</h2>
                    <p className="text-muted-foreground">
                        Manage your packages and their content
                    </p>
                </div>

                <div className="space-y-4">
                    {packages.data.map((pkg) => (
                        <div key={pkg.id} className="rounded-lg border bg-card text-card-foreground shadow-sm">
                            <div className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-medium">{pkg.name}</h3>
                                        <p className="text-sm text-muted-foreground">{pkg.short_description}</p>
                                    </div>
                                    <Button variant="ghost" asChild>
                                        <Link href={route('packages.show', pkg)}>
                                            View Details
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </PackageLayout>
        </AppLayout>
    );
} 
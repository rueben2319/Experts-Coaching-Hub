import { Head } from '@inertiajs/react';
import { Package, User } from '@/types';
import AppLayout from '@/layouts/app-layout';
import PackageLayout from '@/layouts/package/layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import HeadingSmall from '@/components/heading-small';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';

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
    const { auth } = usePage().props;
    const isCoach = auth.user?.role?.name === 'coach';

    useEffect(() => {
        console.log('Packages:', packages);
        console.log('User:', user);
        console.log('Auth:', auth);
    }, [packages, user, auth]);

    if (!packages?.data) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="All Packages" />
                <PackageLayout>
                    <div className="space-y-6">
                        <HeadingSmall 
                            title="All Packages" 
                            description="Loading packages..."
                        />
                    </div>
                </PackageLayout>
            </AppLayout>
        );
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="All Packages" />
            <PackageLayout>
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <HeadingSmall 
                            title="All Packages" 
                            description="Browse and manage coaching packages"
                        />
                        {isCoach && (
                            <Button asChild>
                                <Link href={route('packages.create')}>Create Package</Link>
                            </Button>
                        )}
                    </div>

                    <div className="grid gap-4">
                        {packages.data.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-muted-foreground">No packages found.</p>
                            </div>
                        ) : (
                            packages.data.map((pkg) => (
                                <div key={pkg.id} className="rounded-lg border bg-card text-card-foreground shadow-sm">
                                    <div className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-1">
                                                <h3 className="text-lg font-medium">{pkg.name}</h3>
                                                <p className="text-sm text-muted-foreground">{pkg.short_description}</p>
                                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                    <span>Price: ${pkg.price}</span>
                                                    <span>•</span>
                                                    <span>Duration: {pkg.duration_weeks} weeks</span>
                                                    <span>•</span>
                                                    <span>Billing: {pkg.billing_cycle}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {isCoach && pkg.coach_id === auth.user?.coachProfile?.id && (
                                                    <Button variant="outline" asChild>
                                                        <Link href={route('packages.edit', pkg)}>
                                                            Edit
                                                        </Link>
                                                    </Button>
                                                )}
                                                <Button variant="ghost" asChild>
                                                    <Link href={route('packages.show', pkg)}>
                                                        View Details
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </PackageLayout>
        </AppLayout>
    );
} 
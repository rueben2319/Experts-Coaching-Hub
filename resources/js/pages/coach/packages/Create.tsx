import { Head, useForm } from '@inertiajs/react';
import { Package, User } from '@/types';
import AppLayout from '@/layouts/app-layout';
import PackageLayout from '@/layouts/package/layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Link } from '@inertiajs/react';
import HeadingSmall from '@/components/heading-small';
import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { PageProps as InertiaPageProps } from '@inertiajs/core';

interface PageProps extends InertiaPageProps {
    auth: {
        user: {
            role?: {
                name: string;
            };
        };
    };
    [key: string]: any;
}

interface CreateProps {
    user: User;
}

type BillingCycle = 'one-time' | 'monthly' | 'yearly';

interface PackageFormData {
    name: string;
    description: string;
    short_description: string;
    price: string;
    billing_cycle: BillingCycle;
    duration_weeks: string;
    max_clients: string;
    is_published: boolean;
    is_featured: boolean;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Packages',
        href: '/coach/packages',
    },
    {
        title: 'Create Package',
        href: '/coach/packages/create',
    },
];

export default function Create({ user }: CreateProps) {
    const { auth } = usePage<PageProps>().props;
    const isCoach = auth.user?.role?.name === 'coach';

    useEffect(() => {
        if (!isCoach) {
            window.location.href = route('coach.packages.index');
        }
    }, [isCoach]);

    const initialData: PackageFormData = {
        name: '',
        description: '',
        short_description: '',
        price: '',
        billing_cycle: 'one-time',
        duration_weeks: '',
        max_clients: '',
        is_published: false,
        is_featured: false,
    };

    const { data, setData, post, processing, errors } = useForm<PackageFormData>(initialData);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('coach.packages.store'), {
            onSuccess: () => {
                // Reset form after successful submission
                setData(initialData);
            },
        });
    };

    if (!isCoach) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Access Denied" />
                <PackageLayout>
                    <div className="space-y-6">
                        <HeadingSmall 
                            title="Access Denied" 
                            description="You must be a coach to create packages."
                        />
                        <Button asChild>
                            <Link href={route('coach.packages.index')}>Back to Packages</Link>
                        </Button>
                    </div>
                </PackageLayout>
            </AppLayout>
        );
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Package" />
            <PackageLayout>
                <div className="space-y-6">
                    <HeadingSmall 
                        title="Create Package" 
                        description="Create a new package for your coaching services" 
                    />

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Package Information */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-medium">Basic Information</h3>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Package Name</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Enter package name"
                                        required
                                    />
                                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="short_description">Short Description</Label>
                                    <Input
                                        id="short_description"
                                        value={data.short_description}
                                        onChange={(e) => setData('short_description', e.target.value)}
                                        placeholder="Enter a brief description"
                                        required
                                    />
                                    {errors.short_description && (
                                        <p className="text-sm text-red-500">{errors.short_description}</p>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="description">Full Description</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Enter detailed description"
                                        className="min-h-[150px]"
                                        required
                                    />
                                    {errors.description && (
                                        <p className="text-sm text-red-500">{errors.description}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Package Settings */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-medium">Package Settings</h3>
                            <div className="grid gap-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="price">Price</Label>
                                        <Input
                                            id="price"
                                            type="number"
                                            value={data.price}
                                            onChange={(e) => setData('price', e.target.value)}
                                            placeholder="Enter price"
                                            min="0"
                                            step="0.01"
                                            required
                                        />
                                        {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="billing_cycle">Billing Cycle</Label>
                                        <Select
                                            value={data.billing_cycle}
                                            onValueChange={(value) => setData('billing_cycle', value as 'one-time' | 'monthly' | 'yearly')}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select billing cycle" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="one-time">One Time</SelectItem>
                                                <SelectItem value="monthly">Monthly</SelectItem>
                                                <SelectItem value="yearly">Yearly</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.billing_cycle && (
                                            <p className="text-sm text-red-500">{errors.billing_cycle}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="duration_weeks">Duration (weeks)</Label>
                                        <Input
                                            id="duration_weeks"
                                            type="number"
                                            value={data.duration_weeks}
                                            onChange={(e) => setData('duration_weeks', e.target.value)}
                                            placeholder="Enter duration in weeks"
                                            min="1"
                                            required
                                        />
                                        {errors.duration_weeks && (
                                            <p className="text-sm text-red-500">{errors.duration_weeks}</p>
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="max_clients">Max Clients</Label>
                                        <Input
                                            id="max_clients"
                                            type="number"
                                            value={data.max_clients}
                                            onChange={(e) => setData('max_clients', e.target.value)}
                                            placeholder="Enter max clients (optional)"
                                            min="1"
                                        />
                                        {errors.max_clients && (
                                            <p className="text-sm text-red-500">{errors.max_clients}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="is_published"
                                            checked={data.is_published}
                                            onCheckedChange={(checked) => setData('is_published', checked)}
                                        />
                                        <Label htmlFor="is_published">Published</Label>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="is_featured"
                                            checked={data.is_featured}
                                            onCheckedChange={(checked) => setData('is_featured', checked)}
                                        />
                                        <Label htmlFor="is_featured">Featured</Label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <Button variant="outline" asChild>
                                <Link href={route('coach.packages.index')}>Cancel</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                Create Package
                            </Button>
                        </div>
                    </form>
                </div>
            </PackageLayout>
        </AppLayout>
    );
} 
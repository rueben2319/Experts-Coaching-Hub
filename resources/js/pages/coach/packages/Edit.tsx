import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Package, BreadcrumbItem, User } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';

interface Props {
    package: Package;
    auth: {
        user: User;
    };
}

export default function Edit({ package: packageData, auth }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: packageData.name,
        short_description: packageData.short_description,
        description: packageData.description,
        price: packageData.price,
        billing_cycle: packageData.billing_cycle,
        duration_weeks: packageData.duration_weeks,
        max_clients: packageData.max_clients,
        is_published: packageData.is_published,
        is_featured: packageData.is_featured,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('coach.packages.update', packageData.id));
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
        {
            title: 'Packages',
            href: route('coach.packages.index'),
        },
        {
            title: packageData.name,
            href: route('coach.packages.show', packageData.id),
        },
        {
            title: 'Edit Package',
            href: route('coach.packages.edit', packageData.id),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${packageData.name}`} />

            <div className="py-6 px-5">
                <Card className="px-5">
                    <CardHeader>
                        <CardTitle>Edit Package</CardTitle>
                        <CardDescription>
                            Update your package details and settings
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Package Name</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="mt-1"
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="short_description">Short Description</Label>
                                    <Input
                                        id="short_description"
                                        value={data.short_description}
                                        onChange={e => setData('short_description', e.target.value)}
                                        className="mt-1"
                                    />
                                    {errors.short_description && (
                                        <p className="text-sm text-red-500 mt-1">{errors.short_description}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="description">Full Description</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        className="mt-1"
                                        rows={4}
                                    />
                                    {errors.description && (
                                        <p className="text-sm text-red-500 mt-1">{errors.description}</p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="price">Price</Label>
                                        <Input
                                            id="price"
                                            type="number"
                                            step="0.01"
                                            value={data.price}
                                            onChange={e => setData('price', e.target.value)}
                                            className="mt-1"
                                        />
                                        {errors.price && (
                                            <p className="text-sm text-red-500 mt-1">{errors.price}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="billing_cycle">Billing Cycle</Label>
                                        <Select
                                            value={data.billing_cycle}
                                            onValueChange={value => setData('billing_cycle', value)}
                                        >
                                            <SelectTrigger className="mt-1">
                                                <SelectValue placeholder="Select billing cycle" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="monthly">Monthly</SelectItem>
                                                <SelectItem value="quarterly">Quarterly</SelectItem>
                                                <SelectItem value="yearly">Yearly</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.billing_cycle && (
                                            <p className="text-sm text-red-500 mt-1">{errors.billing_cycle}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="duration_weeks">Duration (weeks)</Label>
                                        <Input
                                            id="duration_weeks"
                                            type="number"
                                            value={data.duration_weeks}
                                            onChange={e => setData('duration_weeks', parseInt(e.target.value))}
                                            className="mt-1"
                                        />
                                        {errors.duration_weeks && (
                                            <p className="text-sm text-red-500 mt-1">{errors.duration_weeks}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="max_clients">Maximum Clients</Label>
                                        <Input
                                            id="max_clients"
                                            type="number"
                                            value={data.max_clients}
                                            onChange={e => setData('max_clients', parseInt(e.target.value))}
                                            className="mt-1"
                                        />
                                        {errors.max_clients && (
                                            <p className="text-sm text-red-500 mt-1">{errors.max_clients}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="is_published"
                                            checked={data.is_published}
                                            onCheckedChange={checked => setData('is_published', checked)}
                                        />
                                        <Label htmlFor="is_published">Published</Label>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="is_featured"
                                            checked={data.is_featured}
                                            onCheckedChange={checked => setData('is_featured', checked)}
                                        />
                                        <Label htmlFor="is_featured">Featured</Label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => window.history.back()}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                >
                                    {processing ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
} 
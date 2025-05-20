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

interface CreateProps {
    user: User;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Packages',
        href: '/packages',
    },
    {
        title: 'Create Package',
        href: '/packages/create',
    },
];

export default function Create({ user }: CreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        short_description: '',
        price: '',
        billing_cycle: 'one-time',
        duration_weeks: '',
        max_clients: '',
        is_published: false,
        is_featured: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('packages.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Package" />
            <PackageLayout>
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 bg-white border-b border-gray-200">
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h2 className="text-2xl font-bold">Create Package</h2>
                                        <p className="text-gray-600">Create a new package for your coaching services</p>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="name">Name</Label>
                                            <Input
                                                id="name"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                placeholder="Enter package name"
                                            />
                                            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                        </div>

                                        <div>
                                            <Label htmlFor="short_description">Short Description</Label>
                                            <Input
                                                id="short_description"
                                                value={data.short_description}
                                                onChange={(e) => setData('short_description', e.target.value)}
                                                placeholder="Enter a brief description"
                                            />
                                            {errors.short_description && (
                                                <p className="text-sm text-red-500">{errors.short_description}</p>
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="description">Description</Label>
                                            <Textarea
                                                id="description"
                                                value={data.description}
                                                onChange={(e) => setData('description', e.target.value)}
                                                placeholder="Enter detailed description"
                                            />
                                            {errors.description && (
                                                <p className="text-sm text-red-500">{errors.description}</p>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="price">Price</Label>
                                                <Input
                                                    id="price"
                                                    type="number"
                                                    value={data.price}
                                                    onChange={(e) => setData('price', e.target.value)}
                                                    placeholder="Enter price"
                                                />
                                                {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
                                            </div>

                                            <div>
                                                <Label htmlFor="billing_cycle">Billing Cycle</Label>
                                                <Select
                                                    value={data.billing_cycle}
                                                    onValueChange={(value) => setData('billing_cycle', value)}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select billing cycle" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="one-time">One Time</SelectItem>
                                                        <SelectItem value="monthly">Monthly</SelectItem>
                                                        <SelectItem value="quarterly">Quarterly</SelectItem>
                                                        <SelectItem value="annual">Annual</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                {errors.billing_cycle && (
                                                    <p className="text-sm text-red-500">{errors.billing_cycle}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="duration_weeks">Duration (weeks)</Label>
                                                <Input
                                                    id="duration_weeks"
                                                    type="number"
                                                    value={data.duration_weeks}
                                                    onChange={(e) => setData('duration_weeks', e.target.value)}
                                                    placeholder="Enter duration in weeks"
                                                />
                                                {errors.duration_weeks && (
                                                    <p className="text-sm text-red-500">{errors.duration_weeks}</p>
                                                )}
                                            </div>

                                            <div>
                                                <Label htmlFor="max_clients">Max Clients</Label>
                                                <Input
                                                    id="max_clients"
                                                    type="number"
                                                    value={data.max_clients}
                                                    onChange={(e) => setData('max_clients', e.target.value)}
                                                    placeholder="Enter max clients (optional)"
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

                                    <div className="flex justify-end space-x-4">
                                        <Button variant="outline" asChild>
                                            <Link href={route('packages.index')}>Cancel</Link>
                                        </Button>
                                        <Button type="submit" disabled={processing}>
                                            Create Package
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </PackageLayout>
        </AppLayout>
    );
} 
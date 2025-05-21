import { Head, useForm } from '@inertiajs/react';
import { Package, BreadcrumbItem, User, Module } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';

interface Props {
    package: Package;
    auth: {
        user: User;
    };
}

type ModuleFormData = {
    title: string;
    description: string;
    order_index: number;
    estimated_duration_days: number;
    is_published: boolean;
    [key: string]: string | number | boolean;
}

export default function Create({ package: packageData, auth }: Props) {
    const { data, setData, post, processing, errors } = useForm<ModuleFormData>({
        title: '',
        description: '',
        order_index: 1,
        estimated_duration_days: 1,
        is_published: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('coach.packages.modules.store', packageData.id));
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
            title: 'Add Module',
            href: route('coach.packages.modules.create', packageData.id),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Add Module - ${packageData.name}`} />

            <div className="py-6 px-5">
                <Card className="px-5">
                    <CardHeader>
                        <CardTitle>Add New Module</CardTitle>
                        <CardDescription>
                            Create a new module for your package
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="title">Module Title</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        className="mt-1"
                                        placeholder="Enter module title"
                                    />
                                    {errors.title && (
                                        <p className="text-sm text-red-500 mt-1">{errors.title}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        className="mt-1"
                                        rows={4}
                                        placeholder="Describe what this module covers"
                                    />
                                    {errors.description && (
                                        <p className="text-sm text-red-500 mt-1">{errors.description}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="order_index">Display Order</Label>
                                    <Input
                                        id="order_index"
                                        type="number"
                                        value={data.order_index}
                                        onChange={e => setData('order_index', parseInt(e.target.value))}
                                        className="mt-1"
                                        min={1}
                                    />
                                    <p className="text-sm text-gray-500 mt-1">
                                        The order in which this module appears in the package
                                    </p>
                                    {errors.order_index && (
                                        <p className="text-sm text-red-500 mt-1">{errors.order_index}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="estimated_duration_days">Estimated Duration (Days)</Label>
                                    <Input
                                        id="estimated_duration_days"
                                        type="number"
                                        value={data.estimated_duration_days}
                                        onChange={e => setData('estimated_duration_days', parseInt(e.target.value))}
                                        className="mt-1"
                                        min={1}
                                    />
                                    <p className="text-sm text-gray-500 mt-1">
                                        How many days should this module take to complete?
                                    </p>
                                    {errors.estimated_duration_days && (
                                        <p className="text-sm text-red-500 mt-1">{errors.estimated_duration_days}</p>
                                    )}
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="is_published"
                                        checked={data.is_published}
                                        onCheckedChange={(checked: boolean) => setData('is_published', checked)}
                                    />
                                    <Label htmlFor="is_published">Published</Label>
                                    <p className="text-sm text-gray-500 ml-2">
                                        Make this module visible to clients
                                    </p>
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
                                    {processing ? 'Creating...' : 'Create Module'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
} 
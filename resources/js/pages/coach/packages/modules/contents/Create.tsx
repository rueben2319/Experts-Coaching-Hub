import { useForm } from '@inertiajs/react';
import { Package, Module } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

interface Props {
    package: Package;
    module: Module;
}

export default function Create({ package: packageData, module }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content_type: '',
        content_url: '',
        content_text: '',
        order_index: 0,
        duration_minutes: 0,
        is_required: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('coach.packages.modules.contents.store', [packageData.id, module.id]));
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
            title: 'Add Content',
            href: route('coach.packages.modules.contents.create', [packageData.id, module.id]),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="py-6 px-5">
                <Card>
                    <CardHeader>
                        <CardTitle>Add Content to Module</CardTitle>
                        <CardDescription>
                            Add new content to the module "{module.title}"
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    required
                                />
                                {errors.title && (
                                    <p className="text-sm text-red-500">{errors.title}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="content_type">Content Type</Label>
                                <Select
                                    value={data.content_type}
                                    onValueChange={value => setData('content_type', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select content type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="video">Video</SelectItem>
                                        <SelectItem value="audio">Audio</SelectItem>
                                        <SelectItem value="text">Text</SelectItem>
                                        <SelectItem value="worksheet">Worksheet</SelectItem>
                                        <SelectItem value="assessment">Assessment</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.content_type && (
                                    <p className="text-sm text-red-500">{errors.content_type}</p>
                                )}
                            </div>

                            {(data.content_type === 'video' || data.content_type === 'audio') && (
                                <div className="space-y-2">
                                    <Label htmlFor="content_url">Content URL</Label>
                                    <Input
                                        id="content_url"
                                        type="url"
                                        value={data.content_url}
                                        onChange={e => setData('content_url', e.target.value)}
                                        required
                                    />
                                    {errors.content_url && (
                                        <p className="text-sm text-red-500">{errors.content_url}</p>
                                    )}
                                </div>
                            )}

                            {(data.content_type === 'text' || data.content_type === 'worksheet' || data.content_type === 'assessment') && (
                                <div className="space-y-2">
                                    <Label htmlFor="content_text">Content</Label>
                                    <Textarea
                                        id="content_text"
                                        value={data.content_text}
                                        onChange={e => setData('content_text', e.target.value)}
                                        required
                                    />
                                    {errors.content_text && (
                                        <p className="text-sm text-red-500">{errors.content_text}</p>
                                    )}
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="order_index">Order</Label>
                                <Input
                                    id="order_index"
                                    type="number"
                                    min="0"
                                    value={data.order_index}
                                    onChange={e => setData('order_index', parseInt(e.target.value))}
                                    required
                                />
                                {errors.order_index && (
                                    <p className="text-sm text-red-500">{errors.order_index}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="duration_minutes">Duration (minutes)</Label>
                                <Input
                                    id="duration_minutes"
                                    type="number"
                                    min="0"
                                    value={data.duration_minutes}
                                    onChange={e => setData('duration_minutes', parseInt(e.target.value))}
                                />
                                {errors.duration_minutes && (
                                    <p className="text-sm text-red-500">{errors.duration_minutes}</p>
                                )}
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="is_required"
                                    checked={data.is_required}
                                    onCheckedChange={checked => setData('is_required', checked)}
                                />
                                <Label htmlFor="is_required">Required Content</Label>
                            </div>

                            <div className="flex justify-end space-x-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => window.history.back()}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Creating...' : 'Create Content'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
} 
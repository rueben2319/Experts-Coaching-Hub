import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Package, BreadcrumbItem, User } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Pencil, Trash2, Settings } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import AppLayout from '@/layouts/app-layout';

interface Props {
    package: Package;
    auth: {
    user: User;
    };
}

export default function Show({ package: packageData, auth }: Props) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [showModuleDeleteDialog, setShowModuleDeleteDialog] = useState<string | null>(null);

    if (!packageData) {
        return (
            <AppLayout>
                <div className="py-6 px-5">
                    <Card className="px-5">
                        <CardHeader>
                            <CardTitle>Package not found</CardTitle>
                        </CardHeader>
                    </Card>
                </div>
            </AppLayout>
        );
    }

    const handleDelete = () => {
        setIsDeleting(true);
        router.delete(route('coach.packages.destroy', packageData.id), {
            onFinish: () => setIsDeleting(false),
        });
    };

    const handleModuleDelete = (moduleId: string) => {
        router.delete(route('coach.modules.destroy', moduleId), {
            onSuccess: () => {
                router.reload();
            },
        });
    };

    const isCoach = auth.user.user_role_id === '01HRK7MWBP0000000000COACH';
    const isOwner = isCoach && auth.user.id === packageData.coach.user_id;

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
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${packageData.name} - Package Details`} />

            <div className="py-6 px-5">
                <div className="grid gap-6">
                    {/* Package Header */}
                    <Card className="px-5">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                    <div>
                                    <CardTitle className="text-2xl font-bold">{packageData.name}</CardTitle>
                                    <CardDescription className="mt-2">
                                        {packageData.short_description}
                                    </CardDescription>
                                </div>
                                {isOwner && (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <Settings className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem asChild>
                                                <Link href={route('coach.packages.edit', packageData.id)} className="flex items-center">
                                                    <Pencil className="w-4 h-4 mr-2" />
                                                    Edit Package
                                                </Link>
                                            </DropdownMenuItem>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <DropdownMenuItem
                                                        className="text-destructive focus:text-destructive"
                                                        onSelect={(e) => e.preventDefault()}
                                                    >
                                                        <Trash2 className="w-4 h-4 mr-2" />
                                                        Delete Package
                                                    </DropdownMenuItem>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot be undone. This will permanently delete the package
                                                            and all its associated modules and content.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={handleDelete}
                                                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                        >
                                                            Delete Package
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary">
                                        {formatCurrency(packageData.price)} / {packageData.billing_cycle}
                                    </Badge>
                                    <Badge variant="outline">
                                        {packageData.duration_weeks} weeks
                                    </Badge>
                                    {packageData.max_clients && (
                                        <Badge variant="outline">
                                            Max {packageData.max_clients} clients
                                        </Badge>
                                    )}
                                    {packageData.is_published ? (
                                        <Badge variant="success">Published</Badge>
                                    ) : (
                                        <Badge variant="secondary">Draft</Badge>
                                    )}
                                    {packageData.is_featured && (
                                        <Badge variant="default">Featured</Badge>
                                    )}
                                </div>

                                <div className="prose max-w-none">
                                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                                    <p className="text-gray-600">{packageData.description}</p>
                                                            </div>
                                                        </div>
                        </CardContent>
                    </Card>

                    {/* Modules Section */}
                    <Card className="px-5">
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle>Modules</CardTitle>
                                    <CardDescription>
                                        Course content organized into modules
                                    </CardDescription>
                                </div>
                                {isOwner && (
                                    <Button
                                        size="sm"
                                        asChild
                                    >
                                        <Link href={route('coach.packages.modules.create', { package: packageData.id })}>
                                            Add Module
                                        </Link>
                                    </Button>
                                )}
                                                        </div>
                        </CardHeader>
                        <CardContent>
                            {packageData.modules && packageData.modules.length > 0 ? (
                                <div className="space-y-4">
                                    {packageData.modules.map((module) => (
                                        <Card key={module.id} className="px-5">
                                            <CardHeader>
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <CardTitle className="text-lg">{module.title}</CardTitle>
                                                        <CardDescription>{module.description}</CardDescription>
                                                    </div>
                                                    {isOwner && (
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="icon">
                                                                    <Settings className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuItem asChild>
                                                                    <Link href={route('coach.packages.modules.edit', [packageData.id, module.id])} className="flex items-center">
                                                                        <Pencil className="w-4 h-4 mr-2" />
                                                                        Edit Module
                                                                    </Link>
                                                                </DropdownMenuItem>
                                                                <AlertDialog>
                                                                    <AlertDialogTrigger asChild>
                                                                        <DropdownMenuItem
                                                                            className="text-destructive focus:text-destructive"
                                                                            onSelect={(e) => e.preventDefault()}
                                                                        >
                                                                            <Trash2 className="w-4 h-4 mr-2" />
                                                                            Delete Module
                                                                        </DropdownMenuItem>
                                                                    </AlertDialogTrigger>
                                                                    <AlertDialogContent>
                                                                        <AlertDialogHeader>
                                                                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                                            <AlertDialogDescription>
                                                                                This action cannot be undone. This will permanently delete the module
                                                                                and all its associated content.
                                                                            </AlertDialogDescription>
                                                                        </AlertDialogHeader>
                                                                        <AlertDialogFooter>
                                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                            <AlertDialogAction
                                                                                onClick={() => {
                                                                                    setShowModuleDeleteDialog(module.id.toString());
                                                                                }}
                                                                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                                            >
                                                                                Delete Module
                                                                            </AlertDialogAction>
                                                                        </AlertDialogFooter>
                                                                    </AlertDialogContent>
                                                                </AlertDialog>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    )}
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex flex-wrap gap-2">
                                                    <Badge variant="outline">
                                                        {module.contents?.length || 0} contents
                                                    </Badge>
                                                    {module.is_published ? (
                                                        <Badge variant="success">Published</Badge>
                                                    ) : (
                                                        <Badge variant="secondary">Draft</Badge>
                                                    )}
                                                    {isOwner && (
                                                        <Button size="sm" asChild>
                                                            <Link href={route('coach.packages.modules.contents.create', [packageData.id, module.id])}>
                                                                Add Module Content
                                                            </Link>
                                                        </Button>
                                                    )}
                                                </div>

                                                {module.contents && module.contents.length > 0 && (
                                                    <div className="mt-4 space-y-3">
                                                        {module.contents.map((content) => (
                                                            <div key={content.id} className="flex items-start justify-between p-3 bg-muted rounded-lg">
                                                                <div className="space-y-1">
                                                                    <div className="font-medium">{content.title}</div>
                                                                    <div className="text-sm text-muted-foreground">
                                                                        {content.content_type.charAt(0).toUpperCase() + content.content_type.slice(1)}
                                                                        {content.duration_minutes && ` • ${content.duration_minutes} min`}
                                                                        {content.is_required && ' • Required'}
                                                                    </div>
                                                                </div>
                                                                {isOwner && (
                                                                    <DropdownMenu>
                                                                        <DropdownMenuTrigger asChild>
                                                                            <Button variant="ghost" size="icon">
                                                                                <Settings className="h-4 w-4" />
                                                                            </Button>
                                                                        </DropdownMenuTrigger>
                                                                        <DropdownMenuContent align="end">
                                                                            <DropdownMenuItem asChild>
                                                                                <Link href={route('coach.packages.modules.contents.edit', [packageData.id, module.id, content.id])} className="flex items-center">
                                                                                    <Pencil className="w-4 h-4 mr-2" />
                                                                                    Edit Content
                                                                                </Link>
                                                                            </DropdownMenuItem>
                                                                            <AlertDialog>
                                                                                <AlertDialogTrigger asChild>
                                                                                    <DropdownMenuItem
                                                                                        className="text-destructive focus:text-destructive"
                                                                                        onSelect={(e) => e.preventDefault()}
                                                                                    >
                                                                                        <Trash2 className="w-4 h-4 mr-2" />
                                                                                        Delete Content
                                                                                    </DropdownMenuItem>
                                                                                </AlertDialogTrigger>
                                                                                <AlertDialogContent>
                                                                                    <AlertDialogHeader>
                                                                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                                                        <AlertDialogDescription>
                                                                                            This action cannot be undone. This will permanently delete the content.
                                                                                        </AlertDialogDescription>
                                                                                    </AlertDialogHeader>
                                                                                    <AlertDialogFooter>
                                                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                                        <AlertDialogAction
                                                                                            onClick={() => {
                                                                                                router.delete(route('coach.packages.modules.contents.destroy', [packageData.id, module.id, content.id]), {
                                                                                                    onSuccess: () => router.reload(),
                                                                                                });
                                                                                            }}
                                                                                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                                                        >
                                                                                            Delete Content
                                                                                        </AlertDialogAction>
                                                                                    </AlertDialogFooter>
                                                                                </AlertDialogContent>
                                                                            </AlertDialog>
                                                                        </DropdownMenuContent>
                                                                    </DropdownMenu>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    ))}
                                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    No modules added yet.
                                    {isOwner && (
                                        <div className="mt-4">
                                            <Button
                                                size="sm"
                                                asChild
                                            >
                                                <Link href={route('coach.packages.modules.create', { package: packageData.id })}>
                                                    Add Your First Module
                                                </Link>
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>

            <AlertDialog
                open={showModuleDeleteDialog !== null}
                onOpenChange={(open) => !open && setShowModuleDeleteDialog(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the module.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                if (showModuleDeleteDialog) {
                                    handleModuleDelete(showModuleDeleteDialog);
                                }
                            }}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Delete Module
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
} 
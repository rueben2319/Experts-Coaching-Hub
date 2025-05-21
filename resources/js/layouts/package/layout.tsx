import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import { Package, Plus } from 'lucide-react';

const sidebarNavItems: NavItem[] = [
    {
        title: 'All Packages',
        href: '/coach/packages',
        icon: Package,
    },
    {
        title: 'Package Content',
        href: '/coach/packages/content',
        icon: Package,
    },
    {
        title: 'Package Settings',
        href: '/coach/packages/settings',
        icon: Package,
    },
];

export default function PackageLayout({ children }: PropsWithChildren) {
    return (
        <div className="px-4 py-6">
            <Heading title="Packages" description="Manage your packages and their content" />

            <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                <aside className="w-full max-w-xl lg:w-48">
                    <nav className="flex flex-col space-y-1 space-x-0">
                        {sidebarNavItems.map((item, index) => (
                            <Button
                                key={`${item.href}-${index}`}
                                size="sm"
                                variant="ghost"
                                asChild
                                className={cn('w-full justify-start', {
                                    'bg-muted': window.location.pathname === item.href,
                                })}
                            >
                                <Link href={item.href || '#'} prefetch>
                                    {item.title}
                                </Link>
                            </Button>
                        ))}
                        <Separator className="my-2" />
                        <Button
                            size="sm"
                            variant="ghost"
                            asChild
                            className="w-full justify-start"
                        >
                            <Link href={route('coach.packages.create')} prefetch>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Package
                            </Link>
                        </Button>
                    </nav>
                </aside>

                <Separator className="my-6 md:hidden" />

                <div className="flex-1 md:max-w-2xl">
                    <section className="max-w-xl space-y-12">{children}</section>
                </div>
            </div>
        </div>
    );
} 
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});

    const toggleDropdown = (title: string) => {
        setOpenDropdowns(prev => ({
            ...prev,
            [title]: !prev[title]
        }));
    };

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        {item.children ? (
                            <>
                                <SidebarMenuButton
                                    onClick={() => toggleDropdown(item.title)}
                                    tooltip={{ children: item.title }}
                                    className="flex items-center justify-between"
                                >
                                    <div className="flex items-center">
                                        {item.icon && <item.icon className="mr-2 h-5 w-5" />}
                                        <span>{item.title}</span>
                                    </div>
                                    <ChevronDown className={`h-4 w-4 transition-transform ${openDropdowns[item.title] ? 'rotate-180' : ''}`} />
                                </SidebarMenuButton>
                                {openDropdowns[item.title] && (
                                    <div className="ml-4 mt-1 space-y-1">
                                        {item.children.map((child) => (
                                            <SidebarMenuButton
                                                key={child.title}
                                                asChild
                                                isActive={child.href === page.url}
                                                tooltip={{ children: child.title }}
                                            >
                                                <Link href={child.href} prefetch>
                                                    <span>{child.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <SidebarMenuButton
                                asChild
                                isActive={item.href === page.url}
                                tooltip={{ children: item.title }}
                            >
                                <Link href={item.href} prefetch>
                                    {item.icon && <item.icon className="mr-2 h-5 w-5" />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        )}
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}

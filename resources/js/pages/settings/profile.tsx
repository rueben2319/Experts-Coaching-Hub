import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile settings',
        href: '/settings/profile',
    },
];

type ProfileForm = {
    // Base profile fields
    name: string;
    email: string;
    first_name: string;
    last_name: string;
    display_name: string;
    bio: string;
    profile_image?: File | null;
    timezone: string;
    language_preference: string;
    
    // Coach profile fields
    business_name?: string;
    specialty?: string;
    years_experience?: number;
    certification_info?: string[];
    public_profile?: boolean;
    social_media_links?: Record<string, string>;
    brand_color_primary?: string;
    brand_color_secondary?: string;
    custom_url_slug?: string;
    website_url?: string;
    about_page_content?: string;
    testimonials_enabled?: boolean;
    
    // Client profile fields
    company_name?: string;
    job_title?: string;
    industry?: string;
    coaching_goals?: string[];
    preferred_coaching_topics?: string[];
}

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth } = usePage<SharedData>().props;
    const isCoach = auth.user.role.name === 'coach';
    const isClient = auth.user.role.name === 'client';

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<Required<ProfileForm>>({
        // Base profile fields
        name: auth.user.name,
        email: auth.user.email,
        first_name: auth.user.profile?.first_name || '',
        last_name: auth.user.profile?.last_name || '',
        display_name: auth.user.profile?.display_name || '',
        bio: auth.user.profile?.bio || '',
        profile_image: null,
        timezone: auth.user.profile?.timezone || '',
        language_preference: auth.user.profile?.language_preference || '',
        
        // Coach profile fields
        business_name: auth.user.coach_profile?.business_name || '',
        specialty: auth.user.coach_profile?.specialty || '',
        years_experience: auth.user.coach_profile?.years_experience || 0,
        certification_info: auth.user.coach_profile?.certification_info || [],
        public_profile: auth.user.coach_profile?.public_profile || false,
        social_media_links: auth.user.coach_profile?.social_media_links || {},
        brand_color_primary: auth.user.coach_profile?.brand_color_primary || '#000000',
        brand_color_secondary: auth.user.coach_profile?.brand_color_secondary || '#000000',
        custom_url_slug: auth.user.coach_profile?.custom_url_slug || '',
        website_url: auth.user.coach_profile?.website_url || '',
        about_page_content: auth.user.coach_profile?.about_page_content || '',
        testimonials_enabled: auth.user.coach_profile?.testimonials_enabled || false,
        
        // Client profile fields
        company_name: auth.user.client_profile?.company_name || '',
        job_title: auth.user.client_profile?.job_title || '',
        industry: auth.user.client_profile?.industry || '',
        coaching_goals: auth.user.client_profile?.coaching_goals || [],
        preferred_coaching_topics: auth.user.client_profile?.preferred_coaching_topics || [],
        public_profile: auth.user.client_profile?.public_profile || false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('profile.update'), {
            preserveScroll: true,
            onSuccess: () => {
                setData('profile_image', null);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Profile information" description="Update your profile information" />

                    <form onSubmit={submit} className="space-y-6">
                        {/* Base Profile Information */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-medium">Basic Information</h3>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="profile_image">Profile Image</Label>
                                    <div className="flex items-center gap-4">
                                        {auth.user.profile?.profile_image_url && (
                                            <img
                                                src={auth.user.profile.profile_image_url}
                                                alt="Profile"
                                                className="h-20 w-20 rounded-full object-cover"
                                            />
                                        )}
                                        <Input
                                            id="profile_image"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    setData('profile_image', file);
                                                }
                                            }}
                                        />
                                    </div>
                                    <InputError message={errors.profile_image} />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                                        <Label htmlFor="first_name">First Name</Label>
                                        <Input
                                            id="first_name"
                                            value={data.first_name}
                                            onChange={(e) => setData('first_name', e.target.value)}
                                        />
                                        <InputError message={errors.first_name} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="last_name">Last Name</Label>
                            <Input
                                            id="last_name"
                                            value={data.last_name}
                                            onChange={(e) => setData('last_name', e.target.value)}
                                        />
                                        <InputError message={errors.last_name} />
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="display_name">Display Name</Label>
                                    <Input
                                        id="display_name"
                                        value={data.display_name}
                                        onChange={(e) => setData('display_name', e.target.value)}
                                    />
                                    <InputError message={errors.display_name} />
                        </div>

                        <div className="grid gap-2">
                                    <Label htmlFor="bio">Bio</Label>
                                    <Textarea
                                        id="bio"
                                        value={data.bio}
                                        onChange={(e) => setData('bio', e.target.value)}
                                        className="min-h-[100px]"
                                    />
                                    <InputError message={errors.bio} />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="timezone">Timezone</Label>
                            <Input
                                            id="timezone"
                                            value={data.timezone}
                                            onChange={(e) => setData('timezone', e.target.value)}
                                        />
                                        <InputError message={errors.timezone} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="language_preference">Language Preference</Label>
                                        <Input
                                            id="language_preference"
                                            value={data.language_preference}
                                            onChange={(e) => setData('language_preference', e.target.value)}
                                        />
                                        <InputError message={errors.language_preference} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Coach Profile Information */}
                        {isCoach && auth.user.coach_profile && (
                            <div className="space-y-6">
                                <h3 className="text-lg font-medium">Coach Profile</h3>
                                <div className="grid gap-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="business_name">Business Name</Label>
                                            <Input
                                                id="business_name"
                                                value={data.business_name}
                                                onChange={(e) => setData('business_name', e.target.value)}
                                            />
                                            <InputError message={errors.business_name} />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="specialty">Specialty</Label>
                                            <Input
                                                id="specialty"
                                                value={data.specialty}
                                                onChange={(e) => setData('specialty', e.target.value)}
                                            />
                                            <InputError message={errors.specialty} />
                                        </div>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="years_experience">Years of Experience</Label>
                                        <Input
                                            id="years_experience"
                                            type="number"
                                            value={data.years_experience}
                                            onChange={(e) => setData('years_experience', parseInt(e.target.value))}
                                        />
                                        <InputError message={errors.years_experience} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="website_url">Website URL</Label>
                                        <Input
                                            id="website_url"
                                            type="url"
                                            value={data.website_url}
                                            onChange={(e) => setData('website_url', e.target.value)}
                                        />
                                        <InputError message={errors.website_url} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="about_page_content">About Page Content</Label>
                                        <Textarea
                                            id="about_page_content"
                                            value={data.about_page_content}
                                            onChange={(e) => setData('about_page_content', e.target.value)}
                                            className="min-h-[150px]"
                                        />
                                        <InputError message={errors.about_page_content} />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="brand_color_primary">Primary Brand Color</Label>
                                            <Input
                                                id="brand_color_primary"
                                                type="color"
                                                value={data.brand_color_primary}
                                                onChange={(e) => setData('brand_color_primary', e.target.value)}
                                            />
                                            <InputError message={errors.brand_color_primary} />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="brand_color_secondary">Secondary Brand Color</Label>
                                            <Input
                                                id="brand_color_secondary"
                                                type="color"
                                                value={data.brand_color_secondary}
                                                onChange={(e) => setData('brand_color_secondary', e.target.value)}
                                            />
                                            <InputError message={errors.brand_color_secondary} />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Switch
                                            id="public_profile"
                                            checked={data.public_profile}
                                            onCheckedChange={(checked) => setData('public_profile', checked)}
                                        />
                                        <Label htmlFor="public_profile">Public Profile</Label>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Switch
                                            id="testimonials_enabled"
                                            checked={data.testimonials_enabled}
                                            onCheckedChange={(checked) => setData('testimonials_enabled', checked)}
                                        />
                                        <Label htmlFor="testimonials_enabled">Enable Testimonials</Label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Client Profile Information */}
                        {isClient && auth.user.client_profile && (
                            <div className="space-y-6">
                                <h3 className="text-lg font-medium">Client Profile</h3>
                                <div className="grid gap-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="company_name">Company Name</Label>
                                            <Input
                                                id="company_name"
                                                value={data.company_name}
                                                onChange={(e) => setData('company_name', e.target.value)}
                                            />
                                            <InputError message={errors.company_name} />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="job_title">Job Title</Label>
                                            <Input
                                                id="job_title"
                                                value={data.job_title}
                                                onChange={(e) => setData('job_title', e.target.value)}
                                            />
                                            <InputError message={errors.job_title} />
                                        </div>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="industry">Industry</Label>
                                        <Input
                                            id="industry"
                                            value={data.industry}
                                            onChange={(e) => setData('industry', e.target.value)}
                                        />
                                        <InputError message={errors.industry} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="coaching_goals">Coaching Goals</Label>
                                        <Textarea
                                            id="coaching_goals"
                                            value={data.coaching_goals?.join('\n')}
                                            onChange={(e) => setData('coaching_goals', e.target.value.split('\n'))}
                                            className="min-h-[100px]"
                                            placeholder="Enter each goal on a new line"
                                        />
                                        <InputError message={errors.coaching_goals} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="preferred_coaching_topics">Preferred Coaching Topics</Label>
                                        <Textarea
                                            id="preferred_coaching_topics"
                                            value={data.preferred_coaching_topics?.join('\n')}
                                            onChange={(e) => setData('preferred_coaching_topics', e.target.value.split('\n'))}
                                            className="min-h-[100px]"
                                            placeholder="Enter each topic on a new line"
                                        />
                                        <InputError message={errors.preferred_coaching_topics} />
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Switch
                                            id="public_profile"
                                            checked={data.public_profile}
                                            onCheckedChange={(checked) => setData('public_profile', checked)}
                                        />
                                        <Label htmlFor="public_profile">Public Profile</Label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {mustVerifyEmail && auth.user.email_verified_at === null && (
                            <div>
                                <p className="text-muted-foreground text-sm">
                                    Your email address is unverified.{' '}
                                    <Link
                                        href={route('verification.send')}
                                        method="post"
                                        as="button"
                                        className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                    >
                                        Click here to resend the verification email.
                                    </Link>
                                </p>

                                {status === 'verification-link-sent' && (
                                    <div className="mt-2 text-sm font-medium text-green-600">
                                        A new verification link has been sent to your email address.
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Save</Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">Saved</p>
                            </Transition>
                        </div>
                    </form>
                </div>

                <DeleteUser />
            </SettingsLayout>
        </AppLayout>
    );
}

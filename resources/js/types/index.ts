export interface Profile {
    id: string;
    user_id: string;
    first_name: string;
    last_name: string;
    display_name: string;
    bio: string;
    profile_image_url: string | null;
    timezone: string;
    language_preference: string;
    created_at: string;
    updated_at: string;
}

export interface CoachProfile {
    id: string;
    user_id: string;
    business_name: string;
    specialty: string;
    years_experience: number;
    certification_info: string[];
    public_profile: boolean;
    social_media_links: Record<string, string>;
    brand_color_primary: string | null;
    brand_color_secondary: string | null;
    custom_url_slug: string | null;
    website_url: string | null;
    about_page_content: string | null;
    testimonials_enabled: boolean;
    created_at: string;
    updated_at: string;
}

export interface ClientProfile {
    id: string;
    user_id: string;
    company_name: string | null;
    job_title: string | null;
    industry: string | null;
    coaching_goals: string[];
    preferred_coaching_topics: string[];
    public_profile: boolean;
    created_at: string;
    updated_at: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    phone_number: string | null;
    user_role_id: string;
    is_active: boolean;
    email_verified: number;
    email_verified_at: string;
    last_login: string | null;
    reset_token: string | null;
    reset_token_expires_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface SharedData {
    auth: {
        user: User;
    };
    flash: {
        message: string | null;
    };
}

export interface NavItem {
    title: string;
    href?: string;
    icon?: React.ComponentType<{ className?: string }>;
    children?: NavItem[];
}

export interface Module {
    id: string;
    title: string;
    description: string;
    order_index: number;
    estimated_duration_days: number;
    is_published: boolean;
    contents?: Content[];
}

export interface Content {
    id: string;
    module_id: string;
    title: string;
    content_type: 'video' | 'audio' | 'text' | 'worksheet' | 'assessment';
    content_url: string | null;
    content_text: string | null;
    order_index: number;
    duration_minutes: number | null;
    is_required: boolean;
    created_at: string;
    updated_at: string;
}

export interface Coach {
    id: string;
    user_id: string;
    business_name: string | null;
    specialty: string | null;
    years_experience: number | null;
    certification_info: string | null;
    public_profile: boolean;
    social_media_links: string | null;
    brand_color_primary: string | null;
    brand_color_secondary: string | null;
    custom_url_slug: string | null;
    logo_image_url: string | null;
    banner_image_url: string | null;
    website_url: string | null;
    about_page_content: string | null;
    testimonials_enabled: boolean;
    created_at: string;
    updated_at: string;
}

export interface Package {
    id: string;
    coach_id: string;
    name: string;
    description: string;
    short_description: string;
    featured_image_url: string | null;
    price: string;
    billing_cycle: string;
    duration_weeks: number;
    max_clients: number;
    is_published: boolean;
    is_featured: boolean;
    created_at: string;
    updated_at: string;
    coach: Coach;
    modules: Module[];
}

export interface BreadcrumbItem {
    title: string;
    href: string;
} 
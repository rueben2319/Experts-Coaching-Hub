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
    email_verified_at: string | null;
    role: {
        id: string;
        name: string;
    };
    profile: Profile | null;
    coach_profile: CoachProfile | null;
    client_profile: ClientProfile | null;
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
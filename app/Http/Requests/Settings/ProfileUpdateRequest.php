<?php

namespace App\Http\Requests\Settings;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $user = $this->user();
        $rules = [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($user->id),
            ],
            'profile_image' => ['nullable', 'image', 'max:2048'], // 2MB max
            
            // Base profile fields
            'first_name' => ['nullable', 'string', 'max:255'],
            'last_name' => ['nullable', 'string', 'max:255'],
            'display_name' => ['nullable', 'string', 'max:255'],
            'bio' => ['nullable', 'string'],
            'timezone' => ['nullable', 'string', 'timezone'],
            'language_preference' => ['nullable', 'string', 'size:2'],
        ];

        // Add coach profile rules if user is a coach
        if ($user->role->name === 'coach') {
            $rules = array_merge($rules, [
                'business_name' => ['required', 'string', 'max:255'],
                'specialty' => ['required', 'string', 'max:255'],
                'years_experience' => ['required', 'integer', 'min:0'],
                'certification_info' => ['nullable', 'array'],
                'certification_info.*' => ['string'],
                'public_profile' => ['boolean'],
                'social_media_links' => ['nullable', 'array'],
                'brand_color_primary' => ['nullable', 'string', 'regex:/^#[0-9A-F]{6}$/i'],
                'brand_color_secondary' => ['nullable', 'string', 'regex:/^#[0-9A-F]{6}$/i'],
                'custom_url_slug' => ['nullable', 'string', 'max:255', 'unique:coach_profiles,custom_url_slug,' . $user->coachProfile?->id],
                'website_url' => ['nullable', 'url', 'max:255'],
                'about_page_content' => ['nullable', 'string'],
                'testimonials_enabled' => ['boolean'],
            ]);
        }

        // Add client profile rules if user is a client
        if ($user->role->name === 'client') {
            $rules = array_merge($rules, [
                'company_name' => ['nullable', 'string', 'max:255'],
                'job_title' => ['nullable', 'string', 'max:255'],
                'industry' => ['nullable', 'string', 'max:255'],
                'coaching_goals' => ['nullable', 'array'],
                'coaching_goals.*' => ['string'],
                'preferred_coaching_topics' => ['nullable', 'array'],
                'preferred_coaching_topics.*' => ['string'],
                'public_profile' => ['boolean'],
            ]);
        }

        return $rules;
    }
}

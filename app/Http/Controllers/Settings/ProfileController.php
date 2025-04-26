<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function edit(Request $request): Response
    {
        $user = $request->user();
        
        // Load all necessary relationships
        $user->load([
            'role',
            'profile',
            'coachProfile',
            'clientProfile'
        ]);

        return Inertia::render('settings/profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
            'auth' => [
                'user' => $user,
            ],
        ]);
    }

    /**
     * Update the user's profile settings.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();
        $validated = $request->validated();

        // Update user fields
        $user->fill([
            'name' => $validated['name'],
            'email' => $validated['email'],
        ]);

        // Only reset email verification if email is changed
        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        // Update base profile
        $user->profile->update([
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'display_name' => $validated['display_name'],
            'bio' => $validated['bio'],
            'timezone' => $validated['timezone'],
            'language_preference' => $validated['language_preference'],
        ]);

        // Handle profile image upload
        if ($request->hasFile('profile_image')) {
            $file = $request->file('profile_image');
            $path = $file->store('profile-images', 'public');
            
            // Delete old profile image if exists
            if ($user->profile->profile_image_url) {
                Storage::disk('public')->delete($user->profile->profile_image_url);
            }

            $user->profile->update([
                'profile_image_url' => $path,
            ]);
        }

        // Update role-specific profile
        if ($user->role->name === 'coach') {
            $user->coachProfile->update([
                'business_name' => $validated['business_name'],
                'specialty' => $validated['specialty'],
                'years_experience' => $validated['years_experience'],
                'certification_info' => $validated['certification_info'],
                'public_profile' => $validated['public_profile'],
                'social_media_links' => $validated['social_media_links'],
                'brand_color_primary' => $validated['brand_color_primary'],
                'brand_color_secondary' => $validated['brand_color_secondary'],
                'custom_url_slug' => $validated['custom_url_slug'],
                'website_url' => $validated['website_url'],
                'about_page_content' => $validated['about_page_content'],
                'testimonials_enabled' => $validated['testimonials_enabled'],
            ]);
        } elseif ($user->role->name === 'client') {
            $user->clientProfile->update([
                'company_name' => $validated['company_name'],
                'job_title' => $validated['job_title'],
                'industry' => $validated['industry'],
                'coaching_goals' => $validated['coaching_goals'],
                'preferred_coaching_topics' => $validated['preferred_coaching_topics'],
                'public_profile' => $validated['public_profile'],
            ]);
        }

        return to_route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}

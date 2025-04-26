<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserRole;
use App\Models\Profile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialAuthController extends Controller
{
    /**
     * Redirect the user to the Facebook authentication page.
     */
    public function redirectToFacebook(): RedirectResponse
    {
        return Socialite::driver('facebook')->redirect();
    }

    /**
     * Redirect the user to the Google authentication page.
     */
    public function redirectToGoogle(): RedirectResponse
    {
        return Socialite::driver('google')->redirect();
    }

    /**
     * Handle the Facebook callback.
     */
    public function handleFacebookCallback(): RedirectResponse
    {
        try {
            $socialUser = Socialite::driver('facebook')->user();
            return $this->handleSocialCallback($socialUser, 'facebook');
        } catch (\Exception $e) {
            return redirect()->route('login')->with('error', 'Facebook authentication failed.');
        }
    }

    /**
     * Handle the Google callback.
     */
    public function handleGoogleCallback(): RedirectResponse
    {
        try {
            $socialUser = Socialite::driver('google')->user();
            return $this->handleSocialCallback($socialUser, 'google');
        } catch (\Exception $e) {
            return redirect()->route('login')->with('error', 'Google authentication failed.');
        }
    }

    /**
     * Handle the social callback and create or update the user.
     */
    private function handleSocialCallback($socialUser, string $provider): RedirectResponse
    {
        $user = User::where('email', $socialUser->getEmail())->first();

        if (!$user) {
            // Create new user
            $user = User::create([
                'name' => $socialUser->getName(),
                'email' => $socialUser->getEmail(),
                'password_hash' => bcrypt(uniqid()), // Generate random password
                'user_role_id' => UserRole::where('name', 'client')->first()->id, // Default role
                'is_active' => true,
                'email_verified_at' => now(), // Social login users are considered verified
            ]);

            // Create base profile
            Profile::create([
                'user_id' => $user->id,
                'first_name' => $socialUser->getName(),
                'last_name' => '',
                'display_name' => $socialUser->getName(),
            ]);
        }

        Auth::login($user);

        return redirect()->intended(route('dashboard'));
    }
} 
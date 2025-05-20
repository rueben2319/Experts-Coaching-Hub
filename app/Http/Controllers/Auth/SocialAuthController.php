<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialAuthController extends Controller
{
    public function redirectToProvider($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    public function handleProviderCallback($provider)
    {
        try {
            $socialUser = Socialite::driver($provider)->user();
            
            // Check if user exists
            $user = User::where('email', $socialUser->getEmail())->first();

            if (!$user) {
                // Create new user
                $user = User::create([
                    'name' => $socialUser->getName(),
                    'email' => $socialUser->getEmail(),
                    'password' => bcrypt(uniqid()), // Random password
                    'user_role_id' => 3, // Default to client role
                    'email_verified_at' => now(),
                ]);

                // Create client profile
                $user->clientProfile()->create([
                    'public_profile' => true,
                ]);
            }

            // Log the user in
            Auth::login($user);

            return redirect()->intended('/dashboard');
        } catch (\Exception $e) {
            return redirect()->route('login')->with('error', 'Something went wrong with ' . ucfirst($provider) . ' authentication.');
        }
    }
} 
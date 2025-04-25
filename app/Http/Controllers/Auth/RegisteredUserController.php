<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use App\Models\User;
use App\Models\UserRole;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register', [
            'roles' => UserRole::whereIn('name', ['client', 'coach'])->get(),
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role_id' => 'required|exists:user_roles,id',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password_hash' => Hash::make($request->password),
            'user_role_id' => $request->role_id,
            'is_active' => true,
        ]);

        // Create base profile
        Profile::create([
            'user_id' => $user->id,
            'first_name' => explode(' ', $request->name)[0],
            'last_name' => explode(' ', $request->name)[1] ?? '',
            'display_name' => $request->name,
        ]);

        // Create role-specific profile
        $this->createRoleSpecificProfile($user, $request->role_id);

        event(new Registered($user));

        Auth::login($user);

        return to_route('dashboard');
    }

    /**
     * Create role-specific profile based on user role.
     */
    private function createRoleSpecificProfile(User $user, string $roleId): void
    {
        $role = UserRole::find($roleId);

        match ($role->name) {
            'coach' => $user->coachProfile()->create([
                'public_profile' => false,
                'testimonials_enabled' => true,
            ]),
            'client' => $user->clientProfile()->create([
                'public_profile' => false,
            ]),
            default => null,
        };
    }
}

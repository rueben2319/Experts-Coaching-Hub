<?php

namespace App\Http\Controllers\Package;

use App\Http\Controllers\Controller;
use App\Models\Package;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PackageController extends Controller
{
    public function __construct()
    {
        // Ensure all methods require authentication
        $this->middleware('auth');
    }

    public function index()
    {
        try {
            $packages = Package::with(['coach', 'modules'])->paginate(10);
            
            return Inertia::render('coach/packages/Index', [
                'packages' => $packages,
                'user' => auth()->user(),
            ]);
        } catch (\Exception $e) {
            return back()->with('error', 'Error loading packages: ' . $e->getMessage());
        }
    }

    public function create()
    {
        // Ensure user is a coach
        if (!auth()->user()->isCoach()) {
            return redirect()->route('packages.index')->with('error', 'Only coaches can create packages.');
        }

        return Inertia::render('coach/packages/Create');
    }

    public function store(Request $request)
    {
        // Ensure user is a coach
        if (!auth()->user()->isCoach()) {
            return redirect()->route('packages.index')->with('error', 'Only coaches can create packages.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'short_description' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'billing_cycle' => 'required|in:one-time,monthly,quarterly,annual',
            'duration_weeks' => 'required|integer|min:1',
            'max_clients' => 'nullable|integer|min:1',
            'is_published' => 'boolean',
            'is_featured' => 'boolean',
        ]);

        // Get the coach_id from the authenticated user's coach profile
        $coach_id = $request->user()->coachProfile->id;
        
        // Create the package with the coach_id
        $package = Package::create([
            ...$validated,
            'coach_id' => $coach_id,
        ]);

        return redirect()->route('coach.packages.show', $package);
    }

    public function show(Package $package)
    {
        $package->load(['coach', 'modules.contents']);
        
        return Inertia::render('coach/packages/Show', [
            'package' => $package,
            'user' => auth()->user(),
        ]);
    }

    public function edit(Package $package)
    {
        // Ensure user is a coach
        if (!auth()->user()->isCoach()) {
            return redirect()->route('packages.index')->with('error', 'Only coaches can edit packages.');
        }

        // Ensure the coach can only edit their own packages
        if ($package->coach_id !== auth()->user()->coachProfile->id) {
            return redirect()->route('packages.index')->with('error', 'You can only edit your own packages.');
        }

        return Inertia::render('coach/packages/Edit', [
            'package' => $package,
        ]);
    }

    public function update(Request $request, Package $package)
    {
        // Ensure user is a coach
        if (!auth()->user()->isCoach()) {
            return redirect()->route('packages.index')->with('error', 'Only coaches can update packages.');
        }

        // Ensure the coach can only update their own packages
        if ($package->coach_id !== auth()->user()->coachProfile->id) {
            return redirect()->route('packages.index')->with('error', 'You can only update your own packages.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'short_description' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'billing_cycle' => 'required|in:one-time,monthly,quarterly,annual',
            'duration_weeks' => 'required|integer|min:1',
            'max_clients' => 'nullable|integer|min:1',
            'is_published' => 'boolean',
            'is_featured' => 'boolean',
        ]);

        $package->update($validated);

        return redirect()->route('coach.packages.show', $package);
    }

    public function destroy(Package $package)
    {
        // Ensure user is a coach
        if (!auth()->user()->isCoach()) {
            return redirect()->route('packages.index')->with('error', 'Only coaches can delete packages.');
        }

        // Ensure the coach can only delete their own packages
        if ($package->coach_id !== auth()->user()->coachProfile->id) {
            return redirect()->route('packages.index')->with('error', 'You can only delete your own packages.');
        }

        $package->delete();

        return redirect()->route('coach.packages.index');
    }
} 
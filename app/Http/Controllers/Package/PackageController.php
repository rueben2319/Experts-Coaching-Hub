<?php

namespace App\Http\Controllers\Package;

use App\Http\Controllers\Controller;
use App\Models\Package;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PackageController extends Controller
{
    public function index()
    {
        $packages = Package::with('modules')->paginate(10);
        
        return Inertia::render('Package/Index', [
            'packages' => $packages,
        ]);
    }

    public function create()
    {
        return Inertia::render('Package/Create');
    }

    public function store(Request $request)
    {
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

        $package = Package::create($validated);

        return redirect()->route('packages.show', $package);
    }

    public function show(Package $package)
    {
        $package->load('modules.contents');
        
        return Inertia::render('Package/Show', [
            'package' => $package,
        ]);
    }

    public function edit(Package $package)
    {
        return Inertia::render('Package/Edit', [
            'package' => $package,
        ]);
    }

    public function update(Request $request, Package $package)
    {
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

        return redirect()->route('packages.show', $package);
    }

    public function destroy(Package $package)
    {
        $package->delete();

        return redirect()->route('packages.index');
    }
} 
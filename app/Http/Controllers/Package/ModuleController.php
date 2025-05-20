<?php

namespace App\Http\Controllers\Package;

use App\Http\Controllers\Controller;
use App\Models\Package;
use App\Models\PackageModule;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ModuleController extends Controller
{
    public function create(Package $package)
    {
        return Inertia::render('Package/Module/Create', [
            'package' => $package,
        ]);
    }

    public function store(Request $request, Package $package)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'order_index' => 'required|integer|min:0',
            'estimated_duration_days' => 'required|integer|min:1',
        ]);

        $module = $package->modules()->create($validated);

        return redirect()->route('packages.show', $package);
    }

    public function edit(Package $package, PackageModule $module)
    {
        return Inertia::render('Package/Module/Edit', [
            'package' => $package,
            'module' => $module,
        ]);
    }

    public function update(Request $request, Package $package, PackageModule $module)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'order_index' => 'required|integer|min:0',
            'estimated_duration_days' => 'required|integer|min:1',
        ]);

        $module->update($validated);

        return redirect()->route('packages.show', $package);
    }

    public function destroy(Package $package, PackageModule $module)
    {
        $module->delete();

        return redirect()->route('packages.show', $package);
    }
} 
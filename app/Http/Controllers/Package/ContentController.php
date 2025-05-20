<?php

namespace App\Http\Controllers\Package;

use App\Http\Controllers\Controller;
use App\Models\Package;
use App\Models\PackageModule;
use App\Models\ModuleContent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContentController extends Controller
{
    public function create(Package $package, PackageModule $module)
    {
        return Inertia::render('Package/Content/Create', [
            'package' => $package,
            'module' => $module,
        ]);
    }

    public function store(Request $request, Package $package, PackageModule $module)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content_type' => 'required|in:video,audio,text,worksheet,assessment',
            'content_url' => 'nullable|required_if:content_type,video,audio|url',
            'content_text' => 'nullable|required_if:content_type,text,worksheet,assessment|string',
            'order_index' => 'required|integer|min:0',
            'duration_minutes' => 'nullable|integer|min:1',
            'is_required' => 'boolean',
        ]);

        $content = $module->contents()->create($validated);

        return redirect()->route('packages.show', $package);
    }

    public function edit(Package $package, PackageModule $module, ModuleContent $content)
    {
        return Inertia::render('Package/Content/Edit', [
            'package' => $package,
            'module' => $module,
            'content' => $content,
        ]);
    }

    public function update(Request $request, Package $package, PackageModule $module, ModuleContent $content)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content_type' => 'required|in:video,audio,text,worksheet,assessment',
            'content_url' => 'nullable|required_if:content_type,video,audio|url',
            'content_text' => 'nullable|required_if:content_type,text,worksheet,assessment|string',
            'order_index' => 'required|integer|min:0',
            'duration_minutes' => 'nullable|integer|min:1',
            'is_required' => 'boolean',
        ]);

        $content->update($validated);

        return redirect()->route('packages.show', $package);
    }

    public function destroy(Package $package, PackageModule $module, ModuleContent $content)
    {
        $content->delete();

        return redirect()->route('packages.show', $package);
    }
} 
<?php

use App\Http\Controllers\Package\PackageController;
use App\Http\Controllers\Package\ModuleController;
use App\Http\Controllers\Package\ContentController;
use Illuminate\Support\Facades\Route;

// All coach routes require authentication and verification
Route::middleware(['auth', 'verified'])->prefix('coach')->name('coach.')->group(function () {
    // Package routes
    Route::get('/packages', [PackageController::class, 'index'])->name('packages.index');
    Route::get('/packages/create', [PackageController::class, 'create'])->name('packages.create');
    Route::post('/packages', [PackageController::class, 'store'])->name('packages.store');
    Route::get('/packages/{package}', [PackageController::class, 'show'])->name('packages.show');
    Route::get('/packages/{package}/edit', [PackageController::class, 'edit'])->name('packages.edit');
    Route::put('/packages/{package}', [PackageController::class, 'update'])->name('packages.update');
    Route::delete('/packages/{package}', [PackageController::class, 'destroy'])->name('packages.destroy');

    // Module routes
    Route::get('/packages/{package}/modules/create', [ModuleController::class, 'create'])->name('packages.modules.create');
    Route::post('/packages/{package}/modules', [ModuleController::class, 'store'])->name('packages.modules.store');
    Route::get('/packages/{package}/modules/{module}/edit', [ModuleController::class, 'edit'])->name('packages.modules.edit');
    Route::put('/packages/{package}/modules/{module}', [ModuleController::class, 'update'])->name('packages.modules.update');
    Route::delete('/packages/{package}/modules/{module}', [ModuleController::class, 'destroy'])->name('packages.modules.destroy');

    // Content routes
    Route::get('/packages/{package}/modules/{module}/contents/create', [ContentController::class, 'create'])->name('packages.modules.contents.create');
    Route::post('/packages/{package}/modules/{module}/contents', [ContentController::class, 'store'])->name('packages.modules.contents.store');
    Route::get('/packages/{package}/modules/{module}/contents/{content}/edit', [ContentController::class, 'edit'])->name('packages.modules.contents.edit');
    Route::put('/packages/{package}/modules/{module}/contents/{content}', [ContentController::class, 'update'])->name('packages.modules.contents.update');
    Route::delete('/packages/{package}/modules/{module}/contents/{content}', [ContentController::class, 'destroy'])->name('packages.modules.contents.destroy');
}); 
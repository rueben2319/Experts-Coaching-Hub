<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PackageModule extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'package_id',
        'title',
        'description',
        'order_index',
        'estimated_duration_days',
    ];

    protected $casts = [
        'order_index' => 'integer',
        'estimated_duration_days' => 'integer',
    ];

    public function package(): BelongsTo
    {
        return $this->belongsTo(Package::class);
    }

    public function contents(): HasMany
    {
        return $this->hasMany(ModuleContent::class, 'module_id');
    }

    public function clientProgress(): HasMany
    {
        return $this->hasMany(ClientModuleProgress::class, 'module_id');
    }
} 
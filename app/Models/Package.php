<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Package extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'coach_id',
        'name',
        'description',
        'short_description',
        'featured_image_url',
        'price',
        'billing_cycle',
        'duration_weeks',
        'max_clients',
        'is_published',
        'is_featured',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'duration_weeks' => 'integer',
        'max_clients' => 'integer',
        'is_published' => 'boolean',
        'is_featured' => 'boolean',
    ];

    public function coach(): BelongsTo
    {
        return $this->belongsTo(CoachProfile::class, 'coach_id');
    }

    public function modules(): HasMany
    {
        return $this->hasMany(PackageModule::class);
    }

    public function clientPackages(): HasMany
    {
        return $this->hasMany(ClientPackage::class);
    }
} 
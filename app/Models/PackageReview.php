<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PackageReview extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'package_id',
        'client_id',
        'rating',
        'review_text',
        'is_public',
    ];

    protected $casts = [
        'rating' => 'integer',
        'is_public' => 'boolean',
    ];

    public function package(): BelongsTo
    {
        return $this->belongsTo(Package::class);
    }

    public function client(): BelongsTo
    {
        return $this->belongsTo(ClientProfile::class, 'client_id');
    }
} 
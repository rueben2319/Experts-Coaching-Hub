<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class CoachProfile extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'user_id',
        'business_name',
        'specialty',
        'years_experience',
        'certification_info',
        'public_profile',
        'social_media_links',
        'brand_color_primary',
        'brand_color_secondary',
        'custom_url_slug',
        'logo_image_url',
        'banner_image_url',
        'website_url',
        'about_page_content',
        'testimonials_enabled',
    ];

    protected $casts = [
        'certification_info' => 'array',
        'social_media_links' => 'array',
        'public_profile' => 'boolean',
        'testimonials_enabled' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function sessions(): HasMany
    {
        return $this->hasMany(CoachingSession::class, 'coach_id');
    }

    public function themeSettings(): HasOne
    {
        return $this->hasOne(CoachThemeSettings::class, 'coach_id');
    }

    public function customPages(): HasMany
    {
        return $this->hasMany(CoachCustomPage::class, 'coach_id');
    }
} 
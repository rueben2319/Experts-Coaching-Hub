<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CoachThemeSettings extends Model
{
    use HasFactory;

    protected $fillable = [
        'coach_id',
        'theme_template',
        'custom_css',
        'font_primary',
        'font_secondary',
        'button_style',
        'layout_preferences',
    ];

    protected $casts = [
        'button_style' => 'array',
        'layout_preferences' => 'array',
    ];

    public function coach(): BelongsTo
    {
        return $this->belongsTo(CoachProfile::class, 'coach_id');
    }
} 
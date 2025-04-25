<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CoachCustomPage extends Model
{
    use HasFactory;

    protected $fillable = [
        'coach_id',
        'title',
        'slug',
        'content',
        'is_published',
        'order_index',
    ];

    protected $casts = [
        'is_published' => 'boolean',
    ];

    public function coach(): BelongsTo
    {
        return $this->belongsTo(CoachProfile::class, 'coach_id');
    }
} 
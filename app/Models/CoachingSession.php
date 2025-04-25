<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CoachingSession extends Model
{
    use HasFactory;

    protected $fillable = [
        'coach_id',
        'client_id',
        'title',
        'description',
        'scheduled_at',
        'duration_minutes',
        'status',
        'notes',
        'feedback',
    ];

    protected $casts = [
        'scheduled_at' => 'datetime',
        'feedback' => 'array',
    ];

    public function coach(): BelongsTo
    {
        return $this->belongsTo(CoachProfile::class, 'coach_id');
    }

    public function client(): BelongsTo
    {
        return $this->belongsTo(ClientProfile::class, 'client_id');
    }
} 
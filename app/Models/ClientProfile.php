<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class ClientProfile extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'user_id',
        'company_name',
        'job_title',
        'industry',
        'coaching_goals',
        'preferred_coaching_topics',
        'public_profile',
    ];

    protected $casts = [
        'coaching_goals' => 'array',
        'preferred_coaching_topics' => 'array',
        'public_profile' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function sessions(): HasMany
    {
        return $this->hasMany(CoachingSession::class, 'client_id');
    }
} 
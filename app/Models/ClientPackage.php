<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ClientPackage extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'client_id',
        'package_id',
        'coach_id',
        'status',
        'start_date',
        'end_date',
        'progress_percentage',
        'current_module_id',
        'payment_status',
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'progress_percentage' => 'integer',
        'status' => 'string',
        'payment_status' => 'string',
    ];

    public function client(): BelongsTo
    {
        return $this->belongsTo(ClientProfile::class, 'client_id');
    }

    public function package(): BelongsTo
    {
        return $this->belongsTo(Package::class);
    }

    public function coach(): BelongsTo
    {
        return $this->belongsTo(CoachProfile::class, 'coach_id');
    }

    public function currentModule(): BelongsTo
    {
        return $this->belongsTo(PackageModule::class, 'current_module_id');
    }

    public function moduleProgress(): HasMany
    {
        return $this->hasMany(ClientModuleProgress::class);
    }

    public function contentProgress(): HasMany
    {
        return $this->hasMany(ClientContentProgress::class);
    }
} 
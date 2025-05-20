<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ClientModuleProgress extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'client_package_id',
        'module_id',
        'status',
        'completion_percentage',
        'started_at',
        'completed_at',
        'notes',
    ];

    protected $casts = [
        'completion_percentage' => 'integer',
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
        'status' => 'string',
    ];

    public function clientPackage(): BelongsTo
    {
        return $this->belongsTo(ClientPackage::class);
    }

    public function module(): BelongsTo
    {
        return $this->belongsTo(PackageModule::class, 'module_id');
    }
} 
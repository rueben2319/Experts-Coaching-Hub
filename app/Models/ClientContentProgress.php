<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ClientContentProgress extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'client_package_id',
        'content_id',
        'status',
        'last_position',
        'completed_at',
    ];

    protected $casts = [
        'last_position' => 'integer',
        'completed_at' => 'datetime',
        'status' => 'string',
    ];

    public function clientPackage(): BelongsTo
    {
        return $this->belongsTo(ClientPackage::class);
    }

    public function content(): BelongsTo
    {
        return $this->belongsTo(ModuleContent::class, 'content_id');
    }
} 
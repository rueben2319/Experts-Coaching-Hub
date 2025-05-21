<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ModuleContent extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'module_content';

    protected $fillable = [
        'module_id',
        'title',
        'content_type',
        'content_url',
        'content_text',
        'order_index',
        'duration_minutes',
        'is_required',
    ];

    protected $casts = [
        'order_index' => 'integer',
        'duration_minutes' => 'integer',
        'is_required' => 'boolean',
    ];

    public function module(): BelongsTo
    {
        return $this->belongsTo(PackageModule::class, 'module_id');
    }

    public function clientProgress(): HasMany
    {
        return $this->hasMany(ClientContentProgress::class, 'content_id');
    }
} 
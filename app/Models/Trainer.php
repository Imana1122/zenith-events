<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trainer extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'post',
        'skillLevel',
        'experienceYears',
        'imagePath'

    ];

    public function events()
    {
        return $this->belongsToMany(Event::class, 'events_trainers', 'trainer_id', 'event_id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;
    protected $fillable = [
        'userId',
        'name',
        'address',
        'email',
        'eventId',
        'noOfPeople',
        'totalAmount',
        'phoneNumber',
        'verificationStatus',
        'esewa_status',
        'bookOrderId'
    ];

    // Define the inverse relationship with the user
    public function user()
    {
        return $this->belongsTo(User::class, 'userId'); // 'userId' is the foreign key in the bookings table
    }

    public function event()
    {
        return $this->belongsTo(Event::class, 'eventId'); // 'eventId' is the foreign key in the bookings table
    }
}

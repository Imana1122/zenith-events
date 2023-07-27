<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Event;
use App\Models\Trainer;
use App\Models\User;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function searchEvents(Request $request)
    {
        $query = $request->input('query');

        $events = Event::where('title', 'LIKE', "%$query%")
            ->orWhere('description', 'LIKE', "%$query%")
            ->orWhere('id', 'LIKE', "%$query%")
            ->orWhere('price', 'LIKE', "%$query%")
            ->orWhere('address', 'LIKE', "%$query%")
            ->orWhere('start_date', 'LIKE', "%$query%")
            ->orWhere('end_date', 'LIKE', "%$query%")
            ->orWhere('workshop', 'LIKE', "%$query%")
            ->orWhere('eventHostDetails', 'LIKE', "%$query%")
            ->orWhere('created_at', 'LIKE', "%$query%")
            ->orWhere('updated_at', 'LIKE', "%$query%")
            ->get();

        // Additional search based on trainers
        $trainers = Trainer::where('name', 'LIKE', "%$query%")->get();

        foreach ($trainers as $trainer) {
            $events = $events->merge($trainer->events);
        }

        return response()->json($events);

    }

    public function searchUsers(Request $request)
    {
        $query = $request->input('query');

        $users = User::where('name', 'LIKE', "%$query%")
            ->orWhere('email', 'LIKE', "%$query%")
            ->orWhere('id', 'LIKE', "%$query%")
            ->orWhere('phoneNumber', 'LIKE', "%$query%")
            ->get();

        return response()->json($users);
    }

    public function searchBookings(Request $request)
    {
        $query = $request->input('query');

        $bookings = Booking::where('userId', 'LIKE', "%$query%")
            ->orWhere('eventId', 'LIKE', "%$query%")
            ->orWhere('id', 'LIKE', "%$query%")
            ->orWhere('noOfPeople', 'LIKE', "%$query%")
            ->orWhere('phoneNumber', 'LIKE', "%$query%")
            ->orWhere('email', 'LIKE', "%$query%")
            ->get();

        return response()->json($bookings);
    }
}

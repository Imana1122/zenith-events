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

        $events = Event::with('trainers')
            ->where('title', 'LIKE', "%$query%")
            ->orWhere('id', 'LIKE', "%$query%")
            ->orWhere('workshop', 'LIKE', "%$query%")
            ->get();

        $now = now();
        $upcomingEvents = $events->filter(function ($event) use ($now) {
            return $event->start_date > $now;
        });

        $ongoingEvents = $events->filter(function ($event) use ($now) {
            return $event->start_date <= $now && $event->end_date >= $now;
        });

        $finishedEvents = $events->filter(function ($event) use ($now) {
            return $event->end_date < $now;
        });

        return response()->json([
            'All' => $events,
            'Upcoming' => $upcomingEvents,
            'Ongoing' => $ongoingEvents,
            'Finished' => $finishedEvents,
        ]);
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

        $bookings = Booking::with('event')
        ->where('esewa_status', true)
        ->where(function ($innerQuery) use ($query) {
            $innerQuery->where('userId', 'LIKE', "%$query%")
                ->orWhere('eventId', 'LIKE', "%$query%")
                ->orWhere('id', 'LIKE', "%$query%");
        })
        ->get();


        $now = now();
        $upcomingBookings = $bookings->filter(function ($booking) use ($now) {
            return $booking->event->start_date > $now;
        });

        $ongoingBookings = $bookings->filter(function ($booking) use ($now) {
            return $booking->event->start_date <= $now && $booking->event->end_date >= $now;
        });

        $finishedBookings = $bookings->filter(function ($booking) use ($now) {
            return $booking->event->end_date < $now;
        });

        return response()->json([
            'All' => $bookings,
            'Upcoming' => $upcomingBookings,
            'Ongoing' => $ongoingBookings,
            'Finished' => $finishedBookings,
        ]);
    }


    public function searchTrainers(Request $request)
    {
        $query = $request->input('query');

        $trainers = Trainer::where('id', 'LIKE', "%$query%")
            ->orWhere('name', 'LIKE', "%$query%")
            ->orWhere('post', 'LIKE', "%$query%")
            ->orWhere('skillLevel', 'LIKE', "%$query%")
            ->get();

        return response()->json($trainers);
    }
}

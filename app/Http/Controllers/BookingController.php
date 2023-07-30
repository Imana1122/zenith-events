<?php

namespace App\Http\Controllers;

use App\Http\Requests\BookingRequest;
use App\Models\Booking;
use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class BookingController extends Controller
{
    public function store(BookingRequest $request) {
        $data = $request->validated();

        // Retrieve the event based on eventId
        $event = Event::find($data['eventId']);

        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        // Calculate the total amount based on event price and noOfPeople
        $totalAmount = $event->price * $data['noOfPeople'];

        // Convert totalAmount to an integer (assuming it's in decimal format, you can adjust as needed)
        $totalAmount = (int) $totalAmount;
        $data['totalAmount'] = (int) $data['totalAmount'];

        if ($totalAmount === $data['totalAmount']) {
            Booking::create([
                'userId' => $data['userId'],
                'name' => $data['name'],
                'email' => $data['email'],
                'address'  => $data['address'],
                'eventId'  => $data['eventId'],
                'noOfPeople'  => $data['noOfPeople'],
                'totalAmount'  => $totalAmount, // Use the calculated totalAmount
                'phoneNumber'  => $data['phoneNumber'],
                'verificationStatus'  => true,
                'esewa_status'  => 'uncertain',
                'bookOrderId' => $data['bookOrderId']
            ]);

            // Optionally, you can return a success response or perform additional actions
            return response()->json(['message' => 'true']);
        } else {
            return response()->json(['error' => 'No further booking can be done.'], 400);
        }
    }




    public function getAllBookings()
    {
        $today = Carbon::today()->format('Y-m-d');

        $bookings = DB::table('bookings')
            ->join('events', 'bookings.eventId', '=', 'events.id')
            ->select('bookings.*')
            ->whereRaw("STR_TO_DATE(events.end_date, '%Y-%m-%d') >= ?", [$today])
            ->where('bookings.esewa_status', true)
            ->get();


        $ongoingBookings = DB::table('bookings')
            ->join('events', 'bookings.eventId', '=', 'events.id')
            ->select('bookings.*')
            ->whereRaw("STR_TO_DATE(events.start_date, '%Y-%m-%d') <= ?", [$today])
            ->whereRaw("STR_TO_DATE(events.end_date, '%Y-%m-%d') >= ?", [$today])
            ->where('bookings.esewa_status', true)
            ->get();

        $yetToBeBookings = DB::table('bookings')
            ->join('events', 'bookings.eventId', '=', 'events.id')
            ->select('bookings.*')
            ->whereRaw("STR_TO_DATE(events.start_date, '%Y-%m-%d') > ?", [$today])
            ->where('bookings.esewa_status', true)
            ->get();

        $finishedBookings = DB::table('bookings')
            ->join('events', 'bookings.eventId', '=', 'events.id')
            ->select('bookings.*')
            ->whereRaw("STR_TO_DATE(events.end_date, '%Y-%m-%d') < ?", [$today])
            ->where('bookings.esewa_status', true)
            ->get();

        return response()->json([
            'All' => $bookings,
            'Ongoing' => $ongoingBookings,
            'Upcoming' => $yetToBeBookings,
            'Finished' => $finishedBookings
        ]);
    }


    public function getRevenue()
    {
        $currentYear = date('Y');
        $monthlyRevenue = DB::table('bookings')

            ->selectRaw('MONTH(created_at) AS month, SUM(totalAmount) AS revenue')
            ->whereRaw("YEAR(created_at) = ?", [$currentYear])
            ->where('bookings.esewa_status', true)
            ->groupBy('month')
            ->orderBy('month')
            ->get();



        $userYearlyRevenue = DB::table('bookings')
                ->join('users', 'bookings.userId', '=', 'users.id')
                ->selectRaw('users.id AS userId, users.name AS userName, SUM(bookings.totalAmount) AS revenue')
                ->whereRaw("YEAR(bookings.created_at) = ?", [$currentYear])
                ->where('bookings.esewa_status', true)
                ->groupBy('users.id', 'users.name')
                ->orderBy('users.id')
                ->get();

    $totalYearlyRevenue = DB::table('bookings')
    ->selectRaw('YEAR(created_at) AS year, SUM(totalAmount) AS revenue')
        ->where('bookings.esewa_status', true)
        ->groupBy('year')
        ->get();

        return response()->json(['monthlyRevenue' => $monthlyRevenue, 'userYearlyRevenue' => $userYearlyRevenue,'totalYearlyRevenue'=>$totalYearlyRevenue  ]);
    }






    public function deleteBooking($id)
    {
        $booking = Booking::findOrFail($id);
        $booking->delete();

        return response()->json([
            'message' => 'Booking deleted successfully.',
        ]);
    }

    public function getMostBookedEvents(Request $request)
    {
        $popularEvents = Event::leftJoin('bookings', function ($join) {
            $join->on('events.id', '=', 'bookings.eventId')
                 ->where('bookings.esewa_status', true);
        })
        ->select('events.*', DB::raw('COUNT(bookings.eventId) as bookings_count'))
        ->groupBy('events.id', 'events.title', 'events.workshop', 'events.start_date', 'events.end_date', 'events.eventHostDetails', 'events.imagePath', 'events.description', 'events.price', 'events.address', 'events.created_at', 'events.updated_at')
        ->orderBy('bookings_count', 'DESC')
        ->get();


    $events = DB::table('bookings')
    ->select('eventId', DB::raw('COUNT(eventId) as booking_count'))
    ->groupBy('eventId')
    ->orderBy('booking_count', 'DESC')
    ->get();

        return response()->json(['popularEvents'=> $popularEvents, 'orderedEvents'=>$events]);

    }

    public function userBooking(Request $request) {
        // Get the currently authenticated user
        $user = Auth::user();

        // Get the bookings for the user with esewa_status true
        $bookings = $user->bookings()
        ->where('esewa_status', true)
        ->with('event')
        ->get();

        // Get today's date
        $today = Carbon::today();

        // Separate the bookings into different categories based on their dates
        $allBookings = [];
        $finishedBookings = [];
        $ongoingBookings = [];
        $yetToBeBookings = [];

        foreach ($bookings as $booking) {
            $startDate = Carbon::parse($booking->getAttribute('start_date'));
            $endDate = Carbon::parse($booking->getAttribute('end_date'));

            // Check if the booking is already finished
            if ($endDate->isBefore($today)) {
                $finishedBookings[] = $booking;
            } elseif ($startDate->isAfter($today)) {
                // Check if the booking is yet to be
                $yetToBeBookings[] = $booking;
            } else {
                // Otherwise, the booking is ongoing
                $ongoingBookings[] = $booking;
            }

            // Add the booking to the "all" bookings array
            $allBookings[] = $booking;
        }

        // Return the bookings in the response
        return response()->json([
            'All' => $allBookings,
            'Finished' => $finishedBookings,
            'Ongoing' => $ongoingBookings,
            'Upcoming' => $yetToBeBookings,
        ]);
    }


    public function deleteSpecificUserBooking($bookingId)
    {
        // Get the authenticated user
        $user = Auth::user();

        // Find the booking by the given bookingId that belongs to the authenticated user
        $booking = $user->bookings()->find($bookingId);

        // Check if the booking exists and belongs to the user
        if ($booking) {
            // Get the end_date of the booking and parse it with Carbon
            $endDate = Carbon::parse($booking->getAttribute('end_date'));

            // Get today's date
            $today = Carbon::today();

            // Check if the booking's end_date is after today's date
            if ($endDate->isAfter($today)) {
                // Delete the booking if conditions are met
                $booking->delete();
                return response()->json(['success' => 'Booking deleted successfully.']);
            } else {
                return response()->json(['error' => 'The booking end date has already passed.']);
            }
        } else {
            return response()->json(['error' => 'Booking not found or you are not authorized to delete it.']);
        }
    }

}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\BookingRequest;
use App\Models\Booking;
use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class BookingController extends Controller
{
    public function store(BookingRequest $request){

        $data = $request->validated();

        Booking::create([
            'userId' => $data['userId'],
            'name' => $data['name'],
            'email' => $data['email'],
            'address'  => $data['address'],
            'eventId'  => $data['eventId'],
            'noOfPeople'  => $data['noOfPeople'],
            'totalAmount'  => $data['totalAmount'],
            'phoneNumber'  => $data['phoneNumber'],
            'verificationStatus'  => true,
            'esewa_status'  => 'uncertain',
            'bookOrderId' => $data['bookOrderId']

        ]);
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
        'bookings' => $bookings,
        'ongoingBookings' => $ongoingBookings,
        'yetToBeBookings' => $yetToBeBookings,
        'finishedBookings' => $finishedBookings
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

    public function userBooking(Request $request){
        // Get the currently authenticated user
    $user = Auth::user();

    // Get the bookings for the user
    $bookings = $user->bookings;


    return response()->json(['userBookings'=> $bookings]);
    }

    public function deleteSpecificUserBooking($bookingId)
{
    // Get the authenticated user
    $user = Auth::user();

    // Find the booking by the given bookingId that belongs to the authenticated user
    $booking = $user->bookings()->find($bookingId);

    // If the booking exists and belongs to the user, delete it
    if ($booking) {
        $booking->delete();
        return response()->json(['success'=> 'Booking deleted successfully.']);
    } else {
        return response()->json(['error'=> 'Booking not found or you are not authorized to delete it.']);
    }
}
}
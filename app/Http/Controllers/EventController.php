<?php

namespace App\Http\Controllers;

use App\Http\Requests\EventRequest;
use App\Models\Event;
use App\Models\EventTrainer;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class EventController extends Controller
{
    public function createEvent(EventRequest $request)
{
    $data = $request->validated();


    // Use mass assignment to create the event
    $event = Event::create([
        'title'=> $data['title'],
        'price' => $data['price'],
        'address' => $data['address'],
        'start_date' => $data['start_date'],
        'end_date' => $data['end_date'],
        'workshop' =>$data['workshop'],
        'imagePath'=>$data['imagePath'],
        'description' => $data['description'],
        'eventHostDetails' => $data['eventHostDetails']]
    );

        $eventId = $event->id;
        $selectedTrainers = $data['selectedTrainers'];

     // Insert the data into the events_trainers table
     foreach ($selectedTrainers as $trainerId) {
        // Use Eloquent to insert data into the events_trainers table
        EventTrainer::create([
            'event_id' => $eventId,
            'trainer_id' => $trainerId,
        ]);
    }

    return response()->json(['message' => 'event and trainers saved successfully']);
}

public function getAllEvents()
{

    {
        $events = Event::with('trainers')->get();

        return response()->json($events);
    }
}

public function getEvents()
{
    $today = Carbon::today()->format('Y-m-d');
    $events = Event::with('trainers')->where('start_date', '>', $today)->get();

    return response()->json(['events' => $events]);
}


public function getEventById($eventId)
    {
        try {
            $event = Event::with('trainers')->findOrFail($eventId);
            return response()->json(['event' => $event]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Event not found'], 404);
        }
    }

    public function updateEvent(EventRequest $request, $id)
    {
        $event = Event::findOrFail($id);

        $data = $request->validated();

        $event->update([
            'title' => $data['title'],
            'price' => $data['price'],
            'address' => $data['address'],
            'start_date' => $data['start_date'],
            'end_date' => $data['end_date'],
            'workshop' => $data['workshop'],
            'imagePath' => $data['imagePath'],
            'description' => $data['description'],
            'eventHostDetails' => $data['eventHostDetails']
        ]);

        // Sync the selected trainers with the event
        $event->trainers()->sync($data['selectedTrainers']);

        return response()->json([
            'event' => $event,
            'message' => 'Event updated successfully.',
        ]);
    }


    public function deleteEvent($id)
    {
        // Find and delete the event from the events table
        $event = Event::findOrFail($id);
        $event->delete();

        // Delete records from the events_trainers table where event_id matches $id
        DB::table('events_trainers')->where('event_id', $id)->delete();

        return response()->json([
            'message' => 'Event and related trainers deleted successfully.',
        ]);
    }


    // Inside your controller method or any relevant file
public function getUserEvents()
{
    // Get the currently authenticated user
    $user = Auth::user();

    // Get the events for the user
    $bookings = $user->bookings()->with('event')->where('esewa_status', true)->get();

    return response()->json(['bookings' => $bookings]);
}

}

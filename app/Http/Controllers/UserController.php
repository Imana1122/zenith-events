<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    //

    public function getUsers(Request $request)
    {
        // Get all users
        $users = User::all();

        // Get the number of bookings for each user
        $userIds = $users->pluck('id')->toArray();
        $bookingCounts = Booking::select('user_id', DB::raw('count(*) as booking_count'))
            ->whereIn('user_id', $userIds)
            ->groupBy('user_id')
            ->get();

        // Add the booking_count to each user
        foreach ($users as $user) {
            $user->booking_count = $bookingCounts->where('user_id', $user->id)->first()->booking_count ?? 0;
        }

        return response()->json(['users' => $users]);
    }



    public function destroyUser(Request $request, $id)
    {
        try {
            // Find the user by ID
            $user = User::findOrFail($id);

            // Verify the provided password
            $providedPassword = $request->input('password');
            if (!Hash::check($providedPassword, $user->password)) {
                // Password does not match, return an error response
                return response()->json(['error' => 'Incorrect password.'], 401);
            }

            // Perform the delete operation
            $user->delete();

            // Return a success response or redirect
            return response()->json(['success' => 'User deleted successfully.']);
            // OR
            // return redirect()->route('users.index')->with('success', 'User deleted successfully.');
        } catch (\Exception $e) {
            // Handle any exceptions that may occur during the deletion process
            return response()->json(['error' => 'Failed to delete user.'], 500);
            // OR
            // return redirect()->route('users.index')->with('error', 'Failed to delete user.');
        }
    }

    public function removeUser(Request $request, $id)
    {
        try {
            // Find the user by ID
            $user = User::findOrFail($id);


            // Perform the delete operation
            $user->delete();

            // Return a success response or redirect
            return response()->json(['success' => 'User deleted successfully.']);
        } catch (\Exception $e) {
            // Handle any exceptions that may occur during the deletion process
            return response()->json(['error' => 'Failed to delete user.'], 500);
        }
    }


}

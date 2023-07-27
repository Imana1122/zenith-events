<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    //

    public function getUsers(Request $request){
        $currentYear = date('Y');
        $users = DB::table('users')->get();

        $thisMonthUsers = DB::table('users') ->whereRaw("YEAR(created_at) = ?", [$currentYear])->get();

        return response()->json(['users'=> $users, 'thisMonthUsers'=>$thisMonthUsers]);
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

    
}

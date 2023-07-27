<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\PasswordResetMail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

class PasswordResetLinkController extends Controller
{

    /**
     * Handle an incoming password reset link request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */

    public function forgotPassword(Request $request)
    {
        // Validate the request data
        $request->validate(['email' => 'required|email']);

         // Check if the user with the given email exists
     $user = DB::table('users')->where('email', $request->email)->first();
     if (!$user) {
         return response()->json(['message' => 'User with this email does not exist.'], 404);
     }


        // Check if the email already exists in the password_reset_tokens table
        $existingToken = DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->first();

        // Generate a random token
        $token = Str::random(60);

        if ($existingToken) {
            // If the email already has a token, update the existing token and timestamp
            DB::table('password_reset_tokens')
                ->where('email', $request->email)
                ->update([
                    'token' => $token,
                    'created_at' => now(),
                ]);
        } else {
            // If there is no existing token, insert a new row in the password_reset_tokens table
            DB::table('password_reset_tokens')->insert([
                'email' => $request->email,
                'token' => $token,
                'created_at' => now(),
            ]);
        }

        // Send the reset link with the token to the user's email
        $resetLink = "http://localhost:3000/reset-password?token=$token&email=" . urlencode($request->email);

        // You can customize the email subject and body based on your requirements
        Mail::to($request->email)->send(new PasswordResetMail($resetLink));

        return response()->json(['message' => 'Password reset link sent successfully.']);
    }


    public function resetPassword(Request $request)
    {
        // Validate the request data
        $request->validate([
            'email' => 'required|email',
            'token' => 'required|string',
            'password' => 'required|string|confirmed|min:8',
        ]);

        // Check if the token exists in the password_resets table
        $resetData = DB::table('password_resets')
            ->where('email', $request->email)
            ->where('token', $request->token)
            ->first();

        if (!$resetData) {
            return response()->json(['message' => 'Invalid token or email.'], 400);
        }

        // Find the user by email
        $user = User::where('email', $request->email)->first();

        // If the user doesn't exist or there's an error updating the password
        if (!$user || !$user->update(['password' => Hash::make($request->password)])) {
            return response()->json(['message' => 'Unable to reset password.'], 500);
        }

        // Delete the used token from the password_resets table
        DB::table('password_resets')
            ->where('email', $request->email)
            ->delete();

        return response()->json(['message' => 'Password reset successful.']);
    }



}

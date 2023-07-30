<?php

namespace App\Http\Controllers;

use App\Models\PhoneNumberVerification;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class PhoneVerificationController extends Controller
{
    public function sendVerificationCode(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'phoneNumber' => [
                'required',
                'numeric',
                'digits:10',
                Rule::exists('users')->where(function ($query) use ($request) {
                    // Include a where clause to check for the phoneNumber in the users table.
                    $query->where('phoneNumber', $request->phoneNumber);
                }),
            ],
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $phoneNumber = strval($request->input('phoneNumber'));

        $verificationCode = mt_rand(10000, 99999);
        $encryptedCode= Hash::make($verificationCode);

        $phone_verification = PhoneNumberVerification::create([
            'phoneNumber' => $phoneNumber,
            'verificationCode' => $encryptedCode,
            'verificationStatus' => false,
        ]);
        try {
            $client = new Client();
            $response = $client->post('https://sms.aakashsms.com/sms/v3/send', [
                'form_params' => [
                    'auth_token' => 'c1eecbd817abc78626ee119a530b838ef57f8dad9872d092ab128776a00ed31d',
                    'to' => $phoneNumber,
                    'text' => "Your verification code is: $verificationCode",
                ],
            ]);

            if ($response->getStatusCode() === 200) {
                return response()->json(['message' => 'Verification code sent successfully', 'code' => $verificationCode]);
            } else {
                return response()->json(['error' => 'Failed to send verification code'], 500);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to send verification code: ' . $e->getMessage(), 'errorShow' => 'Failed to send verification code. Check your Internet Connection.'], 500);
        }
    }

    public function verifyPhoneNumber(Request $request)
    {

        $validator = Validator::make($request->all(), [

            'phoneNumber' => ['required', 'numeric'],
            'verificationCode' => ['required', 'numeric'],
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();

            $response = [

                'errors' => $errors->messages(),
            ];

            return response()->json($response, 400);
        }

        $phoneNumber = strval($request->input('phoneNumber'));
        $verificationCode = $request->input('verificationCode');

        $storedVerificationCode = DB::table('phone_number_verifications')
        ->where('phoneNumber', $phoneNumber)
        ->orderBy('created_at', 'desc')
        ->value('verificationCode');

        if (!$storedVerificationCode) {
            DB::table('phone_number_verifications')->where('phoneNumber', $phoneNumber)->delete();
            return response()->json(['error' => 'Verification code is missing or expired. Try generating code again.', 'verificationStatus' => false]);
        }

        if (Hash::check($verificationCode, $storedVerificationCode)) {
            DB::table('phone_number_verifications')->where('phoneNumber', $phoneNumber)->delete();
            return response()->json(['message' => 'Verification code is successful', 'verificationStatus' => true]);


        } else {
            DB::table('phone_number_verifications')->where('phoneNumber', $phoneNumber)->delete();
            return response()->json(['error' => 'Invalid verification code. Try regenerating again.', 'verificationStatus' => false]);
        }
    }

}

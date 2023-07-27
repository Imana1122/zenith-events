<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\PhoneNumberVerification;
use App\Models\User;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class AuthController extends Controller
{
    public function signupDataVerification(SignupRequest $request){
        $request->validated();

    }

    public function signupPhoneNumberVerification(Request $request){
        $validator = Validator::make($request->all(), [
            'phoneNumber' => [
                'required',
                'numeric',
                'digits:10',
                Rule::unique('users')->where(function ($query) use ($request) {
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
                return response()->json(['message' => 'Verification code sent successfully', 'verification_code' => $verificationCode]);
            } else {
                return response()->json(['error' => 'Failed to send verification code'], 500);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to send verification code: ' . $e->getMessage(), 'errorShow' => 'Failed to send verification code. Check your Internet Connection.'], 500);
        }
    }

    public function loginDataVerification(LoginRequest $request){
        $request->validated();

    }


    public function signup(SignupRequest $request)
   {
    $data = $request->validated();

    /** @var \App\Models\User $user */
    $user = User::create([
        'name' => $data['name'],
        'email' => $data['email'],
        'phoneNumber'=>$data['phoneNumber'],
        'password' => bcrypt($data['password'])
    ]);

    $token = $user->createToken('main')->plainTextToken;
    return response([
        'user' => [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'phoneNumber' => $user->phoneNumber
        ],
        'token' => $token
    ]);
   }

   public function login(LoginRequest $request)
   {
    $credentials =$request->validated();
    $remember = $credentials['remember'] ?? false;
    unset($credentials['remember']);

    if (!Auth::attempt($credentials, $remember)){
        return response([
            'error' => 'The Provided credentials are not correct'
        ], 422);
    }
    $user = Auth::user();
    $token = $user->createToken('main')->plainTextToken;

    return response([
        'user' => [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'phoneNumber' => $user->phoneNumber
        ],
        'token' => $token
    ]);
   }

   public function logout(Request $request)
   {
    /** @var User $user */
    $user = Auth::user();

    //Revoke the token that was used to authenticate the current request...
    $user -> currentAccessToken()->delete();
    return response([
        'success' => true
    ]);
   }


}

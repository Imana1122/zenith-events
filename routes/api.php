<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Routes that require CSRF protection
Route::middleware(['auth:sanctum'])->group(function () {

    // AuthController routes
    Route::post('/logout', [AuthController::class, 'logout']);

    // ProfileController routes
    Route::delete('/deleteUser', 'App\Http\Controllers\ProfileController@destroy');
    Route::put('/updatePassword', 'App\Http\Controllers\ProfileController@updatePassword');
    Route::put('/updateProfile', 'App\Http\Controllers\ProfileController@update');

    // BookingController routes
    Route::post('/createBooking', 'App\Http\Controllers\BookingController@store');
    Route::post('/booking', 'App\Http\Controllers\BookingController@store');
    Route::post('/esewa-payment', 'App\Http\Controllers\EsewaController@esewaPayment');
    Route::get('/bookings', 'App\Http\Controllers\BookingController@getAllBookings');
    Route::delete('/deleteBooking', 'App\Http\Controllers\BookingController@deleteBooking');
    Route::get('/getMostBookedEvents', 'App\Http\Controllers\BookingController@getMostBookedEvents');
    Route::get('/userBooking', 'App\Http\Controllers\BookingController@userBooking');
    Route::delete('/deleteSpecificUserBooking/{bookingId}', 'App\Http\Controllers\BookingController@deleteSpecificUserBooking');
    Route::get('/getRevenue', 'App\Http\Controllers\BookingController@getRevenue');

    // UserController routes
    Route::get('/getUsers', 'App\Http\Controllers\UserController@getUsers');
    Route::delete('/deleteUser/{id}', 'App\Http\Controllers\UserController@removeUser');

    // TrainerController routes
    Route::post('/createTrainer', 'App\Http\Controllers\TrainerController@createTrainer');
    Route::put('/updateTrainer/{trainerId}', 'App\Http\Controllers\TrainerController@updateTrainer');
    Route::delete('/deleteTrainer/{id}', 'App\Http\Controllers\TrainerController@deleteTrainer');
    Route::get('/allTrainers', 'App\Http\Controllers\TrainerController@getAllTrainers');
    Route::get('/trainers/{trainerId}', 'App\Http\Controllers\TrainerController@getTrainerById');

    // EventController routes
    Route::post('/createEvent', 'App\Http\Controllers\EventController@createEvent');
    Route::get('/allEvents', 'App\Http\Controllers\EventController@getAllEvents');
    Route::get('/events', 'App\Http\Controllers\EventController@getEvents');
    Route::get('/events/{eventId}', 'App\Http\Controllers\EventController@getEventById');
    Route::put('/updateEvent/{id}', 'App\Http\Controllers\EventController@updateEvent');
    Route::delete('/deleteEvent/{id}', 'App\Http\Controllers\EventController@deleteEvent');
    Route::get('/getUserEvents', 'App\Http\Controllers\EventController@getUserEvents');

    // EventTrainerController routes
    Route::post('/saveSelectedTrainers', 'App\Http\Controllers\EventTrainerController@saveSelectedTrainers');

    // SearchController routes
    Route::get('/search/events', 'App\Http\Controllers\SearchController@searchEvents');
    Route::get('/search/users', 'App\Http\Controllers\SearchController@searchUsers');
    Route::get('/search/bookings', 'App\Http\Controllers\SearchController@searchBookings');
    Route::get('/search/trainers', 'App\Http\Controllers\SearchController@searchTrainers');
});

// AuthController routes
Route::post('/signupDataVerification', 'App\Http\Controllers\AuthController@signupDataVerification');
Route::post('/signupPhoneNumberVerification', 'App\Http\Controllers\AuthController@signupPhoneNumberVerification');
Route::post('/signup', 'App\Http\Controllers\AuthController@signup');
Route::post('/loginDataVerification', 'App\Http\Controllers\AuthController@loginDataVerification');
Route::post('/login', 'App\Http\Controllers\AuthController@login');

// ForgotPasswordController route
Route::put('/resetPassword', 'App\Http\Controllers\ForgotPasswordController@resetPassword');

// PhoneVerificationController routes
Route::post('/verify-phone', 'App\Http\Controllers\PhoneVerificationController@sendVerificationCode');
Route::post('/verify-code', 'App\Http\Controllers\PhoneVerificationController@verifyPhoneNumber');

// EventController routes
Route::get('/events', 'App\Http\Controllers\EventController@getEvents');


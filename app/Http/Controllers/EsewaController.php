<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;

class EsewaController extends Controller
{

    public function esewaPayment(Request $request)
    {

        $amountPaid =$request->input('amt');

        $bookOrderId = $request->input('oid');

        // Retrieve the booking record based on the bookOrderId
        $booking = Booking::where('bookOrderId', $bookOrderId)->first();


        if ($booking) {
            $amountToPay = $booking->totalAmount;
            $totalAmountToPay = (int)$amountToPay ; // Convert the string to an integer
            $totalPaid = (int)$amountPaid;


            if ($totalAmountToPay === $totalPaid) {
                // Update the booking record
                $booking->esewa_status = true;
                $booking->save();
            } else {
                // Handle the case when the paid amount doesn't match the expected amount
                return response()->json(['message' => 'Paid amount does not match the expected amount'], 400);
            }
        } else {
            // Handle the case when the booking with the given bookOrderId is not found
            return response()->json(['message' => 'Booking not found'], 404);
        }

        // Optionally, you can return a success response or perform additional actions
        return response()->json(['message' => 'Booking done successfully']);
    }



}

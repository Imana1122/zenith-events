<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BookingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules()
    {
        return [
            'userId' => 'required|exists:users,id',
            'name' => 'required',
            'email' => 'required|email',
            'address' => 'required',
            'phoneNumber' => 'required',
            'verificationStatus' => 'required',
            'eventId' => 'required|exists:events,id',
            'noOfPeople' => 'required|integer',
            'totalAmount' => 'required|numeric',
            'bookOrderId' => 'required'
        ];
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EventRequest extends FormRequest
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
    public function rules(): array
    {
        return [
            'title' => 'required|string',
            'price' => 'required|string',
            'address' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'workshop' => 'required|string',
            'description' => 'required|string',
            'eventHostDetails' => 'required|string',
            'imagePath' => 'nullable|string', // Allow only image files (jpeg, png, jpg, gif) with a maximum size of 2MB
            'selectedTrainers' => 'required|array',
        ];

    }

}

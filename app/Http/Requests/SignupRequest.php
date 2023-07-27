<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class SignupRequest extends FormRequest
{
    // ...

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        $hashedPassword = bcrypt($this->input('password'));
        return [
            'name' => 'required|string|min:5',
            'email' => 'required|email|unique:users,email|string',
            'phoneNumber' => 'required|numeric|digits:10|unique:users',
            'password' => [
                'required',
                'confirmed',
                Password::min(8)->mixedCase()->numbers()->symbols(),
            ],
        ];

    }
}

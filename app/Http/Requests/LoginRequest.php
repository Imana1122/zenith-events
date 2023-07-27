<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class LoginRequest extends FormRequest
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
            'phoneNumber' => [
                'required',
                'numeric',
                'digits:10',
                Rule::exists('users')->where(function ($query) {
                    $query->where('phoneNumber', $this->phoneNumber);
                }),
            ],
            'password' => [
                'required',
                function ($attribute, $value, $fail) {
                    $user = User::where('phoneNumber', $this->phoneNumber)->first();
                    if (!$user || !Hash::check($value, $user->password)) {
                        $fail('Invalid credentials');
                    }
                },
            ],
        ];




    }

}

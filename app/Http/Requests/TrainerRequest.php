<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TrainerRequest extends FormRequest
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
            'name' => 'required|string',
            'post' => 'required|string',
            'skillLevel' => 'required|string',
            'experienceYears' => 'required|integer',
            'imagePath' => 'nullable|string', // Allow only image files (jpeg, png, jpg, gif) with a maximum size of 2MB
        ];
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ImageController extends Controller
{
    public function uploadImage(Request $request)
    {
        // Validate the uploaded image
        $request->validate([
            'image' => 'required|image|max:2048', // Assuming 'image' is the name of the file input field
        ]);

        if ($request->hasFile('image')) {
            // Get the uploaded file
            $uploadedFile = $request->file('image');

            // Generate a unique filename
            $filename = uniqid() . '.' . $uploadedFile->getClientOriginalExtension();

            // Move the uploaded file to a storage location
            $uploadedFile->storeAs('images', $filename, 'public'); // Assuming 'public' disk is used and 'images' is the storage directory

            // Return the path or URL of the stored image
            $imageUrl = asset('storage/images/' . $filename);

            return response()->json(['imageUrl' => $imageUrl]);
        }

        return response()->json(['error' => 'No image file provided.'], 400);
    }
}

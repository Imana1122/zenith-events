<?php

namespace App\Http\Controllers;

use App\Http\Requests\TrainerRequest;
use App\Models\Trainer;

class TrainerController extends Controller
{
    public function createTrainer(TrainerRequest $request)
    {
        $data = $request->validated();

        $event = Trainer::create([
          'name' => $data['name'],
          'post' => $data['post'],
          'skillLevel' => $data['skillLevel'],
          'experienceYears' => $data['experienceYears'],
          'imagePath' => $data['imagePath'],
        ]);



        return response()->json([
            'event' => $event,
        ]);
    }

    public function getAllTrainers()
    {
        $trainers = Trainer::all();

        return response()->json(['trainers' => $trainers]);
    }

    public function getTrainerById($trainerId)
        {
            try {
                $trainer = Trainer::findOrFail($trainerId);
                return response()->json(['event' => $trainer]);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Trainer not found'], 404);
            }
        }

    public function updateTrainer(TrainerRequest $request, $id)
        {
            $event = Trainer::findOrFail($id);

            $data = $request->validated();

            $event->update([
                'name' => $data['name'],
                'post' => $data['post'],
                'skillLevel' => $data['skillLevel'],
                'experienceYears' => $data['experienceYears'],
                'imagePath' => $data['imagePath'],
            ]);

            return response()->json([
                'event' => $event,
                'message' => 'Trainer updated successfully.',
            ]);
        }

        public function deleteTrainer($id)
        {
            $event = Trainer::findOrFail($id);
            $event->delete();

            return response()->json([
                'message' => 'Trainer deleted successfully.',
            ]);
        }
}

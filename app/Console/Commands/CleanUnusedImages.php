<?php

namespace App\Console\Commands;

use App\Models\Event;
use App\Models\Trainer;
use App\Models\User;
use File;
use Illuminate\Console\Command;

class CleanUnusedImages extends Command
{
    protected $signature = 'images:clean';
    protected $description = 'Delete images in the folder not present in the database';

    public function handle()
    {
    $usersImagePaths = User::pluck('imagePath')->toArray();
    $eventsImagePaths = Event::pluck('imagePath')->toArray();
    $trainersImagePaths = Trainer::pluck('imagePath')->toArray();

    // Combine all image paths into one array
    $databaseImagePaths = array_merge($usersImagePaths, $eventsImagePaths, $trainersImagePaths);

    $folderPath = storage_path('app/public/images');
    $folderFilenames = array_map(function ($file) {
        return pathinfo($file, PATHINFO_FILENAME);
    }, File::files($folderPath));

    $unusedFilenames = array_diff($folderFilenames, $databaseImagePaths);

    foreach ($unusedFilenames as $filename) {
        $filePath = $folderPath . '/' . $filename;
        if (File::exists($filePath)) {
            File::delete($filePath);
            $this->info('Deleted: ' . $filename);
        }
    }
}
}

<?php

namespace App\Console\Commands;

use App\Models\PhoneNumberVerification;
use Carbon\Carbon;
use Illuminate\Console\Command;

class DeletePhoneVerificationTask extends Command
{
    protected $signature = 'phone-verification:delete';
    protected $description = 'Delete phone verification records older than 2 minutes';

    public function handle()
    {
        // Calculate the time 2 minutes ago
        $twoMinutesAgo = Carbon::now()->subMinutes(2);

        // Delete the phone verification records older than 2 minutes
        PhoneNumberVerification::where('created_at', '<', $twoMinutesAgo)->delete();

        $this->info('Phone verification records deleted successfully.');
    }
}

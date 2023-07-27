<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('userId')->constrained('users')->onDelete('cascade');
            $table->string('name');
            $table->string('email');
            $table->string('address');
            $table->foreignId('eventId')->constrained('events')->onDelete('cascade');
            $table->string('noOfPeople');
            $table->string('totalAmount');
            $table->string('phoneNumber');
            $table->boolean('verificationStatus');
            $table->string('esewa_status');
            $table->string('bookOrderId');
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};

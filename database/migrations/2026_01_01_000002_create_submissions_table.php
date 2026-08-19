<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('submissions', function (Blueprint $table) {
            $table->id();
            $table->string('submission_id')->unique();
            $table->string('company_name');
            $table->string('industry');
            $table->string('company_size');
            $table->string('location');
            $table->text('ai_goal')->nullable();
            $table->text('ai_use_case')->nullable();
            $table->text('ai_tools')->nullable();
            $table->string('ai_current_use')->nullable();
            $table->string('ai_frequent_use')->nullable();
            $table->text('ai_learning_need')->nullable();
            $table->text('ai_mastery_target')->nullable();
            $table->string('timeline')->nullable();
            $table->string('full_name');
            $table->string('job_title');
            $table->string('email');
            $table->string('phone');
            $table->float('overall_score', 8, 2);
            $table->json('scores');
            $table->string('readiness_level');
            $table->text('readiness_description')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('submissions');
    }
};

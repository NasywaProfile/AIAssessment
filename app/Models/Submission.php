<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Submission extends Model
{
    use HasFactory;

    protected $fillable = [
        'submission_id',
        'company_name',
        'industry',
        'company_size',
        'location',
        'ai_goal',
        'ai_use_case',
        'ai_tools',
        'ai_current_use',
        'ai_frequent_use',
        'ai_learning_need',
        'ai_mastery_target',
        'timeline',
        'full_name',
        'job_title',
        'email',
        'phone',
        'overall_score',
        'scores',
        'readiness_level',
        'readiness_description',
    ];

    protected $casts = [
        'scores' => 'array',
        'overall_score' => 'float',
    ];
}

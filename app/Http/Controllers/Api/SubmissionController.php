<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Submission;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SubmissionController extends Controller
{
    public function index()
    {
        $submissions = Submission::orderBy('created_at', 'desc')->get()->map(function ($sub) {
            return [
                'id' => $sub->submission_id,
                'timestamp' => $sub->created_at->toISOString(),
                'companyName' => $sub->company_name,
                'industry' => $sub->industry,
                'companySize' => $sub->company_size,
                'location' => $sub->location,
                'aiGoal' => $sub->ai_goal ?? '',
                'aiUseCase' => $sub->ai_use_case ?? '',
                'aiTools' => $sub->ai_tools ?? '',
                'aiCurrentUse' => $sub->ai_current_use ?? '',
                'aiFrequentUse' => $sub->ai_frequent_use ?? '',
                'aiLearningNeed' => $sub->ai_learning_need ?? '',
                'aiMasteryTarget' => $sub->ai_mastery_target ?? '',
                'timeline' => $sub->timeline ?? '',
                'fullName' => $sub->full_name,
                'jobTitle' => $sub->job_title,
                'email' => $sub->email,
                'phone' => $sub->phone,
                'overallScore' => (float)$sub->overall_score,
                'scores' => $sub->scores,
                'readinessLevel' => $sub->readiness_level,
                'readinessDescription' => $sub->readiness_description ?? '',
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $submissions
        ]);
    }

    public function show($id)
    {
        $sub = Submission::where('submission_id', $id)->first();

        if (!$sub) {
            return response()->json([
                'success' => false,
                'message' => 'Submission not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $sub->submission_id,
                'timestamp' => $sub->created_at->toISOString(),
                'companyName' => $sub->company_name,
                'industry' => $sub->industry,
                'companySize' => $sub->company_size,
                'location' => $sub->location,
                'aiGoal' => $sub->ai_goal ?? '',
                'aiUseCase' => $sub->ai_use_case ?? '',
                'aiTools' => $sub->ai_tools ?? '',
                'aiCurrentUse' => $sub->ai_current_use ?? '',
                'aiFrequentUse' => $sub->ai_frequent_use ?? '',
                'aiLearningNeed' => $sub->ai_learning_need ?? '',
                'aiMasteryTarget' => $sub->ai_mastery_target ?? '',
                'timeline' => $sub->timeline ?? '',
                'fullName' => $sub->full_name,
                'jobTitle' => $sub->job_title,
                'email' => $sub->email,
                'phone' => $sub->phone,
                'overallScore' => (float)$sub->overall_score,
                'scores' => $sub->scores,
                'readinessLevel' => $sub->readiness_level,
                'readinessDescription' => $sub->readiness_description ?? '',
            ]
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'companyName' => 'required',
            'industry' => 'required',
            'fullName' => 'required',
            'email' => 'required|email',
            'overallScore' => 'required',
            'scores' => 'required|array',
            'readinessLevel' => 'required',
        ]);

        $submissionId = (string) Str::uuid();

        $submission = Submission::create([
            'submission_id' => $submissionId,
            'company_name' => $request->companyName,
            'industry' => $request->industry,
            'company_size' => $request->companySize ?? '-',
            'location' => $request->location ?? '-',
            'ai_goal' => $request->aiGoal ?? '',
            'ai_use_case' => $request->aiUseCase ?? '',
            'ai_tools' => $request->aiTools ?? '',
            'ai_current_use' => $request->aiCurrentUse ?? '',
            'ai_frequent_use' => $request->aiFrequentUse ?? '',
            'ai_learning_need' => $request->aiLearningNeed ?? '',
            'ai_mastery_target' => $request->aiMasteryTarget ?? '',
            'timeline' => $request->timeline ?? '',
            'full_name' => $request->fullName,
            'job_title' => $request->jobTitle ?? '-',
            'email' => $request->email,
            'phone' => $request->phone ?? '-',
            'overall_score' => $request->overallScore,
            'scores' => $request->scores,
            'readiness_level' => $request->readinessLevel,
            'readiness_description' => $request->readinessDescription ?? '',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Assessment saved successfully to MySQL database',
            'submissionId' => $submissionId,
            'id' => $submissionId
        ], 201);
    }

    public function destroy($id)
    {
        $submission = Submission::where('submission_id', $id)->first();
        if ($submission) {
            $submission->delete();
            return response()->json(['success' => true, 'message' => 'Submission deleted']);
        }
        return response()->json(['success' => false, 'message' => 'Submission not found'], 404);
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CmsSetting;
use Illuminate\Http\Request;

class CmsController extends Controller
{
    public function index()
    {
        $categories = CmsSetting::where('key', 'categories')->first()?->value ?? [];
        $questions = CmsSetting::where('key', 'questions')->first()?->value ?? [];
        $industries = CmsSetting::where('key', 'industries')->first()?->value ?? [];
        $readinessLevels = CmsSetting::where('key', 'readinessLevels')->first()?->value ?? [];

        return response()->json([
            'success' => true,
            'data' => [
                'categories' => $categories,
                'questions' => $questions,
                'industries' => $industries,
                'readinessLevels' => $readinessLevels,
            ]
        ]);
    }

    public function update(Request $request)
    {
        if ($request->has('categories')) {
            CmsSetting::updateOrCreate(['key' => 'categories'], ['value' => $request->categories]);
        }
        if ($request->has('questions')) {
            CmsSetting::updateOrCreate(['key' => 'questions'], ['value' => $request->questions]);
        }
        if ($request->has('industries')) {
            CmsSetting::updateOrCreate(['key' => 'industries'], ['value' => $request->industries]);
        }
        if ($request->has('readinessLevels')) {
            CmsSetting::updateOrCreate(['key' => 'readinessLevels'], ['value' => $request->readinessLevels]);
        }

        return response()->json([
            'success' => true,
            'message' => 'CMS config updated in MySQL database'
        ]);
    }
}

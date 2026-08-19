<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\SubmissionController;
use App\Http\Controllers\Api\CmsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::post('/auth/login', [AuthController::class, 'login']);

Route::get('/submissions', [SubmissionController::class, 'index']);
Route::get('/submissions/{id}', [SubmissionController::class, 'show']);
Route::post('/submissions', [SubmissionController::class, 'store']);
Route::delete('/submissions/{id}', [SubmissionController::class, 'destroy']);

Route::get('/cms', [CmsController::class, 'index']);
Route::post('/cms', [CmsController::class, 'update']);

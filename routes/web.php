<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'name' => 'Nortis AI Assessment API',
        'framework' => 'Laravel 11',
        'php_version' => PHP_VERSION,
        'status' => 'online'
    ]);
});

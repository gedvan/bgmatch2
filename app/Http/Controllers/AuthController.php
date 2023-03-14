<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Perform user login.
     *
     * @return void
     */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return response()->json([
                'user' => Auth::user(),
            ]);
        }

        return response()->json([
            'message' => 'Erro ao efetuar login.',
            'errors' => [
                'email' => ['Email ou senha inválidos'],
            ],
        ], 401);
    }
}

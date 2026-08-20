<?php

namespace App\Http\Controllers\MasterData;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\AccountManagementServie;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccountManagementController extends Controller
{
    //
    protected AccountManagementServie $accountService;
    public function __construct()
    {
        $this->accountService = new AccountManagementServie();
    }

    public function index()
    {
        $userWithRoles = $this->accountService->index();
        return Inertia::render('masters/account-management', ['users' => $userWithRoles]);
    }

    public function store(Request $request)
    {
        $validate = $request->validate([
            'name' => ['required'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
            'role' => ['required', 'in:super-admin,admin'],
        ]);
        $this->accountService->store($validate);
    }
}

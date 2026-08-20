<?php

namespace App\Services;

use App\Http\Resources\TransactionResource;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;

class AccountManagementServie
{
    protected User $user;

    public function __construct()
    {
        $this->user = new User();
    }

    public function index()
    {
        $userWithRoles = $this->user->with(['roles' => fn($user) => $user->select('id as role_id', 'name as role_name')])->select('id', 'name', 'email', 'status')->get();

        return $userWithRoles;
    }

    public function store(array $request)
    {
        $user = $this->user->create($request);
        $user->assignRole($request['role']);
    }

    public function update(array $request, int $id)
    {
        $user = $this->user->find($id);
        $user->update(['status' => $request['status']]);
        $user->syncRoles($request['role']);
    }
}

<?php

namespace App\Http\Controllers\MasterData;

use App\Http\Controllers\Controller;
use App\Models\MasterBank;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MasterBankController extends Controller
{


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $bankData = MasterBank::get()->all();

        return Inertia::render('MasterBank', [
            'bankData' => $bankData
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = $request->validate([
            'name' => 'required',
        ]);

        MasterBank::create($validate);
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        // $bankData = MasterBank::get()->all();
        return response()->json('sd');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id, MasterBank $bank)
    {
        $validate = $request->validate([
            'name' => 'required',
            'status' => 'in:active,nonactive',
        ]);

        $bank->find($id)->update($validate);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

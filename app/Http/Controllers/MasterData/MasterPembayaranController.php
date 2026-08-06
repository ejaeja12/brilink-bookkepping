<?php

namespace App\Http\Controllers\MasterData;

use App\Http\Controllers\Controller;
use App\Models\MasterPembayaran;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MasterPembayaranController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $dataPembayaran = MasterPembayaran::get()->all();
        return Inertia::render('masters/MasterPembayaran', ['dataPembayaran' => $dataPembayaran]);
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
        MasterPembayaran::create($validate);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
    public function update(Request $request, string $id, MasterPembayaran $pembayaran)
    {
        $validate = $request->validate([
            'name' => 'required',
        ]);


        $pembayaran->find($id)->update($validate);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

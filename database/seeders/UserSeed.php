<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use File;

class UserSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $json = File::get('database/seeders/users.json');
        $data = json_decode($json);
        foreach($data as $obj) {
            User::create([
                'name' => $obj->name,
                'email' => $obj->email,
                'password' => Hash::make($obj->password),
            ]);
        }
    }
}

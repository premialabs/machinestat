<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Artisan;
class RunInitialSeeder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'pl:runInitialSeeder';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        Artisan::call('db:seed', [
            '--class' => 'Premialabs\Seeders\InitialDataSeeder'
        ]);

    

   }
}

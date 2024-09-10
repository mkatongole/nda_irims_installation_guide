<?php

namespace App\Console;

use GuzzleHttp\Client;
use GuzzleHttp\Promise;
use Illuminate\Support\Facades\DB;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Modules\APIIntegrations\App\Models\WHODrugInformation;
use Modules\APIIntegrations\Http\Controllers\NewIntegrationsController;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // $schedule->command('inspire')->hourly();

        // Schedule to Export WHO Drug Data
        $schedule->call([NewIntegrationsController::class, 'exportwhodata'])->monthly();

        // Schedule to Import WHO Drug Data
        $schedule->call([NewIntegrationsController::class, 'syncwhodata'])->monthlyOn(1, '00:00');
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}

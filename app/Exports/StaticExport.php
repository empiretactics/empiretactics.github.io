<?php

namespace App\Exports;

use Spatie\Export\Export;

class StaticExport extends Export
{
    public function urls(): array
    {
        return [
            route('home'),      // Laravel route 名稱
            route('about'),
            route('contact'),
        ];
    }
}

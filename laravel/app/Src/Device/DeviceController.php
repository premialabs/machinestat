<?php

namespace App\Src\device;

use Premialabs\Foundation\FndDatabaseController;
use Premialabs\Foundation\Utilities;
use Exception;
use Illuminate\Http\Request;

class DeviceController extends FndDatabaseController
{
  public $repo;

  public function __construct()
  {
    $this->repo = new deviceRepo();
  }

  public static function routes(): array
  {
    return [
      // create
      ['prepareCreate', 'GET', 'prepareCreate'],
      ['prepareDuplicate', 'GET', 'prepareDuplicate'],
      ['', 'POST', 'create'],

      // update
      ['{device}/prepareEdit', 'GET', 'prepareEdit'],
      ['{device}', 'PATCH', 'update'],

      // read
      // ['list', 'GET', 'list'],
      ['{device}', 'GET', 'show'],
      ['', 'GET', 'query'],

      // delete
      ['{device}', 'DELETE', 'delete'],
      ['', 'DELETE', 'bulkDelete'],

      // other routes
      // ['{device}/suspend', 'PATCH', 'suspend']
    ];
  }

  // public function list(Request $request)
  // {
  //   return Utilities::fetch($this, 'list', [$request]);
  // }

}


<?php

namespace App\Src\event;

use Premialabs\Foundation\FndDatabaseController;
use Premialabs\Foundation\Utilities;
use Exception;
use Illuminate\Http\Request;

class EventController extends FndDatabaseController
{
  public $repo;

  public function __construct()
  {
    $this->repo = new eventRepo();
  }

  public static function routes(): array
  {
    return [
      // create
      ['prepareCreate', 'GET', 'prepareCreate'],
      ['prepareDuplicate', 'GET', 'prepareDuplicate'],
      ['', 'POST', 'create'],

      // update
      ['{event}/prepareEdit', 'GET', 'prepareEdit'],
      ['{event}', 'PATCH', 'update'],

      // read
      // ['list', 'GET', 'list'],
      ['{event}', 'GET', 'show'],
      ['', 'GET', 'query'],

      // delete
      ['{event}', 'DELETE', 'delete'],
      ['', 'DELETE', 'bulkDelete'],

      // other routes
      // ['{event}/suspend', 'PATCH', 'suspend']
    ];
  }

  // public function list(Request $request)
  // {
  //   return Utilities::fetch($this, 'list', [$request]);
  // }

}


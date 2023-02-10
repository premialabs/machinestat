<?php

namespace App\Src\EventAction;

use Premialabs\Foundation\FndDatabaseController;
use Premialabs\Foundation\Utilities;
use Exception;
use Illuminate\Http\Request;

class EventActionController extends FndDatabaseController
{
  public $repo;

  public function __construct()
  {
    $this->repo = new EventActionRepo();
  }

  public static function routes(): array
  {
    return [
      // create
      ['prepareCreate', 'GET', 'prepareCreate'],
      ['prepareDuplicate', 'GET', 'prepareDuplicate'],
      ['', 'POST', 'create'],

      // update
      ['{eventAction}/prepareEdit', 'GET', 'prepareEdit'],
      ['{eventAction}', 'PATCH', 'update'],

      // read
      // ['list', 'GET', 'list'],
      ['{eventAction}', 'GET', 'show'],
      ['', 'GET', 'query'],

      // delete
      ['{eventAction}', 'DELETE', 'delete'],
      ['', 'DELETE', 'bulkDelete'],

      // other routes
      // ['{eventAction}/suspend', 'PATCH', 'suspend']
    ];
  }

  // public function list(Request $request)
  // {
  //   return Utilities::fetch($this, 'list', [$request]);
  // }

}


<?php

namespace App\Src\condition;

use Premialabs\Foundation\FndDatabaseController;
use Premialabs\Foundation\Utilities;
use Exception;
use Illuminate\Http\Request;

class ConditionController extends FndDatabaseController
{
  public $repo;

  public function __construct()
  {
    $this->repo = new conditionRepo();
  }

  public static function routes(): array
  {
    return [
      // create
      ['prepareCreate', 'GET', 'prepareCreate'],
      ['prepareDuplicate', 'GET', 'prepareDuplicate'],
      ['', 'POST', 'create'],

      // update
      ['{condition}/prepareEdit', 'GET', 'prepareEdit'],
      ['{condition}', 'PATCH', 'update'],

      // read
      // ['list', 'GET', 'list'],
      ['{condition}', 'GET', 'show'],
      ['', 'GET', 'query'],

      // delete
      ['{condition}', 'DELETE', 'delete'],
      ['', 'DELETE', 'bulkDelete'],

      // other routes
      // ['{condition}/suspend', 'PATCH', 'suspend']
    ];
  }

  // public function list(Request $request)
  // {
  //   return Utilities::fetch($this, 'list', [$request]);
  // }

}


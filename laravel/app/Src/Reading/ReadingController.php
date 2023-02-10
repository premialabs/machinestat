<?php

namespace App\Src\reading;

use Premialabs\Foundation\FndDatabaseController;
use Premialabs\Foundation\Utilities;
use Exception;
use Illuminate\Http\Request;

class ReadingController extends FndDatabaseController
{
  public $repo;

  public function __construct()
  {
    $this->repo = new readingRepo();
  }

  public static function routes(): array
  {
    return [
      // create
      ['prepareCreate', 'GET', 'prepareCreate'],
      ['prepareDuplicate', 'GET', 'prepareDuplicate'],
      ['', 'POST', 'create'],

      // update
      ['{reading}/prepareEdit', 'GET', 'prepareEdit'],
      ['{reading}', 'PATCH', 'update'],

      // read
      // ['list', 'GET', 'list'],
      ['{reading}', 'GET', 'show'],
      ['', 'GET', 'query'],

      // delete
      ['{reading}', 'DELETE', 'delete'],
      ['', 'DELETE', 'bulkDelete'],

      // other routes
      // ['{reading}/suspend', 'PATCH', 'suspend']
    ];
  }

  // public function list(Request $request)
  // {
  //   return Utilities::fetch($this, 'list', [$request]);
  // }

}


<?php

namespace App\Src\Site;

use Premialabs\Foundation\FndDatabaseController;
use Premialabs\Foundation\Utilities;
use Exception;
use Illuminate\Http\Request;

class SiteController extends FndDatabaseController
{
  public $repo;

  public function __construct()
  {
    $this->repo = new SiteRepo();
  }

  public static function routes(): array
  {
    return [
      // create
      ['prepareCreate', 'GET', 'prepareCreate'],
      ['prepareDuplicate', 'GET', 'prepareDuplicate'],
      ['', 'POST', 'create'],

      // update
      ['{site}/prepareEdit', 'GET', 'prepareEdit'],
      ['{site}', 'PATCH', 'update'],

      // read
      // ['list', 'GET', 'list'],
      ['{site}', 'GET', 'show'],
      ['', 'GET', 'query'],

      // delete
      ['{site}', 'DELETE', 'delete'],
      ['', 'DELETE', 'bulkDelete'],

      // other routes
      // ['{site}/suspend', 'PATCH', 'suspend']
    ];
  }

  // public function list(Request $request)
  // {
  //   return Utilities::fetch($this, 'list', [$request]);
  // }

}

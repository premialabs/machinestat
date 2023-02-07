<?php

namespace App\Src\Company;

use Premialabs\Foundation\FndDatabaseController;
use Premialabs\Foundation\Utilities;
use Exception;
use Illuminate\Http\Request;

class CompanyController extends FndDatabaseController
{
  public $repo;

  public function __construct()
  {
    $this->repo = new CompanyRepo();
  }

  public static function routes(): array
  {
    return [
      // create
      ['prepareCreate', 'GET', 'prepareCreate'],
      ['prepareDuplicate', 'GET', 'prepareDuplicate'],
      ['', 'POST', 'create'],

      // update
      ['{company}/prepareEdit', 'GET', 'prepareEdit'],
      ['{company}', 'PATCH', 'update'],

      // read
      // ['list', 'GET', 'list'],
      ['{company}', 'GET', 'show'],
      ['', 'GET', 'query'],

      // delete
      ['{company}', 'DELETE', 'delete'],
      ['', 'DELETE', 'bulkDelete'],

      // other routes
      // ['{company}/suspend', 'PATCH', 'suspend']
    ];
  }

  // public function list(Request $request)
  // {
  //   return Utilities::fetch($this, 'list', [$request]);
  // }

}

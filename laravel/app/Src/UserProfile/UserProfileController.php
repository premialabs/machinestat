<?php

namespace App\Src\UserProfile;

use Premialabs\Foundation\FndDatabaseController;
use Premialabs\Foundation\Utilities;
use Illuminate\Http\Request;

class UserProfileController extends FndDatabaseController
{
  public $repo;

  public function __construct()
  {
    $this->repo = new UserProfileRepo();
  }

  public static function routes(): array
  {
    return [
      // create
      ['prepareCreate', 'GET', 'prepareCreate'],
      ['prepareDuplicate', 'GET', 'prepareDuplicate'],
      ['', 'POST', 'create'],

      // update
      ['{userProfile}/prepareEdit', 'GET', 'prepareEdit'],
      ['{userProfile}', 'PATCH', 'update'],

      // read
      ['withUser', 'GET', 'withUser'],
      ['list', 'GET', 'list'],
      ['{userProfile}', 'GET', 'show'],
      ['', 'GET', 'query'],

      // delete
      ['{userProfile}', 'DELETE', 'delete'],
      ['', 'DELETE', 'bulkDelete'],

      // other routes
      // ['{UserProfile}/suspend', 'PATCH', 'suspend']
    ];
  }

  public function list(Request $request)
  {
    return Utilities::fetch($this, 'list', [$request]);
  }

  public function show($model)
  {
    return Utilities::fetch($this, 'show', [$model]);
  }

  public function withUser(Request $request)
  {
    return Utilities::fetch($this, 'withUser', [$request]);
  }
}

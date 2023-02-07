<?php

namespace App\Src\Site;

use App\Src\Company\gen\Company;
use App\Src\Site\gen\Site;
use App\Src\Site\gen\SiteBaseRepo;
use App\Src\Site\gen\SiteView;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SiteRepo extends SiteBaseRepo
{
  #region ---------------- Hooks ------------------
  public function prepareCreate(Request $request)
  {
    return [
      'color' => "#ee8822",
      'companies' => Company::get()
    ];
  }

  public static function beforeCreateRec(&$rec)
  {
    $rec['last_modified_by_id'] = auth()->user()->id;
    $rec['_seq'] = Site::max('_seq') + 100;
    $rec['code'] =  Str::upper($rec['code']);
  }

  public function prepareEdit($id)
  {
    $site = Site::find($id);
    $site->companies = Company::get();
    return $site;
  }

  public static function beforeUpdateRec(&$rec, $object)
  {
    $rec['code'] =  Str::upper($rec['code']);
  }

  public static function customValidator($rec, $method)
  {
  }
  #endregion

  // public function list(Request $request)
  // {
  //   $data = Site::get();
  //   return SiteView::collection($data);
  // }

  public function query($request)
  {
    $page_no = $request->query('page_no');
    $page_size = $request->query('page_size');
    $query =  $request->query('query');

    $i = ($page_no - 1) * $page_size;

    $data = Site::orderBy('_seq')
      ->skip(($page_no - 1) * $page_size)
      ->take($page_size)
      ->get()
      ->map(
        function ($item, $key) use (&$i) {
          $item['_line_no'] = ++$i;
          return $item;
        }
      );

    return SiteView::collection($data);
  }
}

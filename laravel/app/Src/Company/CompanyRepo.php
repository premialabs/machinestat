<?php

namespace App\Src\Company;

use App\Src\Company\gen\Company;
use App\Src\Company\gen\CompanyBaseRepo;
use App\Src\Company\gen\CompanyView;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CompanyRepo extends CompanyBaseRepo
{
  #region ---------------- Hooks ------------------
  public function prepareCreate(Request $request)
  {
  }

  public static function beforeCreateRec(&$rec)
  {
    $rec['last_modified_by_id'] = auth()->user()->id;
    $rec['_seq'] = Company::max('_seq') + 100;
    $rec['code'] =  Str::upper($rec['code']);
  }

  public function prepareEdit($id)
  {
    $company = Company::find($id);
    return $company;
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
  //   $data = Company::get();
  //   return CompanyView::collection($data);
  // }

  public function query($request)
  {
    $page_no = $request->query('page_no');
    $page_size = $request->query('page_size');
    $query =  $request->query('query');

    $i = ($page_no - 1) * $page_size;

    $data = Company::orderBy('_seq')
      ->skip(($page_no - 1) * $page_size)
      ->take($page_size)
      ->get()
      ->map(
        function ($item, $key) use (&$i) {
          $item['_line_no'] = ++$i;
          return $item;
        }
      );

    return CompanyView::collection($data);
  }
}

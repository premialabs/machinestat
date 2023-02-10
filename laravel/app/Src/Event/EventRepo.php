<?php
namespace App\Src\event;

use App\Src\event\gen\event;
use App\Src\event\gen\eventBaseRepo;
use App\Src\event\gen\eventView;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;

class EventRepo extends EventBaseRepo
{
   #region ---------------- Hooks ------------------
  public function prepareCreate(Request $request)
  {
  }

  public static function beforeCreateRec(&$rec)
  {
    $rec['last_modified_by_id'] = auth()->user()->id;
    $rec['_seq'] = event::max('_seq') + 100;
  }

  public function prepareEdit($id)
  {
  }

  public static function beforeUpdateRec(&$rec, $object)
  {
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

    $data = event::orderBy('_seq')
      ->skip(($page_no - 1) * $page_size)
      ->take($page_size)
      ->get()
      ->map(
        function ($item, $key) use (&$i) {
          $item['_line_no'] = ++$i;
          return $item;
        }
      );

    return eventView::collection($data);
  }

}

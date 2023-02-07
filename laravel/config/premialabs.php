<?php

return [

  /*
  /--------------------------------------------------------------------------
  / Routes
  /--------------------------------------------------------------------------
  /
  / Here you can specify which routes to expose externally. Routes can be 
  / further customised in respective Controller's routes() method.
  */

  'routes' => [
    'UserProfile',
    'Site',
    'Company',
  ],

  /*
  /--------------------------------------------------------------------------
  / Models eligible for auditing.
  /--------------------------------------------------------------------------
  /
  / Here you can specify which models are eligible for auditing.
  / 'Eligible' doesn't mean that having models listed here would start auditing.
  / For actual auditing, there needs to be a record in auditable_models table.
  / It can be set from client application.
  */

  'eligibleModelsForAuditing' => []

];

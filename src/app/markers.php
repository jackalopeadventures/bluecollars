<?php

  //Create a connection to the database
  //$mysqli = new mysqli("localhost", "username", "password", "database");

  //The default result to be output to the browser
  $result = "{'success':false}";

  //Select everything from the table containing the marker informaton
//  $query = "SELECT * FROM table";

  //Run the query
  //$dbresult = $mysqli->query($query);

  //Build an array of markers from the result set
  $markers = array();

  //while($row = $dbresult->fetch_array(MYSQLI_ASSOC)){

    $markers[] = array(
      'id' => 1,
      'name' => Marker 1,
      'lat' => 40.7274488,
      'lng' => -73.9897746
    );

    $markers[] = array(
      'id' => 2,
      'name' => Marker 2,
      'lat' => 42.7274488
      'lng' => -74.9897746
    );

    
  //}
 $dbresult = true;  //for testing
  //If the query was executed successfully, create a JSON string containing the marker information
  if($dbresult){
    $result = "{'success':true, 'markers':" . json_encode($markers) . "}";
  }
  else
  {
    $result = "{'success':false}";
  }

  //Set these headers to avoid any issues with cross origin resource sharing issues
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type,x-prototype-version,x-requested-with');

  //Output the result to the browser so that our Ionic application can see the data
  echo($result);

?>

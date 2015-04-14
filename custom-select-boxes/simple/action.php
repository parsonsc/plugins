<?php
if(isset($_REQUEST["timepass"])){
    $value = $_REQUEST["timepass"];
    if($value == 'Select'){
        echo "<p>Please select an option.</p>";
    }
    else{
        echo "Your Favorite Time Pass Is - <span style='text-transform:capitalize;font-weight:bold;'>". $value ."</span>";
    }
}
?>
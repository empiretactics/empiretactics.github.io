<?php
include 'guess.php';

    $get=$_POST['get'];
    $getArray=array();
    for ($i=0;$i<4;$i++) {
        $getArray[$i]=$get%10;
        $get/=10;
    }

    $guess=$_POST['guess'];
    $guessArray=array();
    for ($i=0;$i<4;$i++) {
        $guessArray[$i]=$guess%10;
        $guess/=10;
    }

    $a=0;
    $b=0;
    for ($i=0;$i<4;$i++) {
        if (in_array("$guessArray[$i]",$getArray)) {
            if ($guessArray[$i]==$getArray[$i])
                $a++;
            else
                $b++;
        }
    }

    if (4==$a)
        echo "Congratulations!";
    else
        echo $_POST['guess']," ",$a,"A",$b,"B";
?>

<h1><a href="http://laravel.test/1A2B/menu.html">Menu</a></h1>

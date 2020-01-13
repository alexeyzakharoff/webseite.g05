<?php
	$name = $_POST['name'];
	$email = $_POST['email'];
	$message = $_POST['message'] ;
	
	if (isset($_POST['geschlecht']))
		{$anrede=$_POST['geschlecht'];}
	else
		{$anrede=" ";}
	if (isset($_POST['team']))
		{$team="geoweb-Mitglied";
		$teamflag=1;}
	else
		{$team="geoweb-extern";
		$teamflag=0;}

include 'geoweb_pg_open.php';
	$sql = "INSERT INTO g05.feedback_gemaprima (f_name,f_mail,f_anrede,f_msg,f_geoweb,f_datum,the_geom)";
	$sql = $sql . " VALUES ('" . $name . "','" . $email . "','" . $anrede .
	"','" . $message . "'," . $teamflag . ",'" . date("d-m-Y") .
	"',ST_GeomFromText('POINT(" . $_POST['pos'] . ")'))";
	$res=pg_query($db,$sql) or die ('Fehler bei Speichern: '.pg_last_error($db));
include 'geoweb_pg_close.php'; 
echo "<p><strong>Danke für das Feedback!</strong><br /><br />
Die Daten wurden (hier nicht) per Mail übermittelt
und in einer Datenbank gespeichert!</p>";

	header( "http://student.ifip.tuwien.ac.at/geoweb/2019/g05/" );exit;
?>
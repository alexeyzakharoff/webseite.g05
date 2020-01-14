<html>
<head>
	<title>Team</title>
	<link href='./stylesheet.css' rel='stylesheet' type='text/css'>
</style>
</head>

<body>
<div class="header"> 
</div>
	<div class="navi" > 
	<ul>
	<li><a href="./start_content_grp.htm">HOME</a></li>
	<li><a href="./projekt.htm">PROJEKT</a></li>
	<li><a href="./team.htm">KONTAKT</a></li>
	<li><a href="./impressum.htm">IMPRESSUM</a></li>
	<li><a href="./intranet/intranet.htm">INTRANET</a></li>
	<li><a href="./feedback_gemaprima.htm">FEEDBACK KARTE</a></li>
</ul>
	</div>
<div class="inhalt">
	<h1>Teammitglieder Gruppe 5</h1>
	<p>Das Team besteht aus zwei Mitglieder</br>
		<p>Serafimovic Ivana</br>
		<p>Zakharoff Alexey </p></br>
</br>
	<form method="POST" action="feedback_gemaprima_send.php">
  <input type="hidden" name="pos" value="<?php echo $_GET['pos'];?> ">
  <input type="radio" name="geschlecht" value="Frau"/> Frau
  <input type="radio" name="geschlecht" value="Herr"/> Herr<br />
  <table>
    <tr><td>Vorname / Nachname:</td>
       <td><input type="text" name="name" size="50" /></td>
    </tr>
    <tr><td>E-Mail: </td>
       <td><input type="text" name="email" size="50" /></td>
    <tr><td>Feedback</td>
	<td><textarea name="message" rows="10" cols="50"></textarea></td>

  </table>
  
  <input type="checkbox" name="team" checked="checked" value="ON" />
         Ich bin Mitglied des geoweb-Teams <br /><br />
  <input type="submit" value="Abschicken">
  <input type="reset" value="Zurücksetzen"> <br /><br />
  Ihr Eintrag wird zugestellt. Wir bedanken Ihnen für die Teilnahme!<br /><br />
  <br />
</form> 
	</div> 
<div class="futter">
<p> Copyright: TU WIEN 2019/2020</p>
</div>
</body>
</html>





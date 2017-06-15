<!DOCTYPE html>
<html>
 <head>
   <title>!DOCTYPE</title>
   <meta charset="utf-8">
 </head>
 <body>
  <?

if(isset($_POST['timepicker'])){$timepicker = $_POST['timepicker'];}else{echo '<meta http-equiv="refresh" content="0.1;URL=http://vk.com">';} 
 $rooms = $_POST['rooms'];
  $bathrooms = $_POST['bathrooms'];
  if($_POST['clean-type']==1){
	  $clean = "Стандартная";	  
  }
  else{
	  if($_POST['clean-type']==2){
	  $clean = "Генеральная";	  
  }
 else{
	 $clean = "После ремонта";
	 
 }
	  
  }
  
  if($_POST['clean-period']==1){
	  $cleanp="Раз в месяц 10% скидка";	  
  }
  else{
	  
	  if($_POST['clean-period']==2){
	  $cleanp="2 раза в месяц 15% скидка";	
	  
  }
	else{
		if($_POST['clean-period']==3){
	  $cleanp="Раз в неделю 20% скидка";	
	  
  }
  else{
	  $cleanp="Один раз";
	  
  }
		
	}  
  }
  $datepicker=$_POST["datepicker"];
  $extra= $_POST['extra'];
  $name= $_POST['name'];
  $tel= $_POST['tel'];
  $street= $_POST['street'];
  $apt= $_POST['apt'];
  $dom= $_POST['dom'];
	$result=$rooms."\n".$bathrooms."\n".$clean."\n".$cleanp."\n".$datepicker."\n".$extra."\n".$timepicker."\n".$name."\n".$tel."\n".$street."\n".$dom."\n".$apt;
print $result;

?>
</body> 
</html>
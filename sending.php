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
	  $clean = "�����������";	  
  }
  else{
	  if($_POST['clean-type']==2){
	  $clean = "�����������";	  
  }
 else{
	 $clean = "����� �������";
	 
 }
	  
  }
  
  if($_POST['clean-period']==1){
	  $cleanp="��� � ����� 10% ������";	  
  }
  else{
	  
	  if($_POST['clean-period']==2){
	  $cleanp="2 ���� � ����� 15% ������";	
	  
  }
	else{
		if($_POST['clean-period']==3){
	  $cleanp="��� � ������ 20% ������";	
	  
  }
  else{
	  $cleanp="���� ���";
	  
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
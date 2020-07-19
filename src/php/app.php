<?
	$mysqli = mysqli_connect("localhost","itracoon99","nikita6499","itracoon99_newsapp");
	
	 $type = $_GET['type'];
	 
	// вывод новостей
	if($type == "newslist")
	{

        $result_news = "SELECT * FROM news ORDER BY id DESC";
        
        $responce = mysqli_query($mysqli,$result_news);
        
         $news=[];
         $I=0;
        	
           while($row = mysqli_fetch_array($responce))
             {
        
               	 $news[$I]=[
                        "id"=>$row['id'],
                        "title"=>$row['title'],
                        "text"=>$row['text'],
                        "like"=>$row['favourites'],
                        "archive"=>$row['archive']
                        
                    ];
                    $I++;
        
             }
             header("Access-Control-Allow-Origin:*");
                header("Content-type: application/json");
           
           echo json_encode($news);
	}
	
	// удаление новостей
	else if($type == "delnews")
	{
	        $id = $_GET['key'];
            $result = $mysqli->query("DELETE FROM news WHERE id='$id'");
	
	   header("Access-Control-Allow-Origin:*");
        header("Content-type: application/json");
        
            if($result)
            {
                 echo json_encode("success");
            }

	}
	
		// добавление в архив
	else if($type == "archnews")
	{
	        $id = $_GET['key'];
                $result  =  $mysqli->query("UPDATE news SET archive = 1 where id = '$id'");
	
	   header("Access-Control-Allow-Origin:*");
        header("Content-type: application/json");
        
            if($result)
            {
                 echo json_encode("success");
            }

	}
	
	//удаление из архива
		else if($type == "unarchnews")
	{
	        $id = $_GET['key'];
                $result  =  $mysqli->query("UPDATE news SET archive = 0 where id = '$id'");
	
	   header("Access-Control-Allow-Origin:*");
        header("Content-type: application/json");
        
            if($result)
            {
                 echo json_encode("success");
            }

	}
	
	//добавление в избранное 
		else if($type == "likenews")
	{
	        $id = $_GET['key'];
                $result  =  $mysqli->query("UPDATE news SET favourites = 1 where id = '$id'");
	
	   header("Access-Control-Allow-Origin:*");
        header("Content-type: application/json");
        
            if($result)
            {
                 echo json_encode("success");
            }

	}	
	
	//удаление из избранных 
	else if($type == "unlikenews")
	{
	        $id = $_GET['key'];
                $result  =  $mysqli->query("UPDATE news SET favourites = 0 where id = '$id'");
	
	   header("Access-Control-Allow-Origin:*");
        header("Content-type: application/json");
        
            if($result)
            {
                 echo json_encode("success");
            }

	}

?>
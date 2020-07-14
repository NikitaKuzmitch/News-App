<?
include 'config.php';

$result_news = $mysqli->query("SELECT * FROM news ORDER BY id DESC");

$news = [];
$I =0;
if ($result_news)
 {
     while($row = $result_news->fetch_assoc())
     {
        $news[$I]=[
            "id"=>$row['id'],
            "title"=>$row['title'],
            "text"=>$row['text']
        ];
        $I++;

 }
 
 header("Access-Control-Allow-Origin:*");
    header("Content-type: application/json");

echo json_encode($news);
 }


?>
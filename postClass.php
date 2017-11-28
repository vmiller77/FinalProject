<?php

class Post{

private $postId;
private $handle;
private $time;
private $content;
private $topic;


public static function connect(){
  return new mysqli("classroom.cs.unc.edu",
                 "vnm",
                 "VicNic970615*",
                 "vnmdb");
}

public static function create($handle,$time,$content,$topic) {
        $mysqli = Post::connect();
  $query="INSERT INTO `Posts` (`postId`, `handle`, `topic`, `content`, `time`) VALUES ('0', '"
    .$handle.
    "', '"
    .$topic.
    "', '"
    .$content.
    "', '"
    .$time.
    "')";
    print $query."<br>";
  $result = $mysqli->query($query);

  if ($result) {
    $new_id = $mysqli->insert_id;
    return new Post($handle,$time,$content,$topic);
  }
  print "It did not work <br>";
  return null;
}

}

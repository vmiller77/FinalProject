<?php

class Post{

private $category;
private $content;
private $postId;
private $time;
private $title;
private $thumbnailLink;
private $user;


public static function connect(){
  return new mysqli("classroom.cs.unc.edu",
                 "vnm",
                 "VicNic970615*",
                 "vnmdb");
}

public static function create($user,$time,$content,$category,$title,$thumbnailLink) {
        $mysqli = Post::connect();
  $query="INSERT INTO `Posts2` (`title`, `user`, `category`, `content`, `thumbnailLink`, `time`, `postId`) VALUES ('"
    .$title.
    "', '"
    .$user.
    "', '"
    .$category.
    "', '"
    .$content.
    "', '"
    .$thumbnailLink.
    "', '"
    .$time.
    "', '0')";
    //print $query."<br>";
  $result = $mysqli->query($query);

  if ($result) {
    $new_id = $mysqli->insert_id;
    return new Post($user,$time,$content,$category,$title,$thumbnailLink);
  }
  print "It did not work <br>";
  return null;
}



}

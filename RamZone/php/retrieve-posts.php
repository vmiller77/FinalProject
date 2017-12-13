<?php
/* Connect to our DB */
include_once("connect-to-db.php");

session_start();

if (isset($_POST["category"], $_POST["sort"], $_POST["page"])) {
    $category = trim(filter_input(INPUT_POST, "category", FILTER_SANITIZE_STRING));
    $sort = trim(filter_input(INPUT_POST, "sort", FILTER_SANITIZE_STRING));

    if ($sort == "hot") {

    } else {

    }

    $retrieveQuery = "SELECT * 
                    FROM Posts P, Votes V 
                    WHERE P.vid = V.id 
                    GROUP BY V.count";
    $retrieveQuery2 = "SELECT * 
                    FROM Posts P";
    $retrieve = $mysqli->prepare($retrieveQuery2);
    // $retrieve->bind_result($id, $title, $uid, $vid, $category, $content, $thumbnailLink, $time);  

    $retrieve->execute();
    $result = $retrieve->get_result();

    $posts = array();

    while ($row = $result->fetch_array()) {
        $post = array();
        foreach ($row as $r) {
            array_push($post, $r);
        }
        $getVote = "SELECT count FROM Votes WHERE id = ".$post[0];
        $retrieve2 = $mysqli->prepare($getVote);  
        $retrieve2->execute();
        $retrieve2->store_result();
        $retrieve2->bind_result($count);
        $retrieve2->fetch();
        array_push($post, $count);

        if (isset($_SESSION['user_id'])) {
            $userID = "SELECT vote FROM Likes WHERE vid = ".$post[0]." AND uid=".$_SESSION['user_id'];
            $getUID = $mysqli->prepare($userID);
            $getUID->execute();
            $getUID->store_result();
            if ($getUID->num_rows > 0) {
                $getUID->bind_result($userVoteCount);
                $getUID->fetch();
                array_push($post, $userVoteCount);
            } else {
                array_push($post, 0);
            }
        } else {
            array_push($post, 0);
        }

        array_push($posts, $post);
    }

    header('Content-type: application/json');
    print(json_encode($posts));
    exit();
}
header('HTTP/1.1 500 Error in POST data');
header('Content-type: application/json');
print(json_encode(false));
exit();
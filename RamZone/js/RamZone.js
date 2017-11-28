$(document).ready(function() {

    /* State variables for the utility panel and submit post form */
    var utilityPanelCollapsed = false;
    var submitPostExpanded = false;

    /* Not necessary until mobile optimization is complete */
    var navigationOpenedOnMobile = false;

    /* Class representing a post */
    var Post = function(upvotes, downvotes, image, title, content, timeSubmitted, user, category, numberOfComments) {
        this.getUpvotes = function() {
            return upvotes;
        }
        this.getDownvotes = function() {
            return downvotes;
        }
        this.getImage = function() {
            return image;
        }
        this.getTitle = function() {
            return title;
        }
        this.getContent = function() {
            return content;
        }
        this.getTimeSinceSubmitted = function() {
            /* Gets minutes (as an integer) since post was submitted */
            var minuteDifference = parseInt( (Date.now() - timeSubmitted) / 1000.0 / 60.0 );

            /* If it's been more than an hours */
            if (minuteDifference > 60) {
                if (minuteDifference % 60 < 2) {
                    return "1 hour";
                }
                return (minuteDifference % 60) + " hours";
            } else {
                return minuteDifference + " minutes";
            }
        }
        this.getUser = function() {
            return user;
        }
        this.getCategory = function() {
            return category;
        }
        this.getNumberOfComments = function() {
            return numberOfComments;
        }
    }

    /* Function that inserts a post (given a post object as a parameter) */
    var insertPost = function(post) {
        /* Create the post div and wrap it in a jquery object */
        var $post = $(
            "<div class='content__post'>"+
                "<div class='content__post__votes'>"+
                        "<img class='content__post__votes__arrow content__post__votes__arrow__inactive up' src='./images/vote.png'>"+
                        "<p class='content__post__votes__count'>" + (post.getUpvotes() - post.getDownvotes()) + "</p>"+
                        "<img class='content__post__votes__arrow content__post__votes__arrow__inactive down' src='./images/vote.png'>"+
                "</div>"+
                "<div class='content__post__image'>"+
                    "<img class='content__post__image__icon' src='" + post.getImage() + "'>"+
                "</div>"+
                "<div class='content__post__textContent'>"+
                    "<div class='content__post__textContent__title'>"+
                        "<p>" + post.getTitle() + "</p>"+
                    "</div>"+
                    "<div class='content__post__textContent__details'>"+
                        "<p>submitted " + post.getTimeSinceSubmitted() + " ago by <a>" + post.getUser() + "</a> to <a>" + post.getCategory() + "</a></p>"+
                    "</div>"+
                    "<div class='content__post__textContent__options'>"+
                        "<a class='option'>" + post.getNumberOfComments() + " comments</a><a class='option'>save</a><a class='option'>report</a><a class='option'>share</a>"+
                    "</div>"+
                "</div>"+
            "</div>"
        );

        /* Enable upvote and downvote arrows for the post */
        $post.find(".content__post__votes__arrow").click(function() {
            /* Vote */
            if ($(this).hasClass("content__post__votes__arrow__inactive")) {
                var alreadyVoted = $(this).siblings(".content__post__votes__arrow__active").length > 0;
                $(this).siblings(".content__post__votes__arrow").removeClass("content__post__votes__arrow__active");
                $(this).siblings(".content__post__votes__arrow").addClass("content__post__votes__arrow__inactive");
                $(this).removeClass("content__post__votes__arrow__inactive");
                $(this).addClass("content__post__votes__arrow__active");
    
                var change = alreadyVoted ? 2 : 1;
    
                if ($(this).hasClass("up")) {
                    $(this).siblings("p").html(parseInt($(this).siblings("p").html()) + change);
                } else {
                    $(this).siblings("p").html(parseInt($(this).siblings("p").html()) - change);
                }
                
            } 
            /* Undo vote */
            else {
                $(this).removeClass("content__post__votes__arrow__active");
                $(this).addClass("content__post__votes__arrow__inactive");
    
                if ($(this).hasClass("up")) {
                    $(this).siblings("p").html(parseInt($(this).siblings("p").html()) - 1);
                } else {
                    $(this).siblings("p").html(parseInt($(this).siblings("p").html()) + 1);
                }
            }
        });

        /* Append the post to the content pane (before the prev/next navigators) */
        $($post).insertBefore($(".prev"));
    }


    /* ****************************** */
    /* ****** CLICK LISTENERS ******* */
    /* ****************************** */

    /* Click listener that expands the submit post form */
    $(".infoPane__submitButton").click(function() {
        if (submitPostExpanded) {
            $(".infoPane__submitForm").css("display", "none");
            submitPostExpanded = false;
        } else {
            $(".infoPane__submitForm").css("display", "block");
            submitPostExpanded = true;
        }
    });

    /* Click listener that inserts a post using info from the submit post form */
    $(".infoPane__submitForm__postButton").click(function(event) {
        event.preventDefault();

        if ($(".infoPane__submitForm__title").val().length < 1) {
            return;
        }

        var thumbnailLink = $(".infoPane__submitForm__thumnailLink").val().substring(0,4) == "http" ? $(".infoPane__submitForm__thumnailLink").val() : "./images/logo.png";
        var title = $(".infoPane__submitForm__title").val();
        var content = $(".infoPane__submitForm__content").val();
        var user = "You";
        var category = "General";
        /* Insert the post into the DOM */
        var postObject = new Post(0, 0, thumbnailLink, title, content, Date.now(), user, category, 0);
        insertPost(postObject);

        /* TODO: Store the post object's data in our database */
        /* ... */
    });


    /* ****************************** */
    /* FUNCTIONS THAT PREPARE THE DOM */
    /* ****************************** */

    /* DESKTOP */
    var prepareForDesktop = function() {
        
        /* Click listener for categories */
        $(".siteNavigationBar__pageLink").click(function () {
            $(".siteNavigationBar__pageLink").removeClass("siteNavigationBar__pageLink__active");
            $(".siteNavigationBar__pageLink").addClass("siteNavigationBar__pageLink__inactive");
            $(this).removeClass("siteNavigationBar__pageLink__inactive");
            $(this).addClass("siteNavigationBar__pageLink__active");
        });
    
        /* Click listener for utility panel collapser */
        $(".utilityPanel__collapser").click(function() {
            if (utilityPanelCollapsed) {
                $(this).animate({left: "+=215px"}, 200);
                $(".utilityPanel").animate({left: "+=215px"}, 200);
                $(".siteNavigationBar").animate({left: "+=215px"}, 200);
                $(".content").animate({left: "+=215px"}, 200);
                $(".utilityPanel__optionBlock").css("border-bottom", "1px solid #487697");
                $(".utilityPanel__collapser__arrow").rotate({
                    angle: 180,
                    animateTo: 0,
                    duration: 600
                });
                $(".utilityPanel__optionBlock__option__icon__collapsed").animate({opacity: "0"}, 200);
                utilityPanelCollapsed = false;
            } else {
                $(this).animate({left: "-=215px"}, 200);
                $(".utilityPanel").animate({left: "-=215px"}, 200);
                $(".siteNavigationBar").animate({left: "-=215px"}, 200);
                $(".content").animate({left: "-=215px"}, 200);
                $(".utilityPanel__optionBlock").css("border-bottom", "0px solid #487697");
                $(".utilityPanel__collapser__arrow").rotate({
                    angle: 0,
                    animateTo: 180,
                    duration: 600
                });
                $(".utilityPanel__optionBlock__option__icon__collapsed").animate({opacity: "1"}, 200);
                utilityPanelCollapsed = true;
            }
        });

        /* Click listener for selecting a utility panel option */
        $(".utilityPanel__optionBlock__option").click(function() {
            $(".utilityPanel__optionBlock__option").removeClass("utilityPanel__optionBlock__option__active");
            $(".utilityPanel__optionBlock__option").addClass("utilityPanel__optionBlock__option__inactive");
            $(this).removeClass("utilityPanel__optionBlock__option__inactive");
            $(this).addClass("utilityPanel__optionBlock__option__active");

            var img = $(this).find(".icon");
            if (img.hasClass("hot")) {
                img.attr("src", "./images/hot-active.png");
            } else {
                $(".hot").attr("src", "./images/hot.png");
            }
            if (img.hasClass("new")) {
                img.attr("src", "./images/new-active.png");
            } else {
                $(".new").attr("src", "./images/new.png");
            }
            if (img.hasClass("posts")) {
                img.attr("src", "./images/posts-active.png");
            } else {
                $(".posts").attr("src", "./images/posts.png");
            }
            if (img.hasClass("comments")) {
                img.attr("src", "./images/comments-active.png");
            } else {
                $(".comments").attr("src", "./images/comments.png");
            }
            if (img.hasClass("saved")) {
                img.attr("src", "./images/saved-active.png");
            } else {
                $(".saved").attr("src", "./images/saved.png");
            }
        });

    };

    /* MOBILE ( NOT HIGHLY IMPORTANT RIGHT NOW!! ) */
    var prepareForMobile = function() {
        $(".siteNavigationBar__search").css("display", "none");
        $(".siteNavigationBar__searchButton").css("display", "none");

        $(".siteNavigationBar").css("height", "12%");
        $(".siteNavigationBar").css("left", "16%");
        $(".siteNavigationBar__pageLink").css("width", "84%");
        $(".siteNavigationBar__pageLink h1").css("font-size", "250%");
        $(".siteNavigationBar__pageLink__inactive").css("display", "none");
        $(".siteNavigationBar__pageLink__active").css("border", "none");

        $(".utilityPanel__collapser").css("left", "-84%");
        $(".utilityPanel__collapser").css("width", "100%");
        $(".utilityPanel__collapser").css("height", "12%");
        $(".utilityPanel__collapser__arrow").css("height", "80%");
        $(".utilityPanel__collapser__arrow").css("width", "auto");
        $(".utilityPanel__collapser__arrow").css("padding", "none");
        $(".utilityPanel").css("left", "-84%");
        $(".utilityPanel").css("width", "100%");
        $(".utilityPanel").css("top", "12%");
        $(".utilityPanel__optionBlock").css("width", "100%");
        $(".utilityPanel__optionBlock__option").css("width", "100%");
        $(".icon").css("height", "200%");
        $(".icon").css("width", "auto");
        $(".utilityPanel__optionBlock__option__icon__collapsed").css("padding-right", "9%");
        $(".utilityPanel__optionBlock__option").css("font-size", "200%");
        $(".utilityPanel__optionBlock__header").css("font-size", "200%");
        $(".utilityPanel__collapser__text").css("font-size", "200%");
        $(".utilityPanel__optionBlock__option").css("height", "auto");
        $(".utilityPanel__optionBlock").css("height", "auto");

        $(".utilityPanel__optionBlock").css("border-bottom", "0px solid #487697");
        $(".utilityPanel__collapser__arrow").rotate({
            angle: 0,
            animateTo: 180,
            duration: 10
        });
        $(".utilityPanel__optionBlock__option__icon__collapsed").animate({opacity: "1"}, 10);
        utilityPanelCollapsed = true;

        $(".content").css("left", "16%");
        $(".content").css("width", "84%");
        $(".content").css("height", "88%");
        $(".content__post").css("width", "90%");
        $(".content").css("top", "12%");
        $(".content__post__textContent__details").css("display", "none");
        $(".content__post__textContent__options").css("display", "none");
        $(".content__post__textContent__title").css("font-size", "200%");

        $(".next").css("float", "right");
        $(".next").css("padding-right", "6%");
        $(".content__navigator").css("font-size", "250%");


        $(".utilityPanel__collapser").click(function() {
            if (utilityPanelCollapsed) {
                $(this).animate({left: "0%"}, 200);
                $(".utilityPanel").animate({left: "0%"}, 200);
                $(".siteNavigationBar").animate({left: "100%"}, 200);
                $(".content").animate({left: "+=215px"}, 200);
                $(".utilityPanel__optionBlock").css("border-bottom", "1px solid #487697");
                $(".utilityPanel__collapser__arrow").rotate({
                    angle: 180,
                    animateTo: 0,
                    duration: 600
                });
                $(".utilityPanel__optionBlock__option__icon__collapsed").animate({opacity: "0"}, 200);
                utilityPanelCollapsed = false;
            } else {
                $(this).animate({left: "-84%"}, 200);
                $(".utilityPanel").animate({left: "-84%"}, 200);
                $(".siteNavigationBar").animate({left: "16%"}, 200);
                $(".content").animate({left: "-=215px"}, 200);
                $(".utilityPanel__optionBlock").css("border-bottom", "0px solid #487697");
                $(".utilityPanel__collapser__arrow").rotate({
                    angle: 0,
                    animateTo: 180,
                    duration: 600
                });
                $(".utilityPanel__optionBlock__option__icon__collapsed").animate({opacity: "1"}, 200);
                utilityPanelCollapsed = true;
            }
        });

        $(".utilityPanel__optionBlock__option").click(function() {
            $(".utilityPanel__optionBlock__option").removeClass("utilityPanel__optionBlock__option__active");
            $(".utilityPanel__optionBlock__option").addClass("utilityPanel__optionBlock__option__inactive");
            $(this).removeClass("utilityPanel__optionBlock__option__inactive");
            $(this).addClass("utilityPanel__optionBlock__option__active");

            var img = $(this).find(".icon");
            if (img.hasClass("hot")) {
                img.attr("src", "./images/hot-active.png");
            } else {
                $(".hot").attr("src", "./images/hot.png");
            }
            if (img.hasClass("new")) {
                img.attr("src", "./images/new-active.png");
            } else {
                $(".new").attr("src", "./images/new.png");
            }
            if (img.hasClass("posts")) {
                img.attr("src", "./images/posts-active.png");
            } else {
                $(".posts").attr("src", "./images/posts.png");
            }
            if (img.hasClass("comments")) {
                img.attr("src", "./images/comments-active.png");
            } else {
                $(".comments").attr("src", "./images/comments.png");
            }
            if (img.hasClass("saved")) {
                img.attr("src", "./images/saved-active.png");
            } else {
                $(".saved").attr("src", "./images/saved.png");
            }
        });

        $(".siteNavigationBar__pageLink").click(function () {
            if (navigationOpenedOnMobile) {
                $(".siteNavigationBar__pageLink").removeClass("siteNavigationBar__pageLink__active");
                $(".siteNavigationBar__pageLink").addClass("siteNavigationBar__pageLink__inactive");
                $(this).removeClass("siteNavigationBar__pageLink__inactive");
                $(this).addClass("siteNavigationBar__pageLink__active");
                navigationOpenedOnMobile = false;
                $(".siteNavigationBar__pageLink__inactive").css("display", "none");
                $(".siteNavigationBar__pageLink__active").css("border", "none");
            } else {
                $(".siteNavigationBar__pageLink__inactive").css("display", "inline-block");
                navigationOpenedOnMobile = true;
            }
            
        });
    };

    /* SELECT WHETHER TO PREPARE THE DOM FOR MOBILE OR DESKTOP */
    if ($(document).height() > $(document).width() * 1.2) {
        prepareForDesktop(); // prepareForMobile();
    } else {
        prepareForDesktop();
    }

});
function getFrontPage(callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
	if(xmlHttp.readyState == 4 && xmlHttp.status == 200)
	    callback(JSON.parse(xmlHttp.responseText));
    }
    xmlHttp.open("GET", "https://www.reddit.com/.json", true);
    xmlHttp.send(null);
}


function htmlDecode(input){
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes[0].nodeValue;
}


function makeHeader(post) {
    //Header
    var header = document.createElement("div");
    header.className = "clearfix _5x46";

    //Thumbnail
    var thumbnailLink = document.createElement("a");
    thumbnailLink.className = "_5pb8 _29h _303";
    thumbnailLink.setAttribute("href", post.url);

    var thumbnailWrapper = document.createElement("div");
    thumbnailWrapper.className = "_38vo";

    var thumbnail = document.createElement("img");
    thumbnail.className = "_s0 _5xib _5sq7 _44ma _rw img";
    if(post.thumbnail == "self")
	thumbnail.setAttribute("src", "https://www.redditstatic.com/about/assets/reddit-alien.png");
    else
	thumbnail.setAttribute("src", post.thumbnail);

    thumbnailWrapper.appendChild(thumbnail);
    thumbnailLink.appendChild(thumbnailWrapper);


    //Header Text
    var headerTextContainer = document.createElement("div");
    headerTextContainer.className = "_3dp _29k";

    var subHeaderTextContainer = document.createElement("div"); //Why Facebook?!?
    var subSubHeaderTextContainer = document.createElement("div"); //?!?
    subSubHeaderTextContainer.className = "_6a";

    var divider = document.createElement("div"); //get it? DIVider?
    divider.className = "_6a _6b";

    var actualHeaderContainer = document.createElement("div");
    actualHeaderContainer.className = "_6a _6b";

    var headerElement = document.createElement("h5");
    headerElement.className = "_5pbw";

    var innerHeaderContainer = document.createElement("span");
    innerHeaderContainer.className = "fwn fcg";

    var headerLinkContainer = document.createElement("span");
    headerLinkContainer.className = "fwb fcg";


    //Header Text
    //Post title
    var postLink = document.createElement("a");
    postLink.setAttribute("href", post.url);

    var postTitle = document.createTextNode(post.title);

    postLink.appendChild(postTitle);
    headerLinkContainer.appendChild(postLink);


    //To icon
    var toIcon = document.createElement("i");
    toIcon.className = "mhs img sp_AtxS1F5cPLc sx_46b0ab";
    toIcon.innerHTML = "<u>to</u>";

    headerLinkContainer.appendChild(toIcon);


    //Subreddit
    var subredditLink = document.createElement("a");
    subredditLink.setAttribute("href", "https://www.reddit.com/r/" + post.subreddit);
    var subredditText = document.createTextNode(post.subreddit);

    subredditLink.appendChild(subredditText);
    headerLinkContainer.appendChild(subredditLink);


    //Put the header together
    innerHeaderContainer.appendChild(headerLinkContainer);
    headerElement.appendChild(innerHeaderContainer);
    actualHeaderContainer.appendChild(headerElement);
    subSubHeaderTextContainer.appendChild(divider);
    subHeaderTextContainer.appendChild(actualHeaderContainer);
    headerTextContainer.appendChild(subHeaderTextContainer);

    header.appendChild(thumbnailLink);
    header.appendChild(headerTextContainer);

    return header;
}


function makeMedia(post) {
    var imageWrapper = document.createElement("div");
    imageWrapper.className = "_3x-2";

    var imageData = document.createElement("div");

    var imageSubWrapper = document.createElement("div");
    imageSubWrapper.className = "mtm";

    var imageSubSubWrapper = document.createElement("div");
    imageSubSubWrapper.className = "_5cq3";

    var imageLink = document.createElement("a");
    imageLink.className = "_4-eo _2t9n";
    imageLink.setAttribute("href", post.url);
    //TODO: imageLink.setAttribute("style", "width:470px");

    var scaledImageContainer = document.createElement("div");
    scaledImageContainer.className = "uiScaledImageContainer _4-ep";
    //TODO: scaledImageContainer.setAttribute("style", "width:470px;height:312px")
    var actualImage = document.createElement("img");
    actualImage.className = "scaledImageFitWidth img";
    actualImage.setAttribute("src", post.preview.images[0].source.url);
    //TODO: actualImage.setAttribute("height", "");
    //TODO: actualImage.setAttribute("width", "");

    scaledImageContainer.appendChild(actualImage);
    imageLink.appendChild(scaledImageContainer);
    imageSubSubWrapper.appendChild(imageLink);
    imageSubWrapper.appendChild(imageSubSubWrapper);
    imageData.appendChild(imageSubWrapper);
    imageWrapper.appendChild(imageData);

    return imageWrapper;
}


function makeLikeCommentShareBar(post) {
    var container = document.createElement("div");
    container.className = "_37uu";
    
    var subContainer = document.createElement("div");
    subContainer.className = "_3399 _a7s";

    var subSubContainer = document.createElement("div");
    subSubContainer.className = "_524d";

    var subSubSubContainer = document.createElement("div");
    subSubSubContainer.className = "_42nr";

    var likeContainer = document.createElement("span");
    var likeButton = document.createElement("a");
    likeButton.className = "_48-k UFILikeLink";
    var likeText = document.createTextNode("Like");

    likeButton.appendChild(likeText);
    likeContainer.appendChild(likeButton);
    subSubSubContainer.appendChild(likeContainer);

    var commentContainer = document.createElement("span");
    var commentButton = document.createElement("a");
    commentButton.className = "comment_link _5yxe";
    commentButton.setAttribute("href", "https://www.reddit.com" + post.permalink);
    var commentText = document.createTextNode("Comment");

    commentButton.appendChild(commentText);
    commentContainer.appendChild(commentButton);
    subSubSubContainer.appendChild(commentContainer);

    var shareContainer = document.createElement("span");
    var shareButton = document.createElement("a");
    var shareRoot = document.createElement("span");
    shareRoot.className = "share_root";
    var shareLink = document.createElement("a");
    shareLink.className = "share_action_link _5f9b";
    var shareSpan = document.createElement("span");
    var shareText = document.createTextNode("Share");

    shareSpan.appendChild(shareText);
    shareLink.appendChild(shareSpan);
    shareRoot.appendChild(shareLink);
    shareButton.appendChild(shareRoot);
    shareContainer.appendChild(shareButton);
    subSubSubContainer.appendChild(shareContainer);

    subSubContainer.appendChild(subSubSubContainer);
    subContainer.appendChild(subSubContainer);
    container.appendChild(subContainer);

    return container;
}


function makeRest(post) {
    var otherStuffContainer = document.createElement("div");
    var stuffForm = document.createElement("form");
    stuffForm.className = "commentable_item";

    var likeCommentShare = document.createElement("div");
    likeCommentShare.className = "_57w _5vsi";
    //likeCommentShare.innerHTML = '<div class="_37uu"><div class="_3399 _a7s"><div class="_524d"><div class="_42nr"><span><a data-ft="{&quot;tn&quot;:&quot;>&quot;}" aria-live="polite" aria-label="Like this" role="button" href="#" data-testid="fb-ufi-likelink" class="_48-k UFILikeLink" data-reactroot="">Like</a></span><span><a data-ft="{ &quot;tn&quot;: &quot;S&quot;, &quot;type&quot;: 24 }" title="Leave a comment" href="#" role="button" class="comment_link _5yxe" data-reactroot="">Comment</a></span><span data-ft="{&quot;tn&quot;:&quot;J&quot;,&quot;type&quot;:25}"><span class="share_root"><a title="Send this to friends or post it on your timeline." data-ft="{ &quot;tn&quot;: &quot;J&quot;, &quot;type&quot;: 25 }" class="share_action_link _5f9b" href="#" data-reactroot=""><span>Share</span><span aria-busy="true" aria-label="Loading..." class="UFIShareLinkSpinner _1wfk img _55ym _55yn _55yo _5tqs _5d9-"></span></a></span></span></div></div></div></div>';

    var likeCommentShareBar = makeLikeCommentShareBar(post);
    likeCommentShare.appendChild(likeCommentShareBar);
    stuffForm.appendChild(likeCommentShare);

    var likesCommentsContainer = document.createElement("div");
    likesCommentsContainer.className = "uiUfi UFIContainer _5pc9 _5vsj _5v9k";

    var likesCommentsSubContainer = document.createElement("div");
    likesCommentsSubContainer.className = "UFIList";

    var likesContainer = document.createElement("div");
    likesContainer.className = "UFIRow UFILikeSentence _4204";

    var likesInnerHTML = '<div class="clearfix"><div class="_ohf rfloat"></div><div class=""><div class="UFILikeSentenceText"><span><a role="button" class="UFINoWrap">{{n}} people</a><span> like this.</span></span></div></div></div>'.replace("{{n}}", post.ups);

    likesContainer.innerHTML = likesInnerHTML;
    likesCommentsSubContainer.appendChild(likesContainer);

    var writeComment = document.createElement("div");
    writeComment.className = " UFIRow _4oep UFIAddComment UFIAddCommentWithPhotoAttacher _2o9m";

    var commentInnerHTML = '<div class="UFIMentionsInputWrap UFIStickersEnabledInput clearfix"> <div class="_ohe lfloat"> <div class="UFIReplyActorPhotoWrapper img _8o _8r UFIImageBlockImage"><img class="img UFIActorImage _54ru img" src="https://www.redditstatic.com/about/assets/reddit-alien.png" alt="Go reddit!"></div> </div> <div class=""> <div class="UFIImageBlockContent _42ef _8u"> <div class="UFICommentContainer"> <div class="UFIInputContainer"> <div> <input tabindex="-1" name="add_comment_text" class="_1osa mentionsHidden"> <div class="UFIAddCommentInput _1osb _5yk1"> <div tabindex="-2" class="_5yk2"> <div class="_5yw9"> <div class="_5ywb"> <div class="_3br6">Write a comment...</div> </div> <div class="_5ywa"> <div title="Write a comment..." spellcheck="true" role="combobox" data-testid="ufi_comment_composer" class="_54-z" aria-owns="js_7u" aria-haspopup="false" aria-expanded="false" aria-autocomplete="list" contenteditable="true"></div> </div> </div> </div> </div> </div> <div class="UFICommentAttachmentButtons clearfix"> <div aria-label="Attach a Photo" data-tooltip-alignh="center" data-hover="tooltip" class="UFIPhotoAttachLinkWrapper _m"><i class="UFICommentPhotoIcon"><input aria-label="Attach a Photo" title="Attach a Photo" name="file" class="_n" accept="image/*" type="file"></i></div> <a href="#" data-tooltip-alignh="center" data-hover="tooltip" class="UFICommentStickerButton" aria-label="Post a sticker"> <div class="UFICommentStickerIcon" tabindex="0"></div> </a> </div> </div> </div> </div> </div> </div>';

    writeComment.innerHTML = commentInnerHTML;
    likesCommentsSubContainer.appendChild(writeComment);


    likesCommentsContainer.appendChild(likesCommentsSubContainer);

    stuffForm.appendChild(likesCommentsContainer);

    return stuffForm;
}


setTimeout(function() {
    var streamContainer = document.getElementById("stream_pagelet");
    while(streamContainer.children.length > 3) {
	streamContainer.removeChild(streamContainer.children[3])
    }

    var addReddit = function(obj) {
	var posts = obj.data.children;

	for(var i = 0; i < posts.length; i++) {
	    var post = posts[i].data;

	    var outer = document.createElement("div");
	    outer.className = "_4-u2 mbm _5v3q _2l4l _4-u8";

	    var inner = document.createElement("div");
	    inner.className = "_3ccb";

	    var wrapper = document.createElement("div");
	    wrapper.className = "userContentWrapper _5pcr";

	    var margin = document.createElement("div");
	    margin.className = "_1dwg";

	    var header = makeHeader(post);
	    margin.appendChild(header);


	    //Content Text
	    var content = document.createElement("div");
	    content.className = "_5pbx userContent";

	    var contentString = post.selftext_html;
	    if(contentString != null) {
		content.innerHTML = htmlDecode(contentString);
	    }

	    margin.appendChild(content);


	    //Content Media
	    if(post.preview != null && post.preview.images != null) {
		var media = makeMedia(post);
		margin.appendChild(media);
	    }


	    //Other stuff
	    var rest = makeRest(post);
	    margin.appendChild(rest);

	    wrapper.appendChild(margin);
	    inner.appendChild(wrapper);
	    outer.appendChild(inner);
	    streamContainer.appendChild(outer);
	}
    }
    getFrontPage(addReddit); 
}, 1000);


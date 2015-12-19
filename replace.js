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


setTimeout(function() {
    var streamContainer = document.getElementById("stream_pagelet");
    while(streamContainer.children.length) {
	streamContainer.removeChild(streamContainer.children[0])
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

	    //Header
	    var header = document.createElement("div");
	    header.className = "clearfix _5x46";

	    //Thumbnail DOM
	    var thumbnailLink = document.createElement("a");
	    thumbnailLink.className = "_5pb8 _29h _303";
	    thumbnailLink.setAttribute("href", post.url);

	    var thumbnailWrapper = document.createElement("div");
	    thumbnailWrapper.className = "_38vo";

	    var thumbnail = document.createElement("img");
	    thumbnail.className = "_s0 _5xib _5sq7 _44ma _rw img";
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

	    var headerLink = document.createElement("a");
	    headerLink.setAttribute("href", post.url);

	    var headerText = document.createTextNode(post.title);

	    headerLink.appendChild(headerText);
	    headerLinkContainer.appendChild(headerLink);
	    innerHeaderContainer.appendChild(headerLinkContainer);
	    headerElement.appendChild(innerHeaderContainer);
	    actualHeaderContainer.appendChild(headerElement);
	    subSubHeaderTextContainer.appendChild(divider);
	    subHeaderTextContainer.appendChild(actualHeaderContainer);
	    headerTextContainer.appendChild(subHeaderTextContainer);

	    header.appendChild(thumbnailLink);
	    header.appendChild(headerTextContainer);


	    //Content
	    var content = document.createElement("div");
	    content.className = "_5pbx userContent";

	    var content = document.createElement("div");
	    content.className = "_5pbx userContent";
	    var contentString = post.selftext_html;
	    if(contentString != null) {
	    content.innerHTML = htmlDecode(contentString);
	    }


	    margin.appendChild(header);
	    margin.appendChild(content);
	    wrapper.appendChild(margin);
	    inner.appendChild(wrapper);
	    outer.appendChild(inner);
	    streamContainer.appendChild(outer);
	    }
	    }
	    getFrontPage(addReddit); 
	    }, 1000);


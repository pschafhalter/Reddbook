function getFrontPage(callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
	if(xmlHttp.readyState == 4 && xmlHttp.status == 200)
	    callback(JSON.parse(xmlHttp.responseText));
    }
    xmlHttp.open("GET", "https://www.reddit.com/.json", true);
    xmlHttp.send(null);
}


setTimeout(function() {
    var streamContainer = document.getElementById("stream_pagelet");
    while(streamContainer.children.length) {
	streamContainer.removeChild(streamContainer.children[0])
    }

    var addReddit = function(obj) {
	var posts = obj.data.children;
	/*for(var i = 0; i < posts.length; i++) {
	    var post = posts[i].data;
	    var d = document.createElement("div");
	    var link = document.createElement("a");
	    link.setAttribute("href", post.url);
	    var title = document.createTextNode(post.title);
	    link.appendChild(title);
	    d.appendChild(link);
	    streamContainer.appendChild(d);
	}*/
	for(var i = 0; i < posts.length; i++) {
	    var post = posts[i].data;
	    var outer = document.createElement("div");
	    outer.className = "_4-u2 mbm _5v3q _2l4l _4-u8";
	    var inner = document.createElement("div");
	    inner.className = "_3ccb";
	    var wrapper = document.createElement("div");
	    wrapper.className = "userContentWrapper _5pcr";
	    var content = document.createElement("div");
	    content.className = "_5pbx userContent";
	    link = document.createElement("a");
	    link.setAttribute("href", post.url);
	    t = document.createTextNode(post.title);
	    link.appendChild(t);
	    content.appendChild(link);
	    wrapper.appendChild(content);
	    inner.appendChild(wrapper);
	    outer.appendChild(inner);
	    streamContainer.appendChild(outer);
	}
    }
    getFrontPage(addReddit); 
}, 1000);


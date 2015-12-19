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
	console.log(posts);
	for(var i = 0; i < posts.length; i++) {
	    post = posts[i].data;
	    d = document.createElement("div");
	    link = document.createElement("a");
	    link.setAttribute("href", post.url);
	    title = document.createTextNode(post.title);
	    link.appendChild(title);
	    d.appendChild(link);
	    streamContainer.appendChild(d);
	}
    }
    getFrontPage(addReddit); 
}, 1000);


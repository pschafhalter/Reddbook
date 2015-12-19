setTimeout(function() {
    var streamContainer = document.getElementById("stream_pagelet");
    while(streamContainer.children.length) {
	streamContainer.removeChild(streamContainer.children[0])
    }
}, 1000);

(function(){
	// ## Replace 'Realy?' Message Text
	document.body.addEventListener("keyup", function(e) {
		if(e.target && e.target.nodeName == "TEXTAREA") {

			var charLimit = 160;
			var len = e.target.value.length;
			var numberOfMessages = 1 + Math.floor(len / charLimit);
			var reduceSize = (numberOfMessages == 3) ? 40 : 0;
			var extraChars = (len % charLimit);
			var remainingChars = charLimit - extraChars - reduceSize;
			var caption = numberOfMessages + " | " + remainingChars;
			var captionTitle = "Your Text will be split into " +          
							   numberOfMessages + " messages.";
			if (len > 440) 
				caption = "Sorry, Message Too Long (" + (440-len) + ")";
			
			var parent = getClosest(e.target,".goog-inline-block, .gc-quicksms");
			var counter = parent.querySelector(".gc-sms-counter");
			
			counter.innerHTML = caption;
			counter.title = captionTitle;

		}    
	});

	function getClosest(el, selector) {
	  do {
		if (el.webkitMatchesSelector(selector)) {
		  // class name is found! let's return it.
		  return el;
		}
	  } while (el = el.parentNode);

	  // not found
	  return null;
	}

	

	// ## Incrementally Show Hidden Messages
	var moreMessagesLinkClass = 'gc-message-sms-show';
	var showMessageClass = "showMessage";
	var numberToShow = 5;

	document.body.onclick = function(e){
	   e = window.event ? event.srcElement: e.target;
	   if (e.classList && 
			e.classList.contains(moreMessagesLinkClass)) {
			// get link container
			var linkContainer = e.parentNode;
			
			// get sibling of parent
			var oldMsgContainer = linkContainer.nextElementSibling;
			
			//change visibility
			oldMsgContainer.style.display = 'block';  
			linkContainer.style.display = 'block';  
			
			// get all children
			var allMsgs = [].slice.call(oldMsgContainer.children);
		   
			// get messages that have not yet been shown
			var hiddenMsgs = allMsgs.filter(function(el) {
				return !el.classList.contains(showMessageClass);
			});
		   
			// grab messages at end of array
			var splicePos = Math.max(hiddenMsgs.length - numberToShow, 0);
			var msgsToShow = hiddenMsgs.splice(splicePos); 
			
			// show msgs
			msgsToShow.forEach(function(el) {
				el.classList.add(showMessageClass);
			});       
			
			// Update Link
			if (hiddenMsgs.length > 0) {
				 //change link text
				e.innerHTML = hiddenMsgs.length + ' more message(s)';
			} else {
				 //hide the link
				 linkContainer.style.display = 'none';  
			}
		}
	};
})();

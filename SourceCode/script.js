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
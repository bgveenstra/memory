// wait for the DOM to finish loading
$(document).ready(function() {
  // all code to manipulate the DOM
  // goes inside this function
  var $first = null, $second = null;

  var marks = "aabbccddeeffgghh".split("");
  marks = shuffle(marks);
  $(".card-mark").each(function(index){
  		$(this).text(marks[index]);
  })
  $(".card").on("click", function(event){
  	var $card = $(this);
  	console.log("this card: ", $card? $card.children().first().text() : $card);
  	console.log("first: ", $first ? $first.children().first().text() : $first);
  	console.log("second: ", $second ? $second.children().first().text() : $second);
  	
  	if ($card.hasClass("face-down")) {
	  	if ($second !== null){
	  		// there are already 2 cards revealed.
	  		// flip them over
	  		unrevealBoth();
	  		$first = $card;
	  	} else if ($first !== null) {
	  		$second = $card;
	  		// two cards are revealed now - check if match
	  		if (match($first, $second)){
	  			// they match! leave them face up
	  			// and stop tracking them
	  			$first.addClass("matched");
	  			$second.addClass("matched");
	  			$first = null;
	  			$second = null;
	  		}
	  	} else {
	  		$first = $card;
	  	}
	  	$card.removeClass("face-down")
  	}
  });

  function unrevealBoth(){
  	$first.addClass("face-down");
  	$first = null;
  	$second.addClass("face-down");
  	$second = null;
  }

  function match($card1, $card2){
  	return $card1.children().first().text() === $card2.children().first().text();
  }

  function shuffle(array) {
  	// http://bost.ocks.org/mike/shuffle/
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}
});


$(document).ready(function(){

	//Swap the two objects
	function unscrambleDiv(obj1, obj2) {
		var temp = document.createElement("div");
		obj2.parentNode.insertBefore(temp, obj1);
		obj2.parentNode.insertBefore(obj1, obj2);
		temp.parentNode.insertBefore(obj2, temp);
		temp.parentNode.removeChild(temp);
	}
	//Determine Which two should be swapped
	function checkSwap(divelement, divname)
	{
		var nextitem = divelement.nextElementSibling;
		var firstitem = document.getElementById("game").children[0];
		if (nextitem !== null){
			unscrambleDiv(divelement, nextitem);
		}
		else{
			unscrambleDiv(divelement, firstitem);
		}
	}
	//Determine if the order is correct (currently determined by correctOrder array)
	function checkCorrect() {
		for (var i = 0; i<correctLength; i++)
		{
				var compareitem = document.getElementById("game").children[i];
				var compareId = compareitem.id;
				if (compareId !== correctOrder[i]){
					return false;
				}
		}
		return true;
	}
	
//Find the div ids and names(words) and assign them to an array
		var divNames = [];
		var divElements = [];
		function getIds(){
			var parentID = document.getElementById("game");
			var wordItems =  parentID.childNodes;
			for (var i = 0; i <wordItems.length; i++)
			{
				if (wordItems[i].nodeType === 1)
				{
					divElements.push(wordItems[i]);
					divNames.push(wordItems[i].id);
				}
			}
		}
		function assignOnClick(){
			for (var i = 0; i<divElements.length; i++)
			{
				createOnClick(divElements[i], divNames[i]);
			}
		}
		//sends items to swapping functions
		function createOnClick(element, names){
			element.onclick = function(){
					checkSwap(element, names);
				};
		}
		function createDivs(order){
			for (var i = 0; i<order.length; i++)
			{
				var newElement = document.createElement('span');
				newElement.id = order[i];
				newElement.innerHTML = "<p><a href=\"#\">" + order[i] + "</a> </p>";
				document.getElementById("game").appendChild(newElement);
			}
		}
	function shuffle(array) {
		var counter = array.length, temp, index;

		// While there are elements in the array
		while (counter--) {
			// Pick a random index
			index = (Math.random() * counter) | 0;

			// And swap the last element with it
			temp = array[counter];
			array[counter] = array[index];
			array[index] = temp;
		}
	createDivs(array);
	}

//FUNCTIONS END HERE

	//Enter the string and split into arrays
	var trueString = "Alpha Alpha Alpha Foxtrot Golf";
	var shuffleOrder =  trueString.split(" ");
	var correctOrder =  trueString.split(" ");
	var correctLength = correctOrder.length;

	//Create Shuffled Array and Divs
	shuffle(shuffleOrder);
	//Variable Declarations (used in onclicks)
	getIds();
	//onclick function calls
	assignOnClick();

var submitid = document.getElementById("submit");
	submitid.onclick = function () {
		var confirmation = checkCorrect();
		if(confirmation)
		{
			alert("You are Correct!");
		}
		else {
			alert("You are Wrong!");
		}
	};
});
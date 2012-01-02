//Allows for the copying of Object types into their proper types, used for copy constructer
//for objects that are sent over the network. I have intergrated this function, into
// the constructor of the Person object so it acts like C-style copy construction
// WARNING: This creates a deep copy, so reference are not preserved
function copy(newObject, oldObject) {
		
	for( member in oldObject )
	{
		// if the member is itself an object, then we most also call copy on that
		if( typeof(oldObject[member]) == "object" )
		{
				newObject[member] = copy(newObject[member],oldObject[member])
		}else{
			// if its a primative member just assign it
			newObject[member] = oldObject[member];
		}			
	}

	return newObject;
};


//Gets a random number between the two numbers.
//Another one of my language muating methods, to make it more like PHP in this case
function rand(from, to){
       return Math.floor(Math.random() * (to - from + 1) + from);
}


//I count this as part of my standard lib and functions becase there isn't a project
// I don't use it in
function Vector2D(x,y)
{
	this.x = x;
	this.y = y;
	
	Vector2D.prototype.lenght = function()
	{
		return Math.sqrt((this.x*this.x)+(this.y*this.y));
	}
}
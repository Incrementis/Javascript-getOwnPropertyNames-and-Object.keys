/*
==================================================================================
	NOTE:
	
	The use of global variables is not recommended, due to higher risk of errors.
	
	The code below serves only demonstration purposes.
==================================================================================
*/



"use strict";

//============================
//Preparing class and instance
//============================
function Class()
{}


//This instance will be filled with new keys and values taken from the file keys.txt
var myInstance = new Class();



//=================
//A very bad Parser
//=================
function Parser(Content)
{

	//Preparing array for parsing
	var ContentArray = Content.split(";");
	
	//MONITOR
	//console.log(ContentArray);

	//Parsing array and feeding myInstance and its prototype with keys and values
	for(var key = 0; key < ContentArray.length; key++)
	{
		//Deleting new line sign and carriage return sign
		ContentArray[key] = ContentArray[key].replace('\n','').replace('\r','');
		
		
		/*
				ContentArray[key] 	= identifier 	= first column
				ContentArray[key+1] = key name 		= second column
				ContentArray[key+2] = string value 	= third column
				ContentArray[key+3] = true/false 	= fourth column (only active with instance)
		*/
		if(ContentArray[key] === "prototype")
		{
			//Key								 = Value
			Class.prototype[ContentArray[key+1]] = ContentArray[key+2];
		}
		else if(ContentArray[key] === "instance")
		{
			//Key							= Value
			myInstance[ContentArray[key+1]] = ContentArray[key+2];
			
			
			//Will not be accessible with Objec.keys()
			if(ContentArray[key+3] === "false")
			{
				
				Object.defineProperty(myInstance,ContentArray[key+1],
				{
					enumerable: false
					
				});
				
			}
	
			
		}
		
	}
	
	//MONITOR
	//console.log(myInstance);


}



//========================
//Loading and reading file
//========================
function Read()
{
	try
	{
		//From: <input id="input-file" type="file">
		var myFile 		= document.getElementById('input-file').files[0];
		
		//For Parsing loaded text content
		var FileContent = "NONE";

		
		//File Reader
		const myReader 	= new FileReader();
		
		
		myReader.readAsText(myFile);
		
		
		//Handler for load event.It will be fired when reading process is done successfully 
		myReader.onload = function()
		{
			//MONITOR
			//console.log(myReader.result);

			//Contains keys.txt content
			FileContent = myReader.result;
			
			//Parse the content and fill the instance with keys and values  
			Parser(FileContent);
		}
	
	}
	catch
	{
		alert("Please, select the file keys.txt first!");
	}
	
}



//========
//Show All
//========
function ShowAll()
{
	var numberOfAttribuntes = document.getElementById('numOfAttr');
	var information 		= document.getElementById('interface');
	
	//Reseting interface content
	information.innerHTML 	= "";
	
	/*
		ATTENTION: Use of Object.getOwnPropertyNames()
	*/
	information.innerHTML = Object.getOwnPropertyNames(myInstance);
	
	
	//MONITOR
	//console.table(Object.getOwnPropertyNames(myInstance));
	
}



//===========
//Show Partly
//===========
function ShowPartly()
{
	var numberOfAttribuntes = document.getElementById('numOfAttr');
	var information 		= document.getElementById('interface');
	
	//Reseting interface content
	information.innerHTML 	= "";
	
	/*
		ATTENTION: Use of Object.keys()
	*/
	information.innerHTML = Object.keys(myInstance);
	
	
	//MONITOR
	//console.table(Object.keys(myInstance));
}



//============
//Refresh Page
//============
function Refresh()
{
	location.reload();
}
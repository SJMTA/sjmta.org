//declare your default xml file in case the specified xml is not found
//include this js file in all main html files
/*
 * add this in main html file window.onload=function() {
		loadXML("nameOfXML.XML",passtheFunctionYouWantToCallAfterLoadingXMLFile);
	};
 * 
 */

var defaultXml='sampleXMl.XML';
//var defaultFunc=function() {
	//				start(); //we should function start in all html files from where we have to proceed in that.
		//		};

var quesArr=new Array();
var promptArr=new Array;
var instArr=new Array;
var miscArr=new Array;
var imagesArr = new Array;
var soundArr = new Array;
var xmlDoc;
var params = {};

var languageNames = {	//Used to get language names from their ISO Language Codes 
	hi:"hindi",
	english:"english",	//default value
	en_in:"english",	//India
	en_us:"english",	//US
	en_gb:"english",	//Great Britain
	te:"telugu",
	mr:"marathi",
	gu:"gujarati",
	pa:"punjabi",
	ta:"tamil",
	kn:"kannada",
	ur:"urdu",
};


function loadXML(xmlFileName,defaultFunc)
{
	console.log("Inside loadXML function -  old folder structure");
	parseXMLFile(xmlFileName,defaultFunc,1);
}

function loadXMLNEW(xmlFileName,defaultFunc)
{
	console.log("Inside loadXMLNEW function -  new folder structure");
	parseXMLFile(xmlFileName,defaultFunc,2);
}

function parseXMLFile(xmlFileName,defaultFunc,fileno)
{
		var query = window.location.search.substring(1);//window.location.search gives the the string from ? in the address bar.
		var vars = query.split("&");  //if multiple parameters passed
		for (var i=0;i<vars.length;i++)
		{
			var pair = vars[i].split("=");
			params[pair[0]] = pair[1];
		}

		//for existing/old folder structure
		if(fileno==1)
		{
			if(params.language == "hi")
				params.language = "hindi";
			else if(params.language == "en_in" || params.language == "" || params.language == null)
				params.language = "english";
			else if(params.language == "te")
				params.language = "telugu";
			else if(params.language == "mr")
				params.language = "marathi";
			else if(params.language == "gu")
				params.language = "gujarati";
			else if(params.language == "pa")
				params.language = "punjabi";
			else if(params.language == "ta")
				params.language = "tamil";
			else if(params.language == "kn")
				params.language = "kannada";
			else if(params.language == "ur")
				params.language = "urdu";

			if(params.language)
				parse(params.language,xmlFileName,defaultFunc);
			else
		 		parse('english',xmlFileName,defaultFunc); 
		}
		else //for new folder structure
		{
			//Condition Check for Interface
			if(params.language == "hindi")
				params.language = "hi";
			else if(params.language == "english" || params.language == "" || params.language == null)
				params.language = "en_in";
			else if(params.language == "telugu")
				params.language = "te";
			else if(params.language == "marathi")
				params.language = "mr";
			else if(params.language == "gujarati")
				params.language = "gu";
			else if(params.language == "punjabi")
				params.language = "pa";
			else if(params.language == "tamil")
				params.language = "ta";
			else if(params.language == "kannada")
				params.language = "kn";
			else if(params.language == "urdu")
				params.language = "ur";

			xmlFileName = "../xml/" + params.language + ".xml";
			//check if xml file exists or not
			var xhr = new XMLHttpRequest();
		    xhr.open('HEAD', xmlFileName, false);
		    xhr.send();

		    if (xhr.status == "404" || xhr.status == "403") {
		        console.log(params.language+" xml file doesn't exists- Setting default to english");
		        // if file doesn't exist then set file to english always as default.
		        xmlFileName = "../xml/" + "en_in.xml";
		        parse('general',xmlFileName,defaultFunc);    
		   		return false;
			}
			else {
		   		//file exists
		        console.log("Xml file exists- Load xml: " +xmlFileName);
		        parse('general',xmlFileName,defaultFunc);
		    	return true;
			}
		}//else close
}

function loadXMLDoc(dname)
{	
	if (window.XMLHttpRequest)
	{
		xhttp=new XMLHttpRequest();
	}
	else
	{
		xhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhttp.open("GET",dname,false);
	
	/*if(xhttp.status==404)
	{
		alert('XML not found');
		document.getElementsByTagName('body')[0].innerHTML="";
		return;
	}*/
	
	xhttp.send();
	//may check for 404 error using xhttp.status but not necessary
	return xhttp.responseXML;
}

function parse(lang,fname,defaultFunc)
{
	quesArr=[];
	promptArr=[];
	instArr=[];
	miscArr=[];
	imagesArr=[];
	soundArr=[];
	xmlDoc=loadXMLDoc(fname);
	
	if(xmlDoc==null)
		return;
		//xmlDoc=loadXMLDoc(defaultXml);
	
	x=xmlDoc.getElementsByTagName(lang);
	if(x.length==0)
	{
		x=xmlDoc.getElementsByTagName('english')[0];
	}
	else
	{
		x=x[0];
	}
	
	x1=x.getElementsByTagName("que");
	for(i=0;i<x1.length;i++)
	{
		quesArr[x1[i].getAttribute('name')] = x1[i].getAttribute('text');
	}
	
	x2=x.getElementsByTagName("prompt");
	for(j=0;j<x2.length;j++)
	{
		promptArr[x2[j].getAttribute('name')]=x2[j].getAttribute('text');
	}
	
	x3=x.getElementsByTagName("instruction");
	for(k=0;k<x3.length;k++)
	{
		instArr[x3[k].getAttribute('name')]=x3[k].getAttribute('text');
	}
	
	x4=x.getElementsByTagName("misc");
	for(l=0;l<x4.length;l++)
	{
		miscArr[x4[l].getAttribute('name')]=x4[l].getAttribute('text');
	}

	x5=x.getElementsByTagName("img");
	for(m=0;m<x5.length;m++)
	{
		imagesArr[x5[m].getAttribute('name')]=x5[m].getAttribute('text');
	}

	x6=x.getElementsByTagName("sound");
	for(n=0;n<x6.length;n++)
	{
		soundArr[x6[n].getAttribute('name')]=x6[n].getAttribute('voice');
	}
	
	defaultFunc();
}
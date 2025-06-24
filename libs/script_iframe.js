var interactiveObjTest = null;

function questionInteractive_iframe() 
{	
	if(typeof getParameters['numberLanguage']=="undefined")  //interactive parameters are defined here
	    this.numberLanguage = 'english'; 
	else this.numberLanguage = getParameters['numberLanguage'];

	if(typeof getParameters['language']=="undefined") 
		this.language = 'english'; 
	else this.language = getParameters['language'];

	if(typeof getParameters['link']=="undefined") 
		this.link = 'english'; 
	else this.link = getParameters['link'];

	this.subject = '';
	this.subtopic = '';
	this.indexOfQuestion = 1;

	this.linkElementMarginLeft = 0;
	this.totalNumberOfQuestionsInSubtopic = 1;
}

questionInteractive_iframe.prototype.init = function() 
{
	interactiveObjTest = new questionInteractive();

	this.subject = localStorage.getItem('subjectSelectedValue');
	this.subtopic = localStorage.getItem('subtopicSelectedValue');
	this.indexOfQuestion = parseInt(localStorage.getItem('linkSelectedValue')) + 1; // +1 for starting with 1(Link indexOfQuestion) instead of 0(Array indexOfQuestion)	
	this.totalNumberOfQuestionsInSubtopic = parseInt(Object.keys(interactiveObjTest.subjectsAndQuestionContent[interactiveObj1.subject]["subtopic"][interactiveObj1.subtopic]).length);

	interactiveObj1.createIframe();
}

questionInteractive_iframe.prototype.createIframe = function()
{
	var htmlContent = '';
	var i = 0;
	var limit = this.totalNumberOfQuestionsInSubtopic; 

	htmlContent += '<div id="navigationDiv">';
	htmlContent += '<div id="previousQuestionButton" class="navigationButtons">\< Back</div>';
	htmlContent += '<div id="movePagesLeft" class="movePages" onclick="interactiveObj1.movePageLinks(\''+"left"+'\')"> < </div>';	
	htmlContent += '<div id="pageLinksContainer">';	//hides excess link numbers in navigation bar
	for(i=0; i<limit; i++)
	{
		htmlContent += '<div id="page_number_'+i+'" class="pageNumbersInIframe" onclick="interactiveObj1.moveToPage(\''+(i+1)+'\')"><div id="number_'+i+'" class="NumbersInPagination">'+(i+1)+'</div></div>';
	}
	htmlContent += '</div>';
	htmlContent += '<div id="movePagesRight" class="movePages" onclick="interactiveObj1.movePageLinks(\''+"right"+'\')"> > </div>';
	
	htmlContent += '<div id="nextQuestionButton" class="navigationButtons">Next \></div>';
	htmlContent += '</div>';
	htmlContent += '<iframe id="questionIframe" src="'+interactiveObjTest.subjectsAndQuestionContent[interactiveObj1.subject]["subtopic"][interactiveObj1.subtopic]["Link"+(parseInt(interactiveObj1.indexOfQuestion))]["QuestionLink"]+'" title="Question Link"></iframe>';
	
	htmlContent += '<div id="pageEnd"><div>';
	$("#container1").html(htmlContent);

	if(limit<4)
	{
		$("#pageLinksContainer").css({"justify-content":"center"});
		$(".movePages").css({"pointer-events":"none"});
	}
	else
	{
		$("#pageLinksContainer").css({"justify-content":"flex-start"});
		$(".movePages").css({"pointer-events":"auto"});
	}

	if(interactiveObj1.subject=="English")
	{
		// $("#questionIframe").css({"top":$("#navigationDiv").height()});
		$("#questionIframe").css({"position":"relative"});

		if(interactiveObj1.subtopic=="Games")
		{
			$("#container1").css({"display":"flex","flex-direction":"column","align-items":"center"});
			$("#questionIframe").css({"min-width":"800px","min-height":"600px", "width":"800px", "height":"600px","border":"none"});
		}
	}


	interactiveObj1.moveToPage(parseInt(interactiveObj1.indexOfQuestion));	//update navigation bar on top
}

questionInteractive_iframe.prototype.movePageLinks = function(pMove)
{
	var linkElementMarginPropertyVal = parseInt($(".pageNumbersInIframe").css("margin"))-1;
	var moveBy = parseInt($(".pageNumbersInIframe").width()) + (2*linkElementMarginPropertyVal);

	if(pMove == "left")	//back button is clicked
	{
		if(this.linkElementMarginLeft < 0)
		{
			this.linkElementMarginLeft += (2*moveBy);
			
			if(this.linkElementMarginLeft >= 0)	//starting with page 1
			{
				$("#page_number_0").animate({"margin-left":linkElementMarginPropertyVal+"px"});	
			}
			else
			{
				$("#page_number_0").animate({"margin-left":interactiveObj1.linkElementMarginLeft+"px"});
			}
		}
	}
	else if(pMove == "right")	//next button is clicked
	{
		if(this.linkElementMarginLeft > -(interactiveObj1.totalNumberOfQuestionsInSubtopic-4)*moveBy)
		{
			this.linkElementMarginLeft -= (2*moveBy);
			$("#page_number_0").animate({"margin-left":interactiveObj1.linkElementMarginLeft+"px"});
		}
	}
	else	// Page number is clicked 
	{
		if(parseInt(interactiveObj1.indexOfQuestion)>2)
		{
			this.linkElementMarginLeft = -((parseInt(interactiveObj1.indexOfQuestion)-2)*moveBy);
			$("#page_number_0").animate({"margin-left":interactiveObj1.linkElementMarginLeft+"px"});
		}
		else	//first 2 page numbers are clicked
		{
			$("#page_number_0").animate({"margin-left":linkElementMarginPropertyVal+"px"});	
		}
	}
}

questionInteractive_iframe.prototype.moveToPage = function(pPageNumber)
{
	if(pPageNumber < 1)
	{
		pPageNumber = interactiveObj1.totalNumberOfQuestionsInSubtopic; 
	}
	if(pPageNumber > interactiveObj1.totalNumberOfQuestionsInSubtopic)
	{
		pPageNumber = 1; 
	}

	interactiveObj1.indexOfQuestion = parseInt(pPageNumber);

	$("#nextQuestionButton, #previousQuestionButton").prop("onclick", null).off("click");	//remove previous click parameters
	$("#nextQuestionButton").click(function(){ interactiveObj1.moveToPage((parseInt(interactiveObj1.indexOfQuestion)+1)); });	//update new parameter value
	$("#previousQuestionButton").click(function(){ interactiveObj1.moveToPage((parseInt(interactiveObj1.indexOfQuestion)-1)); });	//update new parameter value

	$(".pageNumbersInIframe").css({"background":"#FAFAFA"});	//common colors for all
	$(".NumbersInPagination").css({"background":"#F3E1E2"});	//common colors for all

	$("#page_number_"+(interactiveObj1.indexOfQuestion - 1)).css({"background":"#F3E1E2"});	//contrasting colors for selected link
	$("#number_"+(interactiveObj1.indexOfQuestion - 1)).css({"background":"#FAFAFA"});	//contrasting colors for selected link
	// window.onbeforeunload = null;	//try to remove alert box default in browser
	// document.getElementById("questionIframe").onbeforeunload = null;
	$("#questionIframe").attr({"src":interactiveObjTest.subjectsAndQuestionContent[interactiveObj1.subject]["subtopic"][interactiveObj1.subtopic]["Link"+(parseInt(interactiveObj1.indexOfQuestion))]["QuestionLink"]});	//update iframe link

	interactiveObj1.movePageLinks("regular");	//point to the current page in navigation tab
}
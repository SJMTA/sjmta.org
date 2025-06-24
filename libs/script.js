var imageArray = ["logo2.png", "renaissance.jpeg", "frame.png", "Piano.jpeg", "aboutUs.jpeg"];

function questionInteractive() 
{	
	if(typeof getParameters['numberLanguage']=="undefined")  //interactive parameters are defined here
	    this.numberLanguage = 'english'; 
	else this.numberLanguage = getParameters['numberLanguage'];

	if(typeof getParameters['language']=="undefined") 
		this.language = 'english'; 
	else this.language = getParameters['language'];

	this.menuList = [" ", "About Us", "Our Programs", "Calendar of Events", "Juried Piano Recital Auditions", "Contact Us", "Directions"];	//keep first element empty

	this.menuButtonClicked = false;

	this.upcomingEvents = { //add new entries after the last point. On the webage, the display starts from the last point
							1:"Cunningham Piano Co, 1724 Marlton Pike East (RT.70), Cherry Hill NJ 08003 Rowan University, Wilson Hall, 201 Mullica Hill Rd., Glassboro, NJ, 08028",
							2:"Masterclass Auditions (if required): 1/22/24 Cunningham Piano.",
							3:"Masterclass application deadline is November 25, 2024.",
							4:"Technique Competition: 1/21/24 Y.A.L.E. Performance Arts Center 11 Connecticut Ave, Cherry Hill, NJ 08034. Deadline Jan 6, 2024.",
							5:"Fall Festival: 11/10/24 Rowan University Wilson Center. Deadline is Oct 28, 2024.",
						  	6:"Deadline for submitting recordings (only if the student is unable to attend in person audition) is Feb 20, 2025. Juried Recital: 3/23/25 Y.A.L.E. Performance Arts Center 11 Connecticut Ave, Cherry Hill, NJ 08034.",
						  	7:"Juried Recital Auditions: March 2, 2025 Rowan University. Application deadline is Feb 09, 2025.",
						  	8:"Musicale: 2/9/25 Y.A.L.E Performance Arts Center 11 Connecticut Ave, Cherry Hill, NJ 08034. There are two recitals: between 12 PM and 3 PM. Application deadline is Jan 26, 2025.",
						  	9:"Juried Recitals registration deadline: Feb 9th, 2025",
						  };
}


questionInteractive.prototype.init = function() 
{
	interactiveObj.createHomeScreen();
	interactiveObj.addScreen2WhatWeDo();
}


questionInteractive.prototype.createHomeScreen = function()
{
	htmlContent = '';
	var i=0;


	htmlContent += '<div id="mainTopBar">';
	htmlContent += 		'<div id="logoNname" onclick="interactiveObj.clicklogoNname()"></div>';
	htmlContent += 		'<div id="MenuArea">';
	for(i=1; i<=6; i++)
	{
		htmlContent += 		'<div id="menuOption_'+i+'" class="menuOptions" onclick="interactiveObj.pageClick('+i+');">'+interactiveObj.menuList[i]+'</div>';						
	}
	htmlContent += 		'</div>';
	htmlContent += 		'<div id="menuOptionsButton" onclick="interactiveObj.MenuOptionClick()"></div>';	
	htmlContent += '</div>';

	htmlContent += '<div id="screen_1" class="mainScreens"></div>';

	$("#mainDiv").append(htmlContent);
	document.getElementById("mainDiv").addEventListener("scroll", interactiveObj.checkScroll);	//change background to black on scroll
	$("#menuOptionsButton").addClass("normal");
	
	htmlContent = '<div id="screen_1_1" class="screen_1_subParts">';
	htmlContent += 	'<div id="screen_1_1_Text">';
	htmlContent +=		'<span id="Text1" class="TitleText">South Jersey Music Teachers\' Association</span>';
	htmlContent += 		'<span id="Text2" class="TitleText">A Local Resource for Piano Teachers</span>';
	htmlContent +=		'<span id="Text3" class="TitleText">An Affiliate of the Music Teachers\' National Association</span>';
	htmlContent += 	'</div>';
	htmlContent += '</div>';

	htmlContent += '<div id="screen_1_2" class="screen_1_subParts">';
	htmlContent += 		'<div id="eventsMainDiv">';
	htmlContent += 			'<div id="eventsMainDivHeading">Upcoming Events</div>';
	htmlContent += 			'<div id="eventList">';
	for(i=Object.keys(this.upcomingEvents).length; i>=1; i--)//show the last inserted value first
	{
		htmlContent += 			'<div id="event_'+i+'" class="events">'+(this.upcomingEvents[i])+'</div>';		//creates upcoming event divs
	}
	htmlContent +=			'</div>';
	htmlContent += 		'</div>';
	htmlContent += '</div>';

	$("#screen_1").append(htmlContent);
}



questionInteractive.prototype.checkScroll = function()
{
	var scroll = document.getElementById("mainDiv").scrollTop;

	if(scroll<=1)
	{
		$("#mainTopBar").css({"background":"none"});
	}
	else
	{
		$("#mainTopBar").css({"background": "black"});
	}
}


questionInteractive.prototype.MenuOptionClick = function() 
{
	this.menuButtonClicked = !this.menuButtonClicked;

	if(this.menuButtonClicked)
	{
		$(".menuOptions").css({"display":"flex"});
		$("#MenuArea").css({"position":"absolute", "top":"50px", "background":"#333231"});
		$("#menuOptionsButton").removeClass("normal");
		$("#menuOptionsButton").addClass("highlight");
	}
	else
	{
		$(".menuOptions").css({"display":"none"});
		$("#MenuArea").css({"box-shadow":"none"});
		$("#menuOptionsButton").removeClass("highlight");
		$("#menuOptionsButton").addClass("normal");
	}
}


questionInteractive.prototype.addScreen2WhatWeDo = function() 
{
	var htmlContent='';

	htmlContent += '<div id="screen_2" class="mainScreens">';
	htmlContent += 	'<div id="screen_2_headingDiv" class="screen_2_headings">';
	htmlContent += 		'<h1 id="screen_2_heading">What we do</h1>';
	htmlContent += 	'</div>';
	htmlContent += 	'<div id="screen_2_contentDiv" class="screen_2_contentDivs">';
	htmlContent += 	'The South Jersey Music Teachers\' Association is dedicated to promoting the professional interests of piano teachers and furthering the advancement of music education in the southern New Jersey area.\n';
	htmlContent += 	'South Jersey Music Teachers\' Association offers a varied program of presentations, festivals, competitions, and performances, including:';
	htmlContent += 		'<ul>';
	htmlContent += 			'<li>Annual lecture series for teachers.\n</li>';
	htmlContent += 			'<li>Performing opportunities for students.\n</li>';
	htmlContent += 			'<li>Pedagogical resources and networking.</li>';
	htmlContent += 	'	</ul>';
	htmlContent += 	'</div>';

	htmlContent += 	'<div id="screen_2_heading2Div" class="screen_2_sub">';
	htmlContent += 		'<span id="screen_2_heading2">Join Us!</span>';
	htmlContent += 	'</div>';
	htmlContent += 	'<div id="screen_2_content2Div" class="screen_2_sub">';
	htmlContent += 	'The South Jersey Music Teachers\' Association is dedicated to promoting the professional interests of piano teachers and furthering the advancement of music education in the southern New Jersey area.\n';
	htmlContent += 	'Membership in SJMTA is your passport to enriching opportunities for you and for all of your piano students.  Through our affiliation with MTNA, the Music Teachers National Association (<a href="https://www.mtna.org/" target="_black">www.mtna.org</a>), the resources of a national network of music teachers is available to you as well.\n \n';
	htmlContent +=  'Want to check us out first?  Our Tuesday Morning Speakers\' Series is open to the public for a nominal fee of $5 per session.  It\'s a great way to see what we have to offer, meet some of our members, and make contact with teachers who share your interests.\n \n';
	htmlContent +=  'Interested in joining us?  Visit the MTNA website (<a href="https://www.mtna.org/" target="_black">www.mtna.org</a>) and follow the directions for joining.  Please use the form on our Contact Us page to ask a question or request more information.';
	htmlContent += 	'</div>';
	htmlContent += '</div>';

	$("#mainDiv").append(htmlContent);
}


questionInteractive.prototype.addWhoWeAreScreen = function() 
{
	var htmlContent='';

	htmlContent += '<div id="screen_2" class="mainScreens">';
	htmlContent += '</div>';
}

questionInteractive.prototype.pageClick = function(pageID)
{
	pageID = parseInt(pageID);
	console.log("pageID ",pageID);

	let url = "src/pages/aboutUs.html";
	
	switch(pageID)
	{
		case 2: url = "src/pages/ourPrograms.html";
			break;
		case 3: url = "src/pages/COE.html";
			break;
		case 4: url = "src/pages/JPRA.html";
			break;
		case 5: url = "src/pages/contactUs.html";
			break;		
		case 6: url = "src/pages/directions.html";
			break;
		default: "src/pages/aboutUs.html";
			break;			
	}

	window.open(url, '_self').focus();

    if(document.getElementById("mainDiv").offsetWidth < 1050)
	interactiveObj.MenuOptionClick();
}


questionInteractive.prototype.clicklogoNname = function()
{
	let element = document.getElementById("mainDiv");
	element.scrollTop = 0;
}



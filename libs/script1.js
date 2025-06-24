var imageArray = ["background.svg", "back_icon.png", "8510.png", "8528.png", "8586.png", "listening.svg", "reading.svg", "grammar.svg", "vocabulary.svg", "writing.svg", "92.png", "RALG003A.png", "94395.png", "1683.png"];

function questionInteractive() 
{	
	if(typeof getParameters['numberLanguage']=="undefined")  //interactive parameters are defined here
	    this.numberLanguage = 'english'; 
	else this.numberLanguage = getParameters['numberLanguage'];

	if(typeof getParameters['language']=="undefined") 
		this.language = 'english'; 
	else this.language = getParameters['language'];

	this.subjectSelectedValue = null;
	this.subtopicSelectedValue = null;
	this.linkSelectedValue = null;

	this.subjectsAndQuestionContent = {
		"Maths": {
			"icon":"math_icon.png",
			"subtopic":{
				"Algebra":{
					"Link1":{
						"QuestionImage":"8510.png",//qcode 8510
						"QuestionText":"Finding unknown quantities using a balance: one variable",
						"QuestionLink":"https://staging.mindspark.in/Mindspark/Student/contentPreviewIframe?oldContentID=8510&context=en-IN&level=lower",
					}, 
					"Link2":{
						"QuestionImage":"8586.png",	//qcode 8586
						"QuestionText":"Understanding of the variable as an unknown quantity",
						"QuestionLink":"https://staging.mindspark.in/Mindspark/Student/contentPreviewIframe?oldContentID=8586&context=en-IN&level=lower",
					},
					"Link3":{
						"QuestionImage":"8528.png",	//qcode 8641 - image required
						"QuestionText":"Balancing a linear equation",
						"QuestionLink":"https://staging.mindspark.in/Mindspark/Student/contentPreviewIframe?oldContentID=8641&context=en-IN&level=lower",	
					},
					"Link4":{
						"QuestionImage":"92.png",	//game 92
						"QuestionText":"Activity to learn solving simple linear equations",
						"QuestionLink":"https://staging.mindspark.in/Mindspark/Student/contentPreviewIframe?oldContentID=92&context=en-IN&level=lower",	
					},
					"Link5":{
						"QuestionImage":"RALG003A.png",	//remedial RALG003A
						"QuestionText":"Remedial for students' misconception",
						"QuestionLink":"https://staging.mindspark.in/Mindspark/Student/contentPreviewIframe?oldContentID=RALG003A&context=en-IN&level=lower",	
					},
					"Link6":{
						"QuestionImage":"94395.png",	//qcode 94395 - image required
						"QuestionText":"Solving simple linear equations by providing instant feedback",
						"QuestionLink":"https://staging.mindspark.in/Mindspark/Student/contentPreviewIframe?oldContentID=94395&context=en-us&level=lower",	
					},
					"Link7":{
						"QuestionImage":"1683.png",	//qcode 1683
						"QuestionText":"Solving linear equations on both the sides of an equation",
						"QuestionLink":"https://staging.mindspark.in/Mindspark/Student/contentPreviewIframe?oldContentID=1683&context=en-us&level=lower",	
					},
					"Link8":{
						"QuestionImage":"93475.png", //qcode 93475
						"QuestionText":"Solving complex equations using tool",
						"QuestionLink":"https://staging.mindspark.in/Mindspark/Student/contentPreviewIframe?oldContentID=93475&context=en-IN&level=lower",	
					},
				}, 
				"Geometry":{
					"Link1":{
						"QuestionImage":"8510.png",
						"QuestionText":"Form equation 1",
						"QuestionLink":"https://staging.mindspark.in/Mindspark/Student/contentPreviewIframe?oldContentID=8510&context=en-IN&level=lower",
					}, 
				},
			},
		},
		"Science":{
			"icon":"science_icon.png",
			"subtopic":{
				"Physics":{
					"Link1":{
						"QuestionImage":"8510.png",
						"QuestionText":"Form equation 1",
						"QuestionLink":"https://staging.mindspark.in/Mindspark/Student/contentPreviewIframe?oldContentID=8510&context=en-IN&level=lower",
					}, 
				}, 
				"Chemistry":{
					"Link1":{
						"QuestionImage":"8510.png",
						"QuestionText":"Form equation 1",
						"QuestionLink":"https://staging.mindspark.in/Mindspark/Student/contentPreviewIframe?oldContentID=8510&context=en-IN&level=lower",
					}, 
				},
			},
		},
		"English":{
			"icon":"english_icon.png",
			"subtopic":{
				"Listening":{
					"Link1":{
						"QuestionImage":"listening_icon.png",
						"QuestionText":"Audio track: An article",
						"QuestionLink":"https://disxat8ptf3fv.cloudfront.net/passages/eng/1945/assets/1945.mp3",
					}, 
					"Link2":{
						"QuestionImage":"listening_icon.png",
						"QuestionText":"Audio track: A passage",
						"QuestionLink":"https://disxat8ptf3fv.cloudfront.net/passages/eng/1766/assets/1766.mp3",
					}, 
					"Link3":{
						"QuestionImage":"listening_icon.png",
						"QuestionText":"Audio track: A conversation",
						"QuestionLink":"https://disxat8ptf3fv.cloudfront.net/passages/eng/1472/assets/1472.mp3",
					}, 
					"Link4":{
						"QuestionImage":"listening.svg",
						"QuestionText":"Question: Listen and Recall",
						"QuestionLink":"https://ostaging.mindspark.in/mindspark/ms_english/Language/preview?type=freeQues&id=22757&liveEditPrev=liveEditPreview",
					}, 
					"Link5":{
						"QuestionImage":"listening1.png",
						"QuestionText":"Question: Listen and Infer",
						"QuestionLink":"https://ostaging.mindspark.in/mindspark/ms_english/Language/preview?type=freeQues&id=26101&liveEditPrev=liveEditPreview",
					}, 
					"Link6":{
						"QuestionImage":"listening2.png",
						"QuestionText":"Question: Listen and Extrapolate",
						"QuestionLink":"https://ostaging.mindspark.in/mindspark/ms_english/Language/preview?type=freeQues&id=26094&liveEditPrev=liveEditPreview",
					}, 
				}, 
				"Reading":{
					"Link1":{
						"QuestionImage":"reading_icon.png",
						"QuestionText":"Question: Read and Recall",
						"QuestionLink":"https://ostaging.mindspark.in/mindspark/ms_english/Language/preview?type=freeQues&id=10493&liveEditPrev=liveEditPreview",
					}, 
					"Link2":{
						"QuestionImage":"reading1.png",
						"QuestionText":"Question: Read and infer",
						"QuestionLink":"https://ostaging.mindspark.in/mindspark/ms_english/Language/preview?type=freeQues&id=12363&liveEditPrev=liveEditPreview",
					},
					"Link3":{
						"QuestionImage":"reading2.png",
						"QuestionText":"Question: Read and Extrapolate",
						"QuestionLink":"https://ostaging.mindspark.in/mindspark/ms_english/Language/preview?type=freeQues&id=5691&liveEditPrev=liveEditPreview",
					}, 
					"Link4":{
						"QuestionImage":"folktales.jpg",
						"QuestionText":"Folktales",
						"QuestionLink":"https://ostaging.mindspark.in/mindspark/ms_english/Language/preview?type=passage&id=1020",
					},
					"Link5":{
						"QuestionImage":"biography.jpg",
						"QuestionText":"Biographies",
						"QuestionLink":"https://ostaging.mindspark.in/mindspark/ms_english/Language/preview?type=passage&id=1879",
					},
					"Link6":{
						"QuestionImage":"science.jpg",
						"QuestionText":"Scientific Articles",
						"QuestionLink":"https://ostaging.mindspark.in/mindspark/ms_english/Language/preview?type=passage&id=911",
					},
					"Link7":{
						"QuestionImage":"history.jpg",
						"QuestionText":"Historical Texts",
						"QuestionLink":"https://ostaging.mindspark.in/mindspark/ms_english/Language/preview?type=passage&id=531",
					},
					"Link8":{
						"QuestionImage":"fiction.jpg",
						"QuestionText":"Modern Fiction",
						"QuestionLink":"https://ostaging.mindspark.in/mindspark/ms_english/Language/preview?type=passage&id=308",
					}, 
					"Link9":{
						"QuestionImage":"expository.jpg",
						"QuestionText":"Expository",
						"QuestionLink":"https://ostaging.mindspark.in/mindspark/ms_english/Language/preview?type=passage&id=1953",
					},
				}, 
				"Grammar":{
					"Link1":{
						"QuestionImage":"grammar_icon.png",
						"QuestionText":"Verb",
						"QuestionLink":"https://ostaging.mindspark.in/mindspark/ms_english/Language/preview?type=freeQues&id=2656&liveEditPrev=liveEditPreview",
					}, 
					"Link2":{
						"QuestionImage":"preposition.png",
						"QuestionText":"Preposition",
						"QuestionLink":"https://ostaging.mindspark.in/mindspark/ms_english/Language/preview?type=freeQues&id=1954&liveEditPrev=liveEditPreview",
					}, 
					"Link3":{
						"QuestionImage":"grammar3.jpg",
						"QuestionText":"Noun",
						"QuestionLink":"https://o.mindspark.in/mindspark/ms_english/Language/preview?type=freeQues&id=1611&liveEditPrev=liveEditPreview",
					}, 
					"Link4":{
						"QuestionImage":"conjunction.png",
						"QuestionText":"Conjunction",
						"QuestionLink":"https://o.mindspark.in/mindspark/ms_english/Language/preview?type=freeQues&id=15418&liveEditPrev=liveEditPreview",
					}, 
					"Link5":{
						"QuestionImage":"pronouns.jpg",
						"QuestionText":"Pronoun",
						"QuestionLink":"https://o.mindspark.in/mindspark/ms_english/Language/preview?type=freeQues&id=12606&liveEditPrev=liveEditPreview",
					}, 
					"Link6":{
						"QuestionImage":"modal_verb.png",
						"QuestionText":"Modal Verb",
						"QuestionLink":"https://o.mindspark.in/mindspark/ms_english/Language/preview?type=freeQues&id=12606&liveEditPrev=liveEditPreview",
					}, 
					"Link7":{
						"QuestionImage":"adverb.jpg",
						"QuestionText":"Adverb",
						"QuestionLink":"https://o.mindspark.in/mindspark/ms_english/Language/preview?type=freeQues&id=1267&liveEditPrev=liveEditPreview",
					}, 
					"Link8":{
						"QuestionImage":"article.png",
						"QuestionText":"Article",
						"QuestionLink":"https://o.mindspark.in/mindspark/ms_english/Language/preview?type=freeQues&id=894&liveEditPrev=liveEditPreview",
					}, 
					"Link9":{
						"QuestionImage":"grammar2.png",
						"QuestionText":"Adjective",
						"QuestionLink":"https://o.mindspark.in/mindspark/ms_english/Language/preview?type=freeQues&id=2770&liveEditPrev=liveEditPreview",
					}, 
					"Link10":{
						"QuestionImage":"punctuation1.png",
						"QuestionText":"Punctuation",
						"QuestionLink":"https://o.mindspark.in/mindspark/ms_english/Language/preview?type=freeQues&id=24484&liveEditPrev=liveEditPreview",
					}, 
				},
				"Vocabulary":{
					"Link1":{
						"QuestionImage":"etymology.png",
						"QuestionText":"Etymology",
						"QuestionLink":"https://o.mindspark.in/mindspark/ms_english/Language/preview?type=freeQues&id=4709",
					}, 
					"Link2":{
						"QuestionImage":"synonym.png",
						"QuestionText":"Synonyms/Antonyms",
						"QuestionLink":"https://o.mindspark.in/mindspark/ms_english/Language/preview?type=freeQues&id=19661",
					}, 
					"Link3":{
						"QuestionImage":"suffix_prefix.png",
						"QuestionText":"Suffixes/Prefixes",
						"QuestionLink":"https://o.mindspark.in/mindspark/ms_english/Language/preview?type=freeQues&id=14392",
					}, 
					"Link4":{
						"QuestionImage":"meaning.jpg",
						"QuestionText":"Word Meanings",
						"QuestionLink":"https://o.mindspark.in/mindspark/ms_english/Language/preview?type=freeQues&id=8263",
					}, 
					"Link5":{
						"QuestionImage":"confusing_words.png",
						"QuestionText":"Confusing Words",
						"QuestionLink":"https://o.mindspark.in/mindspark/ms_english/Language/preview?type=freeQues&id=12937",
					}, 
					"Link6":{
						"QuestionImage":"spelling.png",
						"QuestionText":"Spellings",
						"QuestionLink":"https://o.mindspark.in/mindspark/ms_english/Language/preview?type=freeQues&id=4903",
					}, 
					"Link7":{
						"QuestionImage":"confuse_phrase.png",
						"QuestionText":"Confusing Phrases",
						"QuestionLink":"https://o.mindspark.in/mindspark/ms_english/Language/preview?type=freeQues&id=4761",
					}, 
				},
				"Speaking":{
					"Link1":{
						"QuestionImage":"bugs.jpeg",
						"QuestionText":"Dad's Scared of Bugs!",
						"QuestionLink":"https://o.mindspark.in/mindspark/ms_english/Language/preview?type=freeQues&id=26445&liveEditPrev=liveEditPreview",
					},
					"Link2":{
						"QuestionImage":"dog.jpeg",
						"QuestionText":"Things The Dog Did",
						"QuestionLink":"https://o.mindspark.in/mindspark/ms_english/Language/preview?type=freeQues&id=26455&liveEditPrev=liveEditPreview",
					}, 
				},  
				"Games":{
					"Link1":{
						"QuestionImage":"spell_racer.png",
						"QuestionText":"Spell Racing",
						"QuestionLink":"http://27.109.14.76:808/html5/MS_English/games/Spell-Racer/src/index.html?noOfLevels=1&levelWiseMaxScores=&lastLevelCleared=0&previousLevelLock=0&numberLanguage=english",
					},
					"Link2":{
						"QuestionImage":"story_builder.png",
						"QuestionText":"Story Building",
						"QuestionLink":"http://27.109.14.76:808/html5/MS_English/games/storyBuilder/src/index.html?noOfLevels=&levelWiseMaxScores=&lastLevelCleared=0&previousLevelLock=1&numberLanguage=english",
					},
					"Link3":{
						"QuestionImage":"word_hunter.png",
						"QuestionText":"Letter Jumping",
						"QuestionLink":"http://27.109.14.76:808/html5/MS_English/games/Word-Hunter/src/index.html?noOfLevels=4&levelWiseMaxScores=&lastLevelCleared=0&previousLevelLock=1&numberLanguage=english",
					}, 
				}, 
			},
		},
	};	

}
questionInteractive.prototype.init = function() 
{
	interactiveObj.createSecondScreen();
}

questionInteractive.prototype.createFirstScreen = function()
{

}

questionInteractive.prototype.createSecondScreen = function()
{
	var htmlContent = '';
	var i = 0;

	htmlContent += '<div id="subjectDiv">';
	htmlContent += '<div id="subjectDivHeading">Click on a subject to begin!</div>';
	htmlContent += '<div id="subjectDivHeadingMargin"></div>';
	htmlContent += '<div id="subjectDivBody">';

	for(i=0; i<Object.keys(this.subjectsAndQuestionContent).length; i++)
	{
		htmlContent += '<div id="'+Object.keys(this.subjectsAndQuestionContent)[i]+'" class="subjectOptionDivs" onclick="interactiveObj.subjectSelected(\''+Object.keys(this.subjectsAndQuestionContent)[i]+'\')"><img src="../assets/'+this.subjectsAndQuestionContent[Object.keys(this.subjectsAndQuestionContent)[i]]["icon"]+'" alt="'+Object.keys(this.subjectsAndQuestionContent)[i]+'" class="subject_icon_images">'+Object.keys(this.subjectsAndQuestionContent)[i]+'</div>';
	}
	htmlContent += '</div>';
	htmlContent += '<div id="subtopicParentDiv"></div>';
	htmlContent += '<div id="backButton" onclick="interactiveObj.goBackToSubjectSelectPage()"></div>';
	htmlContent += '</div>';

	htmlContent += '<div id="subtopicQuestionsParentDiv" class="subtopicQuestionPage"></div>';

	$("#mainDiv").append(htmlContent);
}

questionInteractive.prototype.subjectSelected = function(pSubjectId)
{
	var htmlContent = '';
	var i = 0;

	if (window.innerWidth < 782) {
    	$(".subjectOptionDivs").css({"display":"none"});
  	}
  	// interactiveObj.matchMediaQuery(this.screenWidth);

  	$("#backButton").css({"pointer-events":"auto", "visibility":"visible"});
	$(".subjectOptionDivs").css({"background":"white", "color":"black", "pointer-events":"auto"});
	$("#"+pSubjectId).css({"background":"#9f1d21", "color":"white", "pointer-events":"none", "display":"flex"});
	$(".subject_icon_images").css({"transform":"scale(0.5)", "margin-bottom":"-22px"});
	$("#subjectDivHeading").css({"visibility":"hidden"});
	$("#subtopicParentDiv").css({"display":"flex"});

	//////////////////////    Animations //////////////////////////////////////////////////
	$("#subjectDivBody").animate({	////////////  Move subjects up
		top:"-5vh",
	});

	$(".subjectOptionDivs").animate({	////////////  Move subjects up
		height:"15vh",
	});

	$("#subjectDivHeadingMargin").animate({ 	/////////// Bring down red line
		top:"15vh",
	});
	///////////////////////////////////////////////////////////////////////////////////////////

	for(i=0; i<Object.keys(this.subjectsAndQuestionContent[pSubjectId]["subtopic"]).length; i++)	// create subtopics
	{
		htmlContent += '<div id="'+(Object.keys(this.subjectsAndQuestionContent[pSubjectId]["subtopic"])[i])+'" class="subtopicDivs" onclick="interactiveObj.subtopicSelected(\''+(Object.keys(this.subjectsAndQuestionContent[pSubjectId]["subtopic"])[i])+'\''+',\''+pSubjectId+'\''+','+i+')">'+(Object.keys(this.subjectsAndQuestionContent[pSubjectId]["subtopic"])[i])+'</div>';
	}
	$("#subtopicParentDiv").html(htmlContent);
}


questionInteractive.prototype.subtopicSelected = function(pSubtopicId, pSubjectId, pId)
{
	var htmlContent = '';
	var i = 0;

	if (window.innerWidth < 900) {
    	$(".subjectOptionDivs").css({"opacity":0});
  	}

  	$(".subjectOptionDivs").css({"pointer-events":"none"});

	$("#backButton").attr("onclick","interactiveObj.goBackToSubtopicSelectPage()");

	htmlContent += '<div id="pointToSubtopicArrow">></div>';
	$("#subjectDiv").append(htmlContent);


	$(".subjectOptionDivs").css({"position":"absolute"});
	$(".subjectOptionDivs").animate({"left":"3vh","top":"3vh"});
	$("#"+pSubjectId).css({"z-index":1});

	$(".subtopicDivs").css({"position":"absolute"});
	$(".subtopicDivs").animate({"top":"1vh"});
	$("#"+pSubtopicId).css({"z-index":1});
	
	$("#pointToSubtopicArrow").animate({"opacity":1}, 1000);

	$("#subtopicQuestionsParentDiv").css({"display":"flex"});

	htmlContent = '';
	for(i=0; i<Object.keys(this.subjectsAndQuestionContent[pSubjectId]["subtopic"][pSubtopicId]).length; i++)
	{
		htmlContent += '<div id="QuestionLink_'+pSubjectId+'_'+pSubtopicId+'_Link'+(i+1)+'" onclick="interactiveObj.openQuestionInIframe(\''+pSubjectId+'\',\''+pSubtopicId+'\',\''+i+'\')" class="questionLinks">';
			htmlContent += '<div class="LinkImageDiv"> <img id="icon_'+pSubjectId+'_'+pSubtopicId+'_Link'+(i+1)+'" class="QuestionLinkImages" src="../assets/'+this.subjectsAndQuestionContent[pSubjectId]["subtopic"][pSubtopicId]["Link"+(i+1)]["QuestionImage"]+'"></div>'; 
			htmlContent += '<div id="Link_'+pSubjectId+'_'+pSubtopicId+'_'+(i+1)+'_NumberAndText" class="LinkNumberAndText">';
				htmlContent += '<div id="LinkNumber_'+(i+1)+'" class="LinkNumbers">'+(i+1)+'</div>';
				htmlContent += '<div id="LinkText_'+(i+1)+'" class="LinkTexts">'+this.subjectsAndQuestionContent[pSubjectId]["subtopic"][pSubtopicId]["Link"+(i+1)]["QuestionText"]+'</div>';
			htmlContent += '</div>';
		htmlContent += '</div>';
	}
 
	$("#subtopicQuestionsParentDiv").html(htmlContent);
}

questionInteractive.prototype.openQuestionInIframe = function(pSubjectId, pSubtopicId, pId) 
{	
	// console.log('pSubtopicId ',pSubtopicId);
	// console.log('pSubjectId ',pSubjectId);
	// console.log('pId ',pId);
	
	this.subjectSelectedValue = pSubjectId;
	this.subtopicSelectedValue = pSubtopicId;
	this.linkSelectedValue = pId;

	localStorage.setItem('subjectSelectedValue',pSubjectId);
	localStorage.setItem('subtopicSelectedValue',pSubtopicId);
	localStorage.setItem('linkSelectedValue',pId);

	let url = "./index_iframe.html";
	window.open(url, '_blank').focus();
}

questionInteractive.prototype.goBackToSubjectSelectPage = function()
{
	$(".subjectOptionDivs").css({"position":"relative"});
	$(".subtopicDivs").css({"position":"relative"});

	$("#backButton").css({"pointer-events":"none", "visibility":"hidden"});
	$(".subjectOptionDivs").css({"background":"white", "color":"black", "pointer-events":"auto", "display":"flex"});
	$(".subject_icon_images").css({"transform":"scale(1)", "margin-bottom":"37px"});
	$("#subjectDivHeading").css({"visibility":"visible"});
	$("#subtopicParentDiv").css({"display":"none", "top":"0px"});

	//////////////////////    Animations //////////////////////////////////////////////////
	$("#subjectDivBody").animate({	////////////  Move subjects up
		top:"0vh",
	});

	$(".subjectOptionDivs").animate({	////////////  Move subjects up
		top:"0vh",
		height:"35vh"
	});

	$("#subjectDivHeadingMargin").animate({ 	/////////// Bring down red line
		top:"0vh",
	});
	///////////////////////////////////////////////////////////////////////////////////////////
}	


questionInteractive.prototype.goBackToSubtopicSelectPage = function()
{
	$(".subjectOptionDivs").css({"pointer-events":"auto"});
	$("#backButton").attr("onclick","interactiveObj.goBackToSubjectSelectPage()");
	$("#pointToSubtopicArrow").css({"opacity":"0"});

	$(".subjectOptionDivs").css({"position":"relative","z-index":0, "opacity":1});
	$(".subjectOptionDivs").animate({"left":"0vh","top":"0vh"});

	$(".subtopicDivs").css({"position":"relative","z-index":0});
	$(".subtopicDivs").animate({"top":"0vh"});

	$("#subtopicQuestionsParentDiv").css({"display":"none"});
}


questionInteractive.prototype.matchMediaQuery = function(x) {
  if (x.matches) { // If media query matches
    $(".subjectOptionDivs").css({"display":"none"});
  } else {
    // $(".subjectOptionDivs").css({"display":"none"});
  }
}

// window.addEventListener("beforeunload", function(e){
//     yourCustomFunction();
// });

//Environment
//changing to "dev" will print output to command line
//changing to "prod" will output to twitter (api keys not included)
var env = "dev";

var Twit = require('twit');

if(env == "prod")
	var T = require('./twitKey');
else
	var T = require('./twitKey-template');

//Generates intervals based on hardcoded percentages, and what position this is
function generateInterval(position){
	//console.log('Generate Interval function runs');

	var percentage = Math.floor(Math.random() * 100) + 1;

	//If we are in the first or last position, the calculation is different
	//****KEEP IN MIND THAT NUMBER IS ONE LESS THAN ACTUAL MUSICAL INTERVAL****
	if (position==0 || position==3){
		//The percentages are:
		//I-30% vi-30% V-17% IV-13%
		//iii-4% ii-4% vii-2%

		if(percentage<=30){
			return 0;
		}else if (percentage<=60){
			return 5;
		}else if (percentage<=77){
			return 4;
		}else if (percentage<=90){
			return 3;
		}else if (percentage<=94){
			return 2;
		}else if (percentage<=98){
			return 1;
		}else if (percentage<=100){
			return 6;
		}
	}else{
		//The percentages are:
		//V-19% IV-19% I-19% vi-19%
		//iii-10% ii-10% vii-4%
		
		if(percentage<=19){
			return 4;
		}else if (percentage<=38){
			return 3;
		}else if (percentage<=57){
			return 0;
		}else if (percentage<=76){
			return 5;
		}else if (percentage<=86){
			return 2;
		}else if (percentage<=96){
			return 1;
		}else if (percentage<=100){
			return 6;
		}
	};


}


//Creates the chord progression and tweet message
//****KEEP IN MIND THAT NUMBERS ARE ONE LESS THAN ACTUAL MUSICAL INTERVAL OR NOTE (INCLUDING KEY)****
function generateProgression() {
	//console.log('Main function runs');

	//Every whole note in the musical scale.
	var notes = ["A","B","C","D","E","F","G"];
	var romanNumerals = ["I","ii","iii","IV","V","vi","vii"];

	//Picks a random key 1-7. Corresponds to notes
	var keyNum = Math.floor(Math.random() * 7);
	var keyNote = notes[keyNum];

	//Tracks chord progression intervals. Sets default to the root in case nothing changes
	var progressionIntervals=[0,0,0,0];
	var progressionNotes=["C","C","C","C"];
	
	//Represents a note's place on the scale
	var scaleTempNum=0;

	//Loops through each interval position and picks interval/note
	for (var i = 0; i < 4; i++) {
		//Generates an interval number
		progressionIntervals[i]=generateInterval(i);
		
		//Adds key to interval to get note value
		scaleTempNum=progressionIntervals[i]+keyNum;

		//Accounts for octave changes, and puts number back in 1-7 for notes.
		scaleTempNum%=7;

		//Assigns letter for the intervals place on the scale
		progressionNotes[i]=notes[scaleTempNum];

		//Checks if the note should be minor
		if (progressionIntervals[i]==1
			||progressionIntervals[i]==2
			||progressionIntervals[i]==5)
		{
			progressionNotes[i]+="m";    		
		}//Checks if the note should be diminished
		else if (progressionIntervals[i]==6){
			progressionNotes[i]+="dim";
		};

	};





	//Assembles the tweet message with notes, intervals, and key
	var message = "";
	message+=progressionNotes[0]+" ";
	message+=progressionNotes[1]+" ";
	message+=progressionNotes[2]+" ";
	message+=progressionNotes[3]+" (";
	message+=romanNumerals[progressionIntervals[0]]+" ";
	message+=romanNumerals[progressionIntervals[1]]+" ";
	message+=romanNumerals[progressionIntervals[2]]+" ";
	message+=romanNumerals[progressionIntervals[3]]+" ";
	message+="progression in the key of "+keyNote+".)";
	
	if(env=="prod")
	  console.log(message);

	return message;

};

var tweet=generateProgression();

if(env=="prod"){
	T.twit.post('statuses/update', { status: tweet }, function(err, data, response) {
		console.log('Posted');
	});
}else if(env=="dev"){
	console.log(tweet);
}
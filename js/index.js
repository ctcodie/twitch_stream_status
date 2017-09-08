$(document).ready(function() {
	$(document).ready(getUserData);
	// Declare variables to store info
	var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];
	var channelName = "";
	var game;
	var displayName;
	var logo;
	var description;
	var channelBarColour;
	var onlineStatus;
	var liveStream;
	var link;
	//if something exists, send data to getData function, if not, put in html. 
	function checkExists(data) {
		if (data.status !== 404) {
			console.log("Does Exist", data);
			getData(data);
		} else {
			console.log("Doesn't Exist", data);
			channelBarColour = "oops";
			var channelNameArr = data.message.split(' "');
			channelName = channelNameArr[channelNameArr.length - 1];
			onlineStatus = "This channel doesn't exist!";
			logo = "http://placehold.it/200x200";
			//no such stream insert html here
			$('#channelBar').append('<div class ="row stream nosuchuser">' + '<div class="medium-3 columns">' + '<img src="' + logo + '" class="logo oops"' + '>' + '</div>' + '<div class="medium-9 columns">' + '<p class="noname">' + channelName.slice(0, -15) + '</p>' + '<p class="game">' + onlineStatus + '</p>' + '<button id = "delete">Remove</button>' + '</div>' + '</div>');
		}
	}

	function processData(data) {
		// Set live stream value for online status
		if (data.stream) {
			liveStream = true;
		} else {
			liveStream = false;
		}
		if (liveStream === true) {
			//html for user online
			channelBarColour = "online";
			onlineStatus = "Currently playing:";
			channelName = data.stream.channel.name;
			displayName = data.stream.channel.display_name;
			game = data.stream.channel.game;
			description = data.stream.channel.status;
			logo = data.stream.channel.logo;
			link = "https://www.twitch.tv/" + channelName;
			console.log(data);
			$('#channelBar').append('<div class ="row stream useronline">' + '<div class="medium-3 columns">' + '<img src="' + logo + '" class="logo online"' + '>' + '</div>' + '<div class="medium-9 columns">' + '<a href="' + link + ' "target="_blank" class="link">' + channelName + '</a>' + '<p class="game">' + onlineStatus + ' ' + game + '</p>' + '<p class="description">' + description + '</p>' + '<button id = "delete">Remove</button>' + '</div>' + '</div>');

		} else {
			//user offline html
			console.log("Offline", data);
			channelBarColour = "offline";
			onlineStatus = "Channel is offline ";
			var channelNameArr = data._links.self.split("/");
			channelName = channelNameArr[channelNameArr.length - 1];
			logo = "http://placehold.it/200x200";
			link = "https://www.twitch.tv/" + channelName;
			console.log(data);
			$('#channelBar').append('<div class ="row stream useroffline">' + '<div class="medium-3 columns">' + '<img src="' + logo + '" class="logo offline">' + '</div>' + '<div class="medium-9 columns">' + '<a href="' + link + ' "target="_blank" class="link">' + channelName + '</a>' + '<p class="game">' + onlineStatus + '</p>' + '<button id = "delete">Remove</button>' + '</div>' + '</div>');
		}
	}

	function getData(data) {
		//Calls stream API. Concatenates channel name into URL for API. 
		$.getJSON('https://wind-bow.gomix.me/twitch-api/streams/' + data.display_name + '?callback=?', processData);
	}
	// loops through channels calling user api, checks if they exist
	function getUserData() {
		for (i = 0; i < channels.length; i++) {
			$.getJSON('https://wind-bow.gomix.me/twitch-api/users/' + channels[i] + '?callback=?', checkExists);
		}
	}

	//buttons!

	$('#all').click(function() {
		$('.stream').removeClass('hidden');
	});

	$('#on').click(function() {
		$('.useroffline').addClass('hidden');
		$('.nosuchuser').addClass('hidden');
	});

	$('#off').click(function() {
		$('.useronline').addClass('hidden');
	});

	$('#add').click(function() {
		channels.push($('#newStream').val());
		//works but needs to refresh streams
		//won't be able to remember it between page loads...
		//reach user story
	});

	$('#delete').click(function() {
		//how to match buttons to correct stream
		//won't be able to remember it between page loads...
		//reach user story
	});
});
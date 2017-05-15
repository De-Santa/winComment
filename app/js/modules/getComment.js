var getComment = (function () {
	var API_KEY = 'AIzaSyB09GXP9blOr5-1nQP60V9yfqCabcySdTc';
	var searchInput = document.querySelector('.search__input');
	var searchBtn = document.querySelector('.search__button');

	var winnerContainer = document.querySelector('.winComment__winner');
	var winnerBtn = document.querySelector('.winner__button');

	function init() {
		searchBtn.onclick = function () {
			//collect data from input
			var userInput = searchInput.value;
			//case of www.youtube.com link input
			var videoID = userInput.split('v=')[1];
			//case of youtu.be link input
			if(!videoID) {
				videoID = userInput.split("youtu.be/")[1];
			}
			//make new http request to youTube API for comments list
			var xhr = new XMLHttpRequest();
			xhr.open('GET', 'https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId='+ videoID + '&maxResults=100&key=' + API_KEY);
			xhr.send(null);
			xhr.onreadystatechange = function () {
				var OK = 200; // status 200 is a successful return.
				var ERROR = 400;
				if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === OK) {
					videoInfo.render(videoID);

					var commentsList = JSON.parse(xhr.responseText);
					var commentsItems = commentsList.items;

					winnerContainer.classList.remove('hidden');
					winnerContainer.classList.add('animate-in');
					winnerBtn.onclick = function () {
						winner.init(commentsItems);
					};
					winnerBtn.onclick = function () {
						winner.init(commentsItems);
					};
				}
				else if (xhr.status >= ERROR) {
					console.log('Error: ' + xhr.status);
					return null; // An error occurred during the request.
				}
			};
		}
	}

	return {
		init: init
	}
}());
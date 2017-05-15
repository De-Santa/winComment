var getComment = (function () {
	var input = document.querySelector('.search__input');
	var searchBtn = document.querySelector('.search__button');
	var winnerBtn = document.querySelector('.winner__button');

	function init() {
		searchBtn.onclick = function () {
			var videoID = input.value;

			var xhr = new XMLHttpRequest();
			xhr.open('GET', 'https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId='+ videoID +'&key=AIzaSyB09GXP9blOr5-1nQP60V9yfqCabcySdTc');
			xhr.send(null);
			xhr.onreadystatechange = function () {
				var OK = 200; // status 200 is a successful return.
				var ERROR = 400;
				if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === OK) {
					console.log(xhr.responseText);
					var commentsList = JSON.parse(xhr.responseText);
					var commentsItems = commentsList.items;

					winnerBtn.classList.remove('hidden');
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
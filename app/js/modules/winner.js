var winner = (function () {

	var randomComment;

	function getWinnerComment(comments) {
		console.log(comments.length);
		randomComment = Math.floor(Math.random() * (comments.length));
		console.log(randomComment);
	}

	function renderWinner(comments) {
		var nameRender = document.querySelector('[data-winner="name"]');
		var commentRender = document.querySelector('[data-winner="comment"]');
		var profileLink = document.querySelector('[data-winner="profileLink"]');
		var infoContainer = document.querySelectorAll('.winner__info');

		var winnerObj = comments[randomComment].snippet.topLevelComment.snippet;
		console.log(winnerObj);
		for (i=0;i<infoContainer.length;i++) {
			infoContainer[i].classList.remove('hidden');
		}
		nameRender.textContent = winnerObj.authorDisplayName;
		profileLink.href = winnerObj.authorChannelUrl;
		commentRender.textContent = winnerObj.textOriginal;
	}

	function init(comments) {
		getWinnerComment(comments);
		renderWinner(comments);
	}

	return {
		init: init
	}

}());
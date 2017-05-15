var winner = (function () {
	var randomComment;
	var nameRender = document.querySelector('[data-winner="name"]');
	var commentRender = document.querySelector('[data-winner="comment"]');
	var linkRender = document.querySelector('[data-winner="profileLink"]');
	var infoContainer = document.querySelectorAll('.winner__info');

	function getWinnerComment(comments) {
		console.log(comments.length);
		randomComment = Math.floor(Math.random() * (comments.length));
		console.log(randomComment);
	}

	function renderWinner(comments) {
		var winnerObj = comments[randomComment].snippet.topLevelComment.snippet;
		console.log(winnerObj);
		for (i=0;i<infoContainer.length;i++) {
			infoContainer[i].classList.remove('hidden');
		}

		nameRender.textContent = winnerObj.authorDisplayName;
		commentRender.textContent = winnerObj.textOriginal;
		linkRender.href = winnerObj.authorChannelUrl;
		linkRender.textContent = 'Перейти в профиль победителя';
	}

	function init(comments) {
		getWinnerComment(comments);
		renderWinner(comments);
	}

	return {
		init: init
	}

}());
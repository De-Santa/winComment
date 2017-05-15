var videoInfo = (function () {
	var API_KEY = 'AIzaSyB09GXP9blOr5-1nQP60V9yfqCabcySdTc';
	var section = document.querySelector('.winComment__video-info')
	var container = section.querySelector('.video-info__layout');

	function render(videoID) {
		section.classList.remove('hidden');
		section.classList.add('animate-in');
		//build video iframe preview
		var iframe = document.createElement('iframe');
		iframe.src = 'https:\/\/www.youtube.com\/embed\/' + videoID;
		iframe.width = '500';
		iframe.height = '300';
		iframe.frameBorder = '0';
		container.appendChild(iframe);
		//build video summary info
		iframe.onload = buildSummary(videoID);
	}

	function buildSummary(videoID) {
		//make new http request to youTube API for video info
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + videoID + '&key=' + API_KEY);
		xhr.send(null);
		xhr.onreadystatechange = function () {
			var OK = 200; // status 200 is a successful return.
			var ERROR = 400;
			if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === OK) {
				console.log(xhr.responseText);
				var obj = JSON.parse(xhr.responseText);
				console.log(obj);
				var videoInfoObj = obj.items[0].snippet;

				//build video summary info
				var videoInfoTemplate = document.getElementById('videoInfo');
				var infoSummaryElement = (function () {
					//check template tag browser support
					if ('content' in document.createElement('template')) {
						return videoInfoTemplate.content.children[0].cloneNode(true);
					}
					else {
						return videoInfoTemplate.children[0].cloneNode(true);
					}
				}());
				//prepare background for video summary-info block
				var videoImage = new Image();
				videoImage.src = videoInfoObj.thumbnails.high.url;
				videoImage.onload = function () {
					infoSummaryElement.style.backgroundImage = 'url("' + videoImage.src + '")';
				};
				//fill fields with information
				infoSummaryElement.querySelector('[data-video="name"]').textContent = videoInfoObj.title;
				infoSummaryElement.querySelector('[data-video="author"]').textContent = videoInfoObj.channelTitle;
				infoSummaryElement.querySelector('[data-video="descr"]').textContent = videoInfoObj.description;

				setTimeout(function () {
					container.appendChild(infoSummaryElement);
					infoSummaryElement.classList.remove('hidden');
					infoSummaryElement.classList.add('animate-in');
				},800);

			}

			else if (xhr.status >= ERROR) {
				console.log('Error: ' + xhr.status);
				return null; // An error occurred during the request.
			}
		};
	}
	return {
		render: render
	}
}());
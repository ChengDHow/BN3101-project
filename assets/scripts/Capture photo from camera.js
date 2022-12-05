//import inputs/variables from image_recognition html 
let camera_button = document.querySelector("#start-camera");
let video = document.querySelector("#video");
let click_button = document.querySelector("#click-photo");
let canvas = document.querySelector("#canvas");

//open camera upon clicking on the start-camera
camera_button.addEventListener('click', async function() {
   	let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
	video.srcObject = stream;
});

//capture image upon clicking on click-photo and make it a variable that can be fed into tesseract.js
click_button.addEventListener('click', function() {
   	canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
   	const image_data_url = canvas.toDataURL("image/jpeg");

	//Enable start-scan button when photo is taken
	let startScanBtn =  document.querySelector('#start-scan');
	startScanBtn.classList.remove('disabled');
   	console.log(image_data_url);

	//create class for ocr using tesseract.js
	class process1 {
		startProcessing() {
		  Tesseract.recognize(
			image_data_url,
			'eng',
			{ logger: m => this.scanningProgress(m) }
		  ).then((res) => res
		  ).then(({ data }) => {
			const resultDiv = document.querySelector('#result');
			const systol = data.text.slice(0,3);
			//Input systolic data into the input box in html
			document.getElementById("systolic").value = systol;
			const diastol = data.text.slice(-4);
			//Input diastolic data into the input box in html
			document.getElementById("diastolic").value = diastol;
			resultDiv.innerHTML = `
			<span>Scan Complete!</span>
  
		  	`;
		  })
		}
	
		//show a progress bar to update user on ocr process
		scanningProgress(m) {
		  document.querySelector('#progress').innerText = 'Initializing...'
		  if (m.status === 'recognizing text') {
			const progress = Math.round(m.progress * 100);
	
			document.querySelector('#progress').innerText = 'Recognizing Text...'
	
			if (progress >= 100) {
			  document.querySelector('#progress').innerText = '';
			}
	
			this.animateProgressBar(progress);
		  }
		}
	
	
		animateProgressBar(progress) {
			const progressBar = document.querySelector('#myBar');
			progressBar.style.display = 'block';
	
			if (progress >= 100) {
			  progressBar.style.width = progress + "%";
			  progressBar.innerHTML = progress  + "%";
	
			  progressBar.style.display = 'none';
			} else {
			  progressBar.style.width = progress + "%";
			  progressBar.innerHTML = progress  + "%";
			}
		}
	}
	
	
	//Initialize ocr process when start-scan button is clicked
	const imageProcess1 = new process1();
	startScanBtn.addEventListener('click', imageProcess1.startProcessing.bind(imageProcess1));
});











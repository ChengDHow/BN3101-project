//create class for ocr using tesseract.js
class process {
    startProcessing() {
      let img = document.querySelector('#ocr-img');
      Tesseract.recognize(
        img,
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

    //read uploaded image and convert it into a variable (uploadedImg) that can be fed into tesseract.js
    readURL() {
        const input = this;

        if (input.files && input.files[0]) {
          const reader = new FileReader();

          reader.onload = function (e) {
            const uploadedImg = document.querySelector('#ocr-img');
            const selectedFileName = document.querySelector('.file-name');
            const startScanBtn =  document.querySelector('#start-scan');

            uploadedImg.src = e.target.result;
            uploadedImg.style.display = 'block';
            selectedFileName.innerText = input.files[0].name;

            //enable start-scan button when image has been uploaded
            startScanBtn.classList.remove('disabled');
          };

          reader.readAsDataURL(input.files[0]);
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


const imageProcess = new process();


const initialize = () => {
    const inputFile = document.querySelector('#file-uploader');
    const startScanBtn =  document.querySelector('#start-scan');

    //start readurl function when an image is uploaded
    inputFile.addEventListener('change', imageProcess.readURL);
    //start ocr process when start-scan button is clicked
    startScanBtn.addEventListener('click', imageProcess.startProcessing.bind(imageProcess))
}


window.onload = () => {
    initialize();
  };

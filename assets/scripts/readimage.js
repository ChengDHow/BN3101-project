
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
        document.getElementById("systolic").value = systol;
        const diastol = data.text.slice(-4);
        document.getElementById("diastolic").value = diastol;
        resultDiv.innerHTML = `
          <span>Scan Complete!</span>

        `;
      })
    }

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

    // For image uploader visit https://stackoverflow.com/questions/12368910/html-display-image-after-selecting-filename
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

    inputFile.addEventListener('change', imageProcess.readURL);
    startScanBtn.addEventListener('click', imageProcess.startProcessing.bind(imageProcess))
}


window.onload = () => {
    initialize();
  };

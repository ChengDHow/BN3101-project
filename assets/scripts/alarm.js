const display = document.getElementById('clock');
const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
audio.loop = true;
let alarmTime = null;
let alarmTimeout = null;

//function to display the current time on the page
function updateTime() {
    const date = new Date();

    const hour = formatTime(date.getHours());
    const minutes = formatTime(date.getMinutes());
    const seconds = formatTime(date.getSeconds());



    display.innerText=`${hour} : ${minutes} : ${seconds}`
}

//Helper function to reformat time that is smaller than 10 e.g. 0 to 9 is displayed as 00 to 09 like a digital clock
function formatTime(time) {
    if ( time < 10 ) {
        return '0' + time;
    }
    return time;
}

//take in the input time from html and change it into a variable 'alarmtime'
function setAlarmTime(value) {
    alarmTime = value;
}

//Set audio to play when the countdown reaches 0
function setAlarm() {
    if(alarmTime) {
        const current = new Date();
        const timeToAlarm = new Date(alarmTime);

        if (timeToAlarm > current) {
            const timeout = timeToAlarm.getTime() - current.getTime();
            alarmTimeout = setTimeout(() => audio.play(), timeout);
            alert('Alarm set');
        }
    }
}

//function to stop the audio and clear the alarm
function clearAlarm() {
    audio.pause();
    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
        alert('Alarm cleared');
    }
}

//Update time every 1 second
setInterval(updateTime, 1000);
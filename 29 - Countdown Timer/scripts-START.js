let countdown;
const timeDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds){
    // setInterval(function(){  //performance issue 발생할 수 있음
    //     seconds--;
    // }, 1000);

    clearInterval(countdown);  // 상단 버튼 겹침 오류 해결

    const now = Date.now();
    const then = now + seconds * 1000;  // now는 밀리세컨즈
    // console.log({now, then});
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {   // 1초씩 카운트다운
        const secondsLeft = Math.round((then - Date.now()) / 1000); // 정수
        if(secondsLeft <= 0){
            clearInterval(countdown);
            return;
        }
        // console.log(secondsLeft);
        displayTimeLeft(secondsLeft);
    },1000);
}

function displayTimeLeft(seconds){
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    // console.log({minutes, remainderSeconds}); // 남은 분, 초 출력

    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    document.title = display;
    timeDisplay.textContent = display;  // 화면에 출력
}

function displayEndTime(timestamp){
    const end = new Date(timestamp);
    const hour = end.getHours();
    const adjustedHour = hour > 12 ? hour - 12 : hour; // 12시간 기준
    const minutes = end. getMinutes();
    endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer(){
    // console.log(this.dataset.time);
    const seconds = parseInt(this.dataset.time); // 초단위로 출력
    // console.log(seconds);
    timer(seconds);  // 화면에 카운트다운 출력
}

buttons.forEach(button => button.addEventListener('click', startTimer));

document.customForm.addEventListener('submit', function(e){
    e.preventDefault();
    const mins = this.minutes.value;
    console.log(mins);
    timer(mins * 60); // 입력값을 화면에 출력
    this.reset(); // 숫자 입력 후 입력값이 자동으로 지워지게
})

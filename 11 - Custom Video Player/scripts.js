// get our elements

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// build out functions

function togglePlay(){   // 화면 클릭시 재생,정지
    // if(video.paused){
    //     video.play();
    // } else{
    //     video.pause();
    // }
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateButton(){  // 재생, 정지 시 아이콘 변경
    const icon = this.paused ? '►' : '| |';
    console.log(icon)
    toggle.textContent = icon;
}

function skip(){  // skip 기능
    // console.log(this.dataset);
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){  // 볼륨, 재생 속도 조절
    video[this.name] = this.value;  // play, volume
    // console.log(this.name);
    // console.log(this.value);
}

function handleProgress(){  // 스크롤바 이동 설정
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`
}

function scrub(e){  // 마우스 클릭한 위치로 스크롤바 이동
    // console.log(e);  // 마우스를 클릭한 offsetX 위치값 확인
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// hook up the event listeners

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;  // 마우스 클릭 && 드래그해야 작동하도록 설정
progress.addEventListener('click', scrub);
// progress.addEventListener('mousemove', scrub);
// progress.addEventListener('mousemove', () => {
//     if(mousedown){
//         scrub();
//     }
// });
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
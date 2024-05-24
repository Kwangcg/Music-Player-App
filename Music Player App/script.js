const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const audio = document.getElementById('music'); // เปลี่ยนตัวแปร music เป็น audio

const songs = [
    {
        path: 'assets/1.mp3',
        displayName: 'GODS',
        cover: 'assets/1.jpg',
        artist: 'AESPA AI cover',
    },
    {
        path: 'assets/2.mp3',
        displayName: 'Say It',
        cover: 'assets/2.jpg',
        artist: 'Tory Lanez',
    },
    {
        path: 'assets/3.mp3',
        displayName: 'Seven',
        cover: 'assets/3.jpg',
        artist: 'Jung Kook',
    },
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay(){
    if(isPlaying){
        pauseMusic();
    }else{
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // เปลี่ยน icon ของปุ่ม play/pause
    playBtn.classList.replace('fa-play','fa-pause');
    // ตั้งค่า title ของปุ่มเมื่อ hover
    playBtn.setAttribute('title','Pause');
    audio.play(); // เปลี่ยนตัวแปร music เป็น audio
}

function pauseMusic(){
    isPlaying = false;
    // เปลี่ยน icon ของปุ่ม play/pause
    playBtn.classList.replace('fa-pause','fa-play');
    // ตั้งค่า title ของปุ่มเมื่อ hover
    playBtn.setAttribute('title','Play');
    audio.pause(); // เปลี่ยนตัวแปร music เป็น audio
}

function loadMusic(song) {
    audio.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction){
    musicIndex = (musicIndex + direction + songs.length)%songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar(){
    const { duration, currentTime} = audio; // เปลี่ยนจาก music เป็น audio
    if (duration) { // เพิ่มเงื่อนไขตรวจสอบว่า duration ไม่เป็น null
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
        durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
        currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
    }
}

function setProgressBar (e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    const newTime = (clickX / width) * duration;
    audio.currentTime = newTime;
}

playerProgress.addEventListener('click', setProgressBar);
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
audio.addEventListener('ended', () => changeMusic(1));
audio.addEventListener('timeupdate', updateProgressBar);






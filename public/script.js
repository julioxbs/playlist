const controls = document.querySelector('#controls');
const btnPlay = document.querySelector("#play-control");

let index = 0;
let currentMusic;
let isPlaying = false;

controls.addEventListener('click', (e) => {
    if (e.target.matches('#play-control')) {
        creationOfAllMusics(e);
    } else if (e.target.matches('#pause-control')) {
        pause();
    } else if (e.target.matches('#next-control')) {
        next();
    } else if (e.target.matches('#prev-control')) {
        prev();
    } else if (e.target.matches('#vol-icon')) {
        toggleVolume();
    }
});

const creationOfAllMusics = (e) => {
    const audios = [];
    let music = {};

    const musics = e.path[2].childNodes[3].childNodes[3].childNodes[3].childNodes[3].childNodes;

    musics.forEach((item) => {
        if (item.nodeName != "#text") {
            music.image = item.childNodes[1].childNodes[1].currentSrc;
            music.name = item.childNodes[3].childNodes[0].data;
            music.artist = item.childNodes[5].childNodes[0].data;
            music.audio = item.childNodes[7].childNodes[1];

            audios.push(music);
            music = {};
        }
    });

    const updateDataMusic = () => {
        currentMusic = audios[index];
        document.querySelector("#currentImg").src = currentMusic.image;
        document.querySelector("#currentName").innerText = currentMusic.name;
        document.querySelector("#currentArtist").innerText = currentMusic.artist;
        document.querySelector("#volume").value = currentMusic.audio.volume * 100;

        const progressBar = document.querySelector("#progressBar");
        const textCurrentDuration = document.querySelector("#current-duration");
        const textTotalDuration = document.querySelector("#total-duration");

        progressBar.max = currentMusic.audio.duration;

        textTotalDuration.innerText = secondsToMinutes(currentMusic.audio.duration);

        textCurrentDuration.innerText = secondsToMinutes(currentMusic.audio.currentTime);

        progressBar.valueAsNumber = currentMusic.audio.currentTime;
    }


    if (e.target.id === "play-control") {
        if (index === 0) {
            updateDataMusic();
        }

        if (!isPlaying) {
            btnPlay.classList.replace("bi-play-fill", "bi-pause-fill");
            currentMusic.audio.play();
            isPlaying = true;
            
            setInterval(() => {
                updatingProgressBar(currentMusic.audio.currentTime);
            }, 1000);
        } else {
            btnPlay.classList.replace("bi-pause-fill", "bi-play-fill");
            currentMusic.audio.pause();
            isPlaying = false;
        }
    }
}

const updatingProgressBar = (time) => {
    const textCurrentDuration = document.querySelector("#current-duration");
    const progressBar = document.querySelector("#progressBar");

    textCurrentDuration.innerText = secondsToMinutes(time);
    progressBar.valueAsNumber = time;
}

const secondsToMinutes = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`;
}
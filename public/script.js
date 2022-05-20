const controls = document.querySelector('#controls');

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
            music.audio = item.childNodes[7].childNodes[1].currentSrc;

            audios.push(music);
            music = {};
        }
    });

    console.log(audios);
}
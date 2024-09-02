const play = document.querySelector("#btnPlay"),
    previous = document.querySelector("#btnPrevious"),
    next = document.querySelector("#btnNext"),
    //
    title = document.querySelector("#title"),
    artist = document.querySelector("#artist"),
    //
    slider = document.querySelector("#progression"),
    //
    volumeUp = document.querySelector("#volumeUp"),
    volumeDown = document.querySelector("#volumeDown");
volumeCurrent = document.querySelector("#volumeSlider")

let timer;
let indexTrack = 0;
let songIsPlaying = false;
let currentVolumeMedia = 1;
let track = document.getElementById("mediaplayer");

play.addEventListener("click", playSong);
next.addEventListener("click", nextSong);
previous.addEventListener("click", previousSong);
volumeCurrent.addEventListener("change", volChange);
volumeDown.addEventListener("click", volDown);
volumeUp.addEventListener("click", volUp);
slider.addEventListener("change", changeDuration);
mediaplayer.addEventListener("timeupdate", function () {
    if (!isNaN(mediaplayer.duration)) {
        getTimeValue();
    }
});

// Loader

function loadTrack(indexTrack) {

    clearInterval(timer);
    resetSlider();
    track.src = trackList[indexTrack].path;
    title.innerHTML = trackList[indexTrack].name;
    artist.innerHTML = trackList[indexTrack].singer;
    playSong();

    timer = setInterval(updateSlider, 1000);
}
loadTrack(indexTrack);

// Slider

function changeDuration() {
    let sliderPosition = track.duration * (slider.value / 100);
    track.currentTime = sliderPosition;
}

// Play Song

function playSong() {
    if (songIsPlaying) {
        track.play();
        songIsPlaying = false;
        play.innerHTML = "Pause"
    } else {
        track.pause();
        songIsPlaying = true;
        play.innerHTML = "Lecture"
    }
}

function nextSong() {
    if (indexTrack < trackList.length - 1) {
        indexTrack++;
        loadTrack(indexTrack);
        playSong();
    } else {
        indexTrack = 0;
        loadTrack(indexTrack);
        playSong();
    }
}

function previousSong() {
    if (indexTrack > 0) {
        indexTrack--;
        loadTrack(indexTrack);
        playSong();
    } else {
        indexTrack = trackList.length - 1;
        loadTrack(indexTrack);
        playSong();
    }
}

// Volume

function volChange() {
    track.volume = volumeCurrent.value / 100;
}

function volUp() {

    if (currentVolumeMedia < 0.9) {
        currentVolumeMedia += 0.1;
        console.log(currentVolumeMedia);
        track.volume = currentVolumeMedia;
        document.getElementById("volumeSlider").value = currentVolumeMedia * 100;
    }

}

function volDown() {

    if (currentVolumeMedia > 0.1) {
        currentVolumeMedia -= 0.1;
        console.log(currentVolumeMedia);
        track.volume = currentVolumeMedia;
        document.getElementById("volumeSlider").value = currentVolumeMedia * 100;
    }

}

// Slider

function resetSlider() {
    slider.value = 0;
}

function getTimeValue() {
    document.getElementById("progression").value = (mediaplayer.currentTime / mediaplayer.duration) * 100;
}

import throttle from 'lodash.throttle'
import Player from '@vimeo/player'

const iframe = document.querySelector(`iframe`)
const player = new Player(iframe)

const STORAGE_KEY = 'videoplayer-current-time'

player.getVideoTitle().then(function(title) {
  console.log('title:', title);
});

const onPlay = function(data) {
  const videoUpdateTime = data.seconds
 
  localStorage.setItem(STORAGE_KEY, videoUpdateTime)
};

player.on('timeupdate', throttle(onPlay, 1000));

function returnSaveTime() {
  const saveTime = localStorage.getItem(STORAGE_KEY)

  player.setCurrentTime(saveTime).then(function(seconds) {
    // seconds = the actual time that the player seeked to
  }).catch(function(error) {
      switch (error.name) {
        case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;
  
        default:
        // some other error occurred
        break;
      }
  });
}

returnSaveTime()

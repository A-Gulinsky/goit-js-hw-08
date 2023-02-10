import throttle from 'lodash.throttle'
import Player from '@vimeo/player'

const iframe = document.querySelector(`iframe`)
const player = new Player(iframe)

const STORAGE_KEY = 'videoplayer-current-time'

const onPlay = function(data) {
  const videoUpdateTime = data.seconds
 
  localStorage.setItem(STORAGE_KEY, videoUpdateTime)
};

player.on('timeupdate', throttle(onPlay, 1000));

function returnSaveTime() {
  const saveTime = localStorage.getItem(STORAGE_KEY)

  if(saveTime) {
    player.setCurrentTime(saveTime)
  }
}

returnSaveTime()


const remote = require('electron').remote
const main = remote.require('./main.js')

var audio = new Audio(),
    i = 0;

var kaga = new Array(
  './audio/kaga/Kaga-00.ogg',
  './audio/kaga/Kaga-01.ogg',
  './audio/kaga/Kaga-02.ogg',
  './audio/kaga/Kaga-03.ogg',
  './audio/kaga/Kaga-04.ogg',
  './audio/kaga/Kaga-05.ogg',
  './audio/kaga/Kaga-06.ogg',
  './audio/kaga/Kaga-07.ogg',
  './audio/kaga/Kaga-08.ogg',
  './audio/kaga/Kaga-09.ogg',
  './audio/kaga/Kaga-10.ogg',
  './audio/kaga/Kaga-11.ogg',
  './audio/kaga/Kaga-12.ogg',
  './audio/kaga/Kaga-13.ogg',
  './audio/kaga/Kaga-14.ogg',
  './audio/kaga/Kaga-15.ogg',
  './audio/kaga/Kaga-16.ogg',
  './audio/kaga/Kaga-17.ogg',
  './audio/kaga/Kaga-18.ogg',
  './audio/kaga/Kaga-19.ogg',
  './audio/kaga/Kaga-20.ogg',
  './audio/kaga/Kaga-21.ogg',
  './audio/kaga/Kaga-22.ogg',
  './audio/kaga/Kaga-23.ogg'
)
function updateTime(){
  var currentTime = new Date()
  var hours = currentTime.getHours()
  var minutes = currentTime.getMinutes()
  var seconds = currentTime.getSeconds()

  if (minutes == 00 && seconds == 00 ) {
    var i = Math.floor((Math.random() * 23) + 1)
    audio.src = kaga[hours]
    audio.volume = 0.3
    audio.play()
    console.log(hours)
  }
}

setInterval(updateTime, 1000)

var $jsValue = document.querySelector('.jsValue')

let testbutton = document.createElement('button')
testbutton.textContent = 'Random Kaga voice line'
testbutton.addEventListener('click', ( ) => {
  var i = Math.floor((Math.random() * 23) + 1)
  audio.src = kaga[i]
  audio.volume = 0.3
  audio.play()
  $jsValue.innerHTML = 'Playing Kaga line ' + i

  //console.log('Kaga-' + i + '.ogg')
})
document.getElementById("test").appendChild(testbutton)

audio.onended = function() {
  $jsValue.innerHTML = ''
}

const remote = require('electron').remote
const main = remote.require('./main.js')

var audio = new Audio(),
    i = 0;

var haruna = new Array(
    './audio/haruna/Haruna-00.ogg',
    './audio/haruna/Haruna-01.ogg',
    './audio/haruna/Haruna-02.ogg',
    './audio/haruna/Haruna-03.ogg',
    './audio/haruna/Haruna-04.ogg',
    './audio/haruna/Haruna-05.ogg',
    './audio/haruna/Haruna-06.ogg',
    './audio/haruna/Haruna-07.ogg',
    './audio/haruna/Haruna-08.ogg',
    './audio/haruna/Haruna-09.ogg',
    './audio/haruna/Haruna-10.ogg',
    './audio/haruna/Haruna-11.ogg',
    './audio/haruna/Haruna-12.ogg',
    './audio/haruna/Haruna-13.ogg',
    './audio/haruna/Haruna-14.ogg',
    './audio/haruna/Haruna-15.ogg',
    './audio/haruna/Haruna-16.ogg',
    './audio/haruna/Haruna-17.ogg',
    './audio/haruna/Haruna-18.ogg',
    './audio/haruna/Haruna-19.ogg',
    './audio/haruna/Haruna-20.ogg',
    './audio/haruna/Haruna-21.ogg',
    './audio/haruna/Haruna-22.ogg',
    './audio/haruna/Haruna-23.ogg'
)

var warspite = new Array(
    './audio/warspite/Warspite-00.ogg',
    './audio/warspite/Warspite-01.ogg',
    './audio/warspite/Warspite-02.ogg',
    './audio/warspite/Warspite-03.ogg',
    './audio/warspite/Warspite-04.ogg',
    './audio/warspite/Warspite-05.ogg',
    './audio/warspite/Warspite-06.ogg',
    './audio/warspite/Warspite-07.ogg',
    './audio/warspite/Warspite-08.ogg',
    './audio/warspite/Warspite-09.ogg',
    './audio/warspite/Warspite-10.ogg',
    './audio/warspite/Warspite-11.ogg',
    './audio/warspite/Warspite-12.ogg',
    './audio/warspite/Warspite-13.ogg',
    './audio/warspite/Warspite-14.ogg',
    './audio/warspite/Warspite-15.ogg',
    './audio/warspite/Warspite-16.ogg',
    './audio/warspite/Warspite-17.ogg',
    './audio/warspite/Warspite-18.ogg',
    './audio/warspite/Warspite-19.ogg',
    './audio/warspite/Warspite-20.ogg',
    './audio/warspite/Warspite-21.ogg',
    './audio/warspite/Warspite-22.ogg',
    './audio/warspite/Warspite-23.ogg'
)

var amatsukaze = new Array(
    './audio/amatsukaze/Amatsukaze-00.ogg',
    './audio/amatsukaze/Amatsukaze-01.ogg',
    './audio/amatsukaze/Amatsukaze-02.ogg',
    './audio/amatsukaze/Amatsukaze-03.ogg',
    './audio/amatsukaze/Amatsukaze-04.ogg',
    './audio/amatsukaze/Amatsukaze-05.ogg',
    './audio/amatsukaze/Amatsukaze-06.ogg',
    './audio/amatsukaze/Amatsukaze-07.ogg',
    './audio/amatsukaze/Amatsukaze-08.ogg',
    './audio/amatsukaze/Amatsukaze-09.ogg',
    './audio/amatsukaze/Amatsukaze-10.ogg',
    './audio/amatsukaze/Amatsukaze-11.ogg',
    './audio/amatsukaze/Amatsukaze-12.ogg',
    './audio/amatsukaze/Amatsukaze-13.ogg',
    './audio/amatsukaze/Amatsukaze-14.ogg',
    './audio/amatsukaze/Amatsukaze-15.ogg',
    './audio/amatsukaze/Amatsukaze-16.ogg',
    './audio/amatsukaze/Amatsukaze-17.ogg',
    './audio/amatsukaze/Amatsukaze-18.ogg',
    './audio/amatsukaze/Amatsukaze-19.ogg',
    './audio/amatsukaze/Amatsukaze-20.ogg',
    './audio/amatsukaze/Amatsukaze-21.ogg',
    './audio/amatsukaze/Amatsukaze-22.ogg',
    './audio/amatsukaze/Amatsukaze-23.ogg'
)

let checkchange = document.getElementById("menu")
checkchange.addEventListener("change", updateVA)

function updateVA() {
  var menu = document.getElementsByTagName("option")
  for (var i = 0; i < menu.length; i++) {
      if (menu[i].selected == true) {
          // get value, set checked flag or do whatever you need to
          menuactive = menu[i].value
          console.log('supman')
      }
  }

  if (menuactive === 'Haruna') {
      voice = haruna
      console.log("1")
  }
  else if (menuactive === 'Warspite') {
      voice = warspite
      console.log("2")
  }
  else if (menuactive === 'Amatsukaze') {
      voice = amatsukaze
      console.log("3")
  }

  var $va = document.getElementById("va")
  $va.innerHTML = menuactive

  let testbutton = document.getElementById("testbutton")
  testbutton.textContent = 'Random ' + menuactive + ' voice line'
}

updateVA()

function updateTime(){
    var currentTime = new Date()
    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()
    var seconds = currentTime.getSeconds()

  if (minutes == 00 && seconds == 00 ) {
    var i = Math.floor((Math.random() * 23) + 1)
    audio.src = voice[hours]
    audio.volume = 0.3
    audio.play()
    //console.log(hours)
  }
}

setInterval(updateTime, 1000)

var $jsValue = document.querySelector('.jsValue')

testbutton.addEventListener('click', ( ) => {
    var i = Math.floor((Math.random() * 23) + 1)
    audio.src = voice[i]
    audio.volume = 0.3
    audio.play()
    $jsValue.innerHTML = 'Playing ' + menuactive + ' line ' + i
})

audio.onended = function() {
    $jsValue.innerHTML = ''
}

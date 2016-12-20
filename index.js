const remote = require('electron').remote
const main = remote.require('./main.js')

var audio = new Audio()

let volume = document.getElementById('vol')
volume.addEventListener('change', updateVOL)

function updateVOL() {
  current_vol = volume.value
  document.getElementById('volvalue').innerHTML = current_vol
}

updateVOL()

let checkchange = document.getElementById('menu')
checkchange.addEventListener('change', updateVA)

function updateVA() {
  var menu = document.getElementsByTagName('option')
    for (var j = 0; j < menu.length; j++) {
      if (menu[j].selected == true) {
        menuactive = menu[j].value
    }
  }

  if (menuactive === 'Haruna') {
    haruna = []
    for (var k = 0; k <= 23; k++) {
      if (k < 10) {
        haruna[k] = './audio/haruna/Haruna-0' + k + '.ogg'
      }
      else {
        haruna[k] = './audio/haruna/Haruna-' + k + '.ogg'
      }
    }
    voice = haruna
    //console.log("1")
  }
  else if (menuactive === 'Warspite') {
    warspite = []
    for (var k = 0; k <= 23; k++) {
      if (k < 10) {
        warspite[k] = './audio/warspite/Warspite-0' + k + '.ogg'
      }
      else {
        warspite[k] = './audio/warspite/Warspite-' + k + '.ogg'
      }
    }
    voice = warspite
    //console.log("2")
  }
  else if (menuactive === 'Amatsukaze') {
    amatsukaze = []
    for (var k = 0; k <= 23; k++) {
      if (k < 10) {
        amatsukaze[k] = './audio/amatsukaze/Amatsukaze-0' + k + '.ogg'
      }
      else {
        amatsukaze[k] = './audio/amatsukaze/Amatsukaze-' + k + '.ogg'
      }
    }
    voice = amatsukaze
    //console.log("3")
  }

  var $va = document.getElementById('va')
  $va.innerHTML = menuactive

  let testbutton = document.getElementById('testbutton')
  testbutton.textContent = 'Random ' + menuactive + ' voice line'
}

updateVA()

function updateTime(){
  var currentTime = new Date()
  var hours = currentTime.getHours()
  var minutes = currentTime.getMinutes()
  var seconds = currentTime.getSeconds()

  if (minutes == 00 && seconds == 00 ) {
    audio.src = voice[hours]
    audio.volume = 0.3
    audio.play()
    //console.log(hours)
  }
}

setInterval(updateTime, 1000)

var $jsValue = document.querySelector('.jsValue')

testbutton.addEventListener('click', ( ) => {
  var rand = Math.floor((Math.random() * 23) + 1)
  audio.src = voice[rand]
  audio.volume = current_vol/100
  audio.play()
  $jsValue.innerHTML = 'Playing ' + menuactive + ' line ' + rand
  //console.log('Button pressed')
})

audio.onended = function() {
  $jsValue.innerHTML = ''
}

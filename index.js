const remote = require('electron').remote;
const main = remote.require('./main.js');
const settings = remote.require('electron-settings');

var audio = new Audio();

var volume = document.getElementById('vol');

if (settings.get('volume') != undefined) {
    current_vol = settings.get('volume');
    document.getElementById('volvalue').innerHTML = settings.get('volume');
    volume.value = settings.get('volume');

    var menu = document.getElementsByTagName('option');
    for (var j = 0; j < menu.length; j++) {
        if (menu[j].value === settings.get('VA')) {
            menu[j].selected = true;
        }
        else {
            menu[j].selected = false;
        }
    };
}
else {
    current_vol = volume.value;
    document.getElementById('volvalue').innerHTML = volume.value;


};

volume.addEventListener('input', function(){
    audio.volume = this.value/100;
    current_vol = this.value;
    audio.volume = current_vol/100;
    settings.set('volume', current_vol)
    document.getElementById('volvalue').innerHTML = this.value;
});

var toggle = document.getElementById('switch');

var dndhr = null;
// var dndmin = null;

toggle.addEventListener('change', function(){
    // console.log(toggle.checked);
    if (toggle.checked != false) {
        dndNOW = new Date();
        dndhr = dndNOW.getHours();
        // dndmin = dndNOW.getMinutes();
    }
    else {
        dndhr = null;
        // dndmin = null;
    }
    // console.log(dndhr);
    // console.log(dndmin);
})

var menuVA = document.getElementById('menu');
menuVA.addEventListener('change', updateVA);

function updateVA() {
    var menu = document.getElementsByTagName('option');
    for (var j = 0; j < menu.length; j++) {
        if (menu[j].selected == true) {
            activeVA = menu[j].value
            settings.set('VA', activeVA)
        }
    };

    voice = [];
    for (var k = 0; k <= 23; k++) {
        if (k < 10) {
            voice[k] = './audio/' + activeVA.toLowerCase() + '/' + activeVA + '-0' + k + '.ogg';
        }
        else {
            voice[k] = './audio/' + activeVA.toLowerCase() + '/' + activeVA + '-' + k + '.ogg';
        }
    };

    audio.pause();

    var $va = document.getElementById('va');
    $va.innerHTML = activeVA;

    var testbutton = document.getElementById('testbutton');
    testbutton.textContent = 'Random ' + activeVA + ' voice line';
};

updateVA();

function updateTime(){
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();

    if (minutes == 00 && seconds == 00 ) {
        // if (dndmin != null && dndmin < 45) {
        if (dndhr != null) {
            if (hours > dndhr + 1) {
                audio.src = voice[hours];
                audio.volume = current_vol/100;
                audio.play();

                toggle.checked = false;
                dndhr = null;
                // dndmin = null;
                // console.log('<45');
            };
        // }
        // else if (dndmin != null && dndmin >= 45) {
        //     if (hours > dndhr + 2) {
        //         audio.src = voice[hours];
        //         audio.volume = current_vol/100;
        //         audio.play();
        //
        //         toggle.checked = false;
        //         dndhr = null;
        //         dndmin = null;
        //         // console.log('>=45');
        //     };
        }
        else {
            audio.src = voice[hours];
            audio.volume = current_vol/100;
            audio.play();

            // console.log('usual');
        };
    };
};

var $info = document.querySelector('.info');

testbutton.addEventListener('click', testplay)

function testplay() {
    var rand = Math.floor((Math.random() * 23) + 1);
    audio.src = voice[rand];
    audio.volume = current_vol/100;
    audio.play();
    $info.innerHTML = 'Playing ' + activeVA + ' line ' + rand;
    // console.log('Test button pressed')
}

setInterval(updateTime, 1000);

audio.onended = function() {
    $info.innerHTML = '';
};

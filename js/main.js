let synth = window.speechSynthesis;
let cards = document.querySelectorAll('.display-card');
let voiceList = document.getElementById('voice-list');
let speakBtn = document.getElementById('speak-btn');

cards.forEach(card => {
    card.addEventListener('click', () => {
        let text = card.firstElementChild.nextElementSibling.firstElementChild.innerHTML;
        speak(text);
    })
});

let voices = [];

function populateVoiceList() {
    voices = synth.getVoices();
    console.log(voices);
    for(i = 0; i < voices.length ; i++) {
      var option = document.createElement('option');
      option.textContent = voices[i].name + ' (' + voices[i].lang + ')';   
      if(voices[i].default) {
        option.textContent += ' -- DEFAULT';
      }
  
      option.setAttribute('data-lang', voices[i].lang);
      option.setAttribute('data-name', voices[i].name);
      voiceList.appendChild(option);
    }
}
 
setTimeout(populateVoiceList,50);

function speak(textinput) {
    let text = new SpeechSynthesisUtterance(textinput);
    var selectedOption = voiceList.selectedOptions[0].getAttribute('data-name');
    for(i = 0; i < voices.length ; i++) {
        if(voices[i].name === selectedOption) {
        text.voice = voices[i];
        }
    }
    synth.speak(text); 
}

speakBtn.addEventListener('click', () => {
    let text = document.getElementById('text-input').value;
    speak(text);
})
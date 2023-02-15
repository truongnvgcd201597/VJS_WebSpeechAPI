//Init speech synth API
const synth = window.speechSynthesis;

const textForm = document.querySelector("form");
const textInput = document.getElementById("text-input");
const voiceSelect = document.getElementById("voice-select");
const rate = document.getElementById("rate");
const rateValue = document.getElementById("rate-value");
const pitch = document.getElementById("pitch");
const pitchValue = document.getElementById("pitch-value");
const body = document.querySelector('body');
//Init voices array
let voices = [];

const getVoice = () => {
  voices = synth.getVoices();
  body.style.background = '#fff url(./img/speechAPI.gif)'
  body.style.backgroundRepeat = 'repeat-x'
  body.style.backgroundSize = '100% 100%'
  //Loop voices and create an option
  voices.forEach((voice, index) => {
    const option = document.createElement("option");
    //Fill option voice and language
    option.textContent = voice.name + "(" + voice.lang + ")";

    //Set neeed option attributes
    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-lang", voice.name);
    voiceSelect.appendChild(option);
  });
};

getVoice();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoice;
}

//Speak
const speak = () => {
    //Add background animation

  // Check speaking
  if (synth.speaking) {
    console.log(new Error("Already speaking..."));
    return;
  }
  if(textInput.value !== ''){
     //Get speak test 
     const speakText = new SpeechSynthesisUtterance(textInput.value);
     //Speak end 
     speakText.onend = e =>{
         console.log('Done speaking...');
     }
     // Speak error
     speakText.onerror = e =>{
        console.error('Somethin went wrong');
     }

     //Selected voice
     const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

     //Loop through voices
     voices.forEach(voice => {
        if(voice.name === selectedVoice){
            speakText.voice = voice;
        }
     });

     // Set pitch and rate
     speakText.rate = rate.value;
     speakText.rate = pitch.value;
     //Speak
     synth.speak(speakText);
  }
};

// Event listener

// Text form submit
textForm.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textInput.blur();
})
// rate value change
rate.addEventListener('change', e => rateValue.textContent = rate.value);
pitch.addEventListener('change', e => pitchValue.textContent = pitch.value);

// Voice select change
voiceSelect.addEventListener('change', e => speak());
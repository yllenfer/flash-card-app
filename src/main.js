import Vex from "vexflow";

// Function to render the piano
export function renderPiano(container, correctNote, handleKeyPress) {
  const whiteKeys = [
    "C", "D", "E", "F", "G", "A", "B",
    "C", "D", "E", "F", "G", "A", "B",
    "C", "D", "E", "F", "G", "A", "B",
  ]; // Extend as needed
  const blackKeys = [
    "C#", "D#", null, "F#", "G#", "A#", null,
    "C#", "D#", null, "F#", "G#", "A#", null,
    "C#", "D#", null, "F#", "G#", "A#", null
  ]; // Black keys align to piano layout

  const piano = document.createElement("div");
  piano.className = "piano";

  // Add white keys
  whiteKeys.forEach((key, index) => {
    const keyElement = document.createElement("div");
    keyElement.className = "key white-key";
    keyElement.addEventListener("click", () => {
      handleKeyPress(key, correctNote);
    });
    piano.appendChild(keyElement);
  });

  // Add black keys
  blackKeys.forEach((key, index) => {
    if (key) {
      const blackKeyElement = document.createElement("div");
      blackKeyElement.className = "key black-key";
      blackKeyElement.style.left = `${index * (100 / whiteKeys.length) + 3}%`; // Adjust black key alignment
      blackKeyElement.addEventListener("click", () => {
        handleKeyPress(key, correctNote);
      });
      piano.appendChild(blackKeyElement);
    }
  });

  container.innerHTML = ""; // Clear existing content
  container.appendChild(piano);
}


// Function to render the music sheet
export function renderMusicSheet(container, note) {
  container.innerHTML = "";

  const VF = Vex.Flow;

  // Adjust width and height dynamically for responsiveness
  const screenWidth = window.innerWidth;
  const scoreWidth = screenWidth > 900 ? 600 : 300; // Larger width for larger screens
  const scoreHeight = screenWidth > 900 ? 200 : 150;

  const renderer = new VF.Renderer(container, VF.Renderer.Backends.SVG);
  renderer.resize(scoreWidth, scoreHeight); // Resize dynamically
  const context = renderer.getContext();

  const stave = new VF.Stave(10, 20, scoreWidth - 20); 
  stave.addClef("treble").setContext(context).draw();

  const staveNote = new VF.StaveNote({
    keys: [`${note.toLowerCase()}/4`],
    duration: "q",
  });

  VF.Formatter.FormatAndDraw(context, stave, [staveNote]);
}



function handleKeyPress(selectedNote, correctNote) {
  if (selectedNote === correctNote) {
    alert(`"Correct! ${correctNote} is the right note."`);
  } else {
    alert(`Incorrect! ${selectedNote} is not the right one. The correct note was ${correctNote}.`);
  }

  // Generate a new random note
  const notes = ["C", "D", "E", "F", "G", "A", "B"];
  const randomNote = notes[Math.floor(Math.random() * notes.length)];
  updateCard(randomNote);
}


export function updateCard(correctNote) {
  const pianoContainer = document.getElementById("piano-container");
  const musicSheet = document.getElementById("music-sheet");


  renderPiano(pianoContainer, correctNote, handleKeyPress);

 
  renderMusicSheet(musicSheet, correctNote);
}


document.addEventListener("DOMContentLoaded", () => {
  const notes = ["C", "D", "E", "F", "G", "A", "B",  "C#", "D#", "F#", "G#", "A#"];
  const randomNote = notes[Math.floor(Math.random() * notes.length)];

  updateCard(randomNote); 
});

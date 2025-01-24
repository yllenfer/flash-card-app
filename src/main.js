import Vex from "vexflow";

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("card");
  console.log("App container:", app); 


  const notes = ["C", "D", "E", "F", "G", "A", "B"];
  const randomNote = notes[Math.floor(Math.random() * notes.length)];
  console.log("Random Note:", randomNote); 


  updateCard(randomNote);
});

export function renderPiano(container, highlightedNote = null) {
  const keys = ["C", "D", "E", "F", "G", "A", "B"];
  const piano = document.createElement("div");
  piano.className = "piano";

  keys.forEach((key) => {
    const keyElement = document.createElement("div");
    keyElement.className = "key";
    keyElement.textContent = key;

 
    if (highlightedNote && highlightedNote.includes(key)) {
      keyElement.style.backgroundColor = "yellow";
    }

    piano.appendChild(keyElement);
  });

  container.innerHTML = ""; 
  container.appendChild(piano);
}

export function renderMusicSheet(container, note) {
  container.innerHTML = "";

  const VF = Vex.Flow;
  const renderer = new VF.Renderer(container, VF.Renderer.Backends.SVG);
  renderer.resize(300, 150); 
  const context = renderer.getContext();

  const stave = new VF.Stave(10, 40, 280);
  stave.addClef("treble").setContext(context).draw();


  const staveNote = new VF.StaveNote({
    keys: [`${note.toLowerCase()}/4`],
    duration: "q",
  });

  VF.Formatter.FormatAndDraw(context, stave, [staveNote]);
}

export function updateCard(note) {
  const pianoContainer = document.getElementById("piano-container");
  const musicSheet = document.getElementById("music-sheet");

  console.log("Piano Container:", pianoContainer); 
  console.log("Music Sheet Container:", musicSheet); 


  renderPiano(pianoContainer, note);


  renderMusicSheet(musicSheet, note);
}

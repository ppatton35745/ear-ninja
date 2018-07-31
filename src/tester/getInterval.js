export default function getInterval(
  seedNote,
  downPattern,
  upPattern,
  noteRangeMin,
  noteRangeMax
) {
  console.log("I'm running get interval");
  console.log("seed note", seedNote);
  const scalarNotes = [];
  let i = seedNote;
  let j = 0;

  console.log("empty scalar notes", scalarNotes);

  scalarNotes.push(i);

  console.log("added first note", scalarNotes);

  while ((i -= downPattern[j % 7]) >= noteRangeMin) {
    scalarNotes.push(i);
    j++;
  }

  console.log("added down patter", scalarNotes);

  i = seedNote;
  j = 0;

  while ((i += upPattern[j % 7]) <= noteRangeMax) {
    scalarNotes.push(i);
    j++;
  }

  console.log("added up pattern", scalarNotes);

  scalarNotes.sort();

  console.log("sorted scalar notes", scalarNotes);

  const notes = [];

  for (let i = 0; i < 2; i++) {
    notes.push(scalarNotes[Math.floor(Math.random() * scalarNotes.length)]);
  }

  notes.sort();
  console.log("the sorted/selected notes we're going to return", notes);
  return notes;
}

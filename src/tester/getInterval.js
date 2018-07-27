export default function setInterval(
  seedNote,
  downPattern,
  upPattern,
  noteRangeMin,
  noteRangeMax,
  setCurrentQuestionNotes
) {
  const scalarNotes = [];
  let i = seedNote;
  let j = 0;

  scalarNotes.push(i);

  while ((i -= downPattern[j % 7]) >= noteRangeMin) {
    scalarNotes.push(i);
    j++;
  }

  i = seedNote;
  j = 0;

  while ((i += upPattern[j % 7]) <= noteRangeMax) {
    scalarNotes.push(i);
    j++;
  }

  scalarNotes.sort();

  const notes = [];

  for (let i = 0; i < 2; i++) {
    notes.push(scalarNotes[Math.floor(Math.random() * scalarNotes.length)]);
  }
  return notes;
}

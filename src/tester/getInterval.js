export default function getInterval(
  seedNote,
  downPattern,
  upPattern,
  noteRangeMin,
  noteRangeMax
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

  while (notes.length < 2) {
    const randomNote =
      scalarNotes[Math.floor(Math.random() * scalarNotes.length)];
    if (!notes.includes(randomNote)) {
      notes.push(randomNote);
    }
  }

  notes.sort();
  return notes;
}

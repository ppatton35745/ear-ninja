export default class hinter {
  static playInterval = (notes, play) => {
    notes.forEach(note => {
      play(note);
    });
  };

  static playTeasedInterval = (notes, play) => {
    const playDelayed = note => {
      setTimeout(() => play(note), 600);
    };

    play(notes[0]);
    let i = 1;
    while (i < notes.length) {
      playDelayed(notes[i]);
      i++;
    }
  };

  static playScale = (
    note,
    play,
    stop,
    upPattern,
    downPattern,
    onHintNote,
    offHintNote
  ) => {
    const playDelayed = (note, j) => {
      setTimeout(() => {
        play(note);
      }, j * 200);
      setTimeout(() => {
        onHintNote(note);
      }, j * 210);

      setTimeout(() => {
        stop(note);
      }, j * 200 + 199);
      setTimeout(() => {
        offHintNote(note);
      }, j * 210 + 199);
    };

    let j = 0;

    while (j <= upPattern.length) {
      playDelayed(note, j, "up");
      if (j !== upPattern.length) {
        note += upPattern[j];
      }
      j++;
    }

    let k = 0;

    while (k <= downPattern.length) {
      playDelayed(note, j, "down");

      note -= downPattern[k];
      j++;
      k++;
    }
  };
}

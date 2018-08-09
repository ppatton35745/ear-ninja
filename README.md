## Overview

Ear-ninja is a game designed to challenge the player to master their
musical auditory perception. You will be presented with a scale from
a randomly select Major key to get a musical frame of reference,
then random tones from that scale which you must decipher and mark
on the controller keyboard. The objective is to correctly answer as
many intervals as possible in one minute. Your score will be a
combination of of total correct answers and your overall accuracy
percentage.

## Start-up Instructions

```
git clone git@github.com:ppatton35745/ear-ninja.git
```

Clones the application to your machine

```
cd ear-ninja/
```

Change to new project directory

```
npm install
```

Install needed dependencies to run the application

```
cd PATH-TO-PROJECT/ear-ninja/src/db/
json-server -p 5002 -w database.json
```

Run json-server on 5002 watching the project database file

```
cd PATH-TO-PROJECT/ear-ninja/
npm start
```

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `** NOTE: Using touchscreen will disable mouse clicks on keyboard`

## Thanks To

@iqnivek for the awesome user friedly [react-piano](https://github.com/iqnivek/react-piano)<br>
@danigb for the great sounds provided by [soundfont-player](https://github.com/danigb/soundfont-player)

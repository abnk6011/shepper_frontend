This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to run

First clone the repo

### `git clone https://github.com/abnk6011/shepper_frontend.git`

Then cd into the folder

### `cd shepper_frontent`

Install node modules

### `npm install`

Run the app in your local environment

### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run eject`

### Assumptions

* CSS Frameworks like Bootstrap, Material, Bulma + their Grid systems should't be used
* The UI/UX should focus on user's minimum clicks (avoid crumbled buttons everywhere)
* React-styled-components is used to improve code readibility (avoids many div tags)
* Otherwise, plain CSS & Grid is used
* No DnD external libbraries, implemented in a native way
* Simple alert is thrown to navigate the user with messages


### Features

* Setting/Changing Section Title
* Creating Cards
* Setting Card's question title
* Choosing question Type (Boolean, Input). Input only accept Number for max_chars
* Deleting question/Editing question/Change type of the question
* Delete Cards (the order of the cards will stay correct e.g. ascending)
* Grab and Shuffle cards
* Below the section "Save/view Json" button shows the JSON Live Output (need to have at least 1 Title & 1 Question)
* Mobile View also works for all features, except DnD

Full desktop video of the features demo was uploaded to https://youtu.be/e8bP2KW-tzA

### Quick Gif
[![Demo](https://im4.ezgif.com/tmp/ezgif-4-05bb95ba7eff.gif)]



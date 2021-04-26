# Choosy

[Live on Heroku!](https://choosyapp.herokuapp.com/)

Have you ever been out with your friends and can't decide what to do or where to go? Do you have trouble deciding on which item to cross off of your to-do list first? Do you ever need a quick way to bounce your decisions off of something?

Choosy is a mobile-friendly app that helps individuals and groups quickly make decisions. Users will collaboratively make a list of all the possible decisions, and then go through quick rounds of voting methods that narrow the more popular decisions down to a final winner.

Choosy is built using the MERN stack, with the voting and logic on the frontend, and the user database and optional history of past decisions stored in the backend.

# Built With

* MongoDB
* Express.js
* React.js / Redux
* Node.js

# Features

* Create Room

Users who are logged in can create a room. Other users can join this room. In the room lobby, users can enter their name and also see other people who have joined the room.

* Idea Submissions

Users can submit ideas during the submission phase. The user's personal idea list is then combined with other users' personal idea list to form one big list of ideas.

* Idea Voting

Users can vote on ideas they like or dislike. Users only have a limited time to vote, and if they didn't vote in time, the app will automatically choose for them!

* Idea Culling

Only the ideas that receive the most votes are allowed to move on to the next round. Half of all ideas are culled every round. This ensures there will always be one idea left, helping indecisive people pick ideas.

# Planned Features
* Joining a room as a guest
* Saving lists after a session


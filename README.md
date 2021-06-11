![Logo](https://github.com/henry-pan/Choosy/blob/main/images/logo.png)

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

Users who are logged in can create a room by clicking the "Create Room" button the front page, becoming the host of the room. There is a room code listed on the page, along with a list of users waiting in the room lobby.

Other users can use the room code to join the room. By entering the room code in the "Enter room code" field on the front page, users can join the room. If a user isn't logged in, they are prompted to enter a name. In the room lobby, all users can see other people who have joined the room. The lobby is updated in real-time using socket.io.

![Joining](https://github.com/henry-pan/Choosy/blob/main/images/joining.gif)

The room host can begin the idea submission phase by clicking the "Start" button.

* Idea Submissions

Users are given one minute to submit any ideas during the submission phase. The user's submissions list is then combined with other users' submissions list to form one big list of ideas.

* Idea Voting

Users can vote on ideas they like or dislike. Users only have a limited time to vote, and if they didn't vote in time, the app will automatically choose for them!

* Idea Culling

Only the ideas that receive the most votes are allowed to move on to the next round. Half of all ideas are culled every round. This ensures there will always be one idea left, helping indecisive people pick ideas.


# Contributors
* **Henry Pan** - Team Lead
* **Benjamin Young** - Front End Lead
* **Nat Kozak** - Back End Lead
* **Sou (Tommy) Lee** - Fullstack Flex

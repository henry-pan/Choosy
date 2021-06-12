![Logo](https://github.com/henry-pan/Choosy/blob/main/images/logo.png)

# Choosy

[Live on Heroku!](https://choosyapp.herokuapp.com/)

Have you ever been out with your friends and can't decide what to do or where to go? Do you have trouble deciding on which item to cross off of your to-do list first? Do you ever need a quick way to bounce your decisions off of something?

Choosy is a mobile-friendly app that helps individuals and groups quickly make decisions. Users will collaboratively make a list of all the possible decisions, and then go through quick rounds of voting methods that narrow the more popular decisions down to a final winner.

Choosy is built using the MERN stack, with the voting and logic on the frontend, and the user database and optional history of past decisions stored in the backend.

# Built With

* MongoDB
* Express.js
* React
* Node.js
* Redux
* Mongoose
* Axios
* HTML/CSS
* Socket.io

# Features

## Create Room

Users who are logged in can create a room by clicking the "Create Room" button the front page, becoming the host of the room. There is a room code listed on the page, along with a list of users waiting in the room lobby.

Other users can use the room code to join the room. By entering the room code in the "Enter room code" field on the front page, users can join the room. If a user isn't logged in, they are prompted to enter a name. In the room lobby, all users can see other people who have joined the room. The lobby is updated in real-time using socket.io.

![Joining](https://github.com/henry-pan/Choosy/blob/main/images/joining.gif)

The room host can begin the idea submission phase by clicking the "Start" button.

## Idea Submissions

During the idea submissions phase, users are given one minute to enter their ideas. Users can delete an idea by clicking on the trash icon button next to the idea. When time is up, the user's ideas list is then combined with other users' ideas list to form one big list of ideas.

## Voting

On the voting phase, each idea in the combined list of ideas is presented to the user. The user has the option to pick "like" or "dislike", indicated by thumbs up and thumbs down buttons. Users will only have a limited time to vote, and if they didn't vote in time, the app will automatically and randomly choose for them!

Each user in the room will vote on the same ideas, at the same time.

## Idea Culling

After the end of the voting phase, users are shown the results. Every idea will have a numerical score next to them, displaying the number of total "like" votes it has received. Only the ideas that receive the most votes are allowed to move on to the next round of voting. All ideas with zero votes are removed, then half of all remaining ideas are culled every round. This ensures that there will be no ties, and guarantees an outcome that is favored by most or all the users in the room.


# Contributors
* **Henry Pan** - Team Lead
* **Benjamin Young** - Front End Lead
* **Nat Kozak** - Back End Lead
* **Sou (Tommy) Lee** - Fullstack Flex

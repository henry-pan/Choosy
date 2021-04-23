class Idea {
  constructor(id, name, email, password) {

    // user info
    this.id = id;
    this.user = user;
    this.body = body;
    this.score = score;
    this.date = date;
  }

  addScore(points) {
    this.score += points;
    this.totalScore += points;
  }
}

module.exports = Idea;
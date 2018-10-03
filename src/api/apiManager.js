class apiManager {
  getField(resource) {
    return fetch(`https://ear-ninja-db.herokuapp.com/${resource}`).then(e =>
      e.json()
    );
  }

  postUser(email, password) {
    return fetch("https://ear-ninja-db.herokuapp.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then(e => e.json());
  }

  postRound(round) {
    return fetch("https://ear-ninja-db.herokuapp.com/rounds", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(round)
    });
  }

  postQuestion(question) {
    return fetch("https://ear-ninja-db.herokuapp.com/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(question)
    });
  }

  postAnswer(answer) {
    return fetch("https://ear-ninja-db.herokuapp.com/answers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(answer)
    });
  }
}

const API = new apiManager();
export default API;

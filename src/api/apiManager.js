class apiManager {
  getField(resource) {
    return fetch(`http://localhost:5002/${resource}`).then(e => e.json());
  }

  postUser(email, password) {
    return fetch("http://localhost:5002/users", {
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
    return fetch("http://localhost:5002/rounds", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(round)
    }).then(e => e.json());
  }

  postQuestion(question) {
    return fetch("http://localhost:5002/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(question)
    }).then(e => e.json());
  }

  postAnswer(answer) {
    return fetch("http://localhost:5002/answers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(answer)
    }).then(e => e.json());
  }
}

const API = new apiManager();
export default API;

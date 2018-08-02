import React, { Component } from "react";
import Api from "./api/apiManager"; //was api
import "./styles/login.css";

export default class Login extends Component {
  // Set initial state
  state = {
    email: "",
    password: ""
  };

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  //Login Handler
  handleLogin = e => {
    e.preventDefault();
    Api.getField(`users?email=${this.state.email}`).then(user => {
      //Check whether or not user exists by checking the return from ajax call. If return is empty array, or if the email or password dont match throw error
      if (
        user.length === 0 ||
        (user[0].password !== this.state.password ||
          user[0].email !== this.state.email)
      ) {
        alert(
          "Email or password is incorrect or non-existent. Please try again."
        );
        return;
      } else if (
        user[0].password === this.state.password &&
        user[0].email === this.state.email
      ) {
        sessionStorage.setItem("activeUser", user[0].id);
        //Set state for parent component to show user is logged in
        this.props.logUserIn();
      }
    });
  };

  registerUser(e) {
    //Prevent page reload from form element submit
    e.preventDefault();
    //Get users email and password
    Api.getField(`users?email=${this.state.email}`).then(emailResponse => {
      Api.getField(`users?password=${this.state.password}`).then(
        passwordResponse => {
          //Check to see if email or password are already registered
          if (emailResponse.length === 0 && passwordResponse.length === 0) {
            //if not, then register the user
            Api.postUser(this.state.email, this.state.password).then(
              response => {
                sessionStorage.setItem("activeUser", response.id);
                //Call login function to set state in parent component
                this.props.logUserIn();
              }
            );
          } else {
            //if email or password are already registered, throw an error
            alert("Sorry, that email or password is already registered");
            return;
          }
        }
      );
    });
  }
  render() {
    return (
      <div id="login-stuff">
        <form>
          <img
            alt=""
            id="headline-image"
            src="https://downloads.intercomcdn.com/i/o/2702/25ce9574b3a1dc309da496fc/Nutshell-logo-white%402x.png"
          />
          <h3 className="secondary-headline">
            Please log in or register a new account
          </h3>
          <label className="marginLeft">Email</label>
          <input
            onChange={this.handleFieldChange}
            type="text"
            ref="emailInput"
            id="email"
            placeholder="Email"
            required=""
            autoFocus=""
            className="marginLeft login-input"
          />
          <label className="marginLeft">Password</label>
          <input
            onChange={this.handleFieldChange}
            type="password"
            ref="passwordInput"
            id="password"
            placeholder="Password"
            required=""
            className="marginLeft login-input"
          />
          <button
            className="marginLeft login-button"
            type="submit"
            onClick={this.handleLogin}
          >
            Sign in
          </button>
          <button
            id="register"
            className="marginLeft login-button"
            onClick={e => this.registerUser(e)}
          >
            Register
          </button>
        </form>
      </div>
    );
  }
}

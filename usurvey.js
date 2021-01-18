import React, { Component } from 'react';
import firebase from 'firebase';

var uuid = require('uuid');


var config = {
    apiKey: "AIzaSyDdhC4zzUHclCdk2sCW-Jumta6xEBPUWVU",
    authDomain: "usurvey-b7353.firebaseapp.com",
    databaseURL: "https://usurvey-b7353-default-rtdb.firebaseio.com",
    storageBucket: "usurvey-b7353.appspot.com",
    messagingSenderId: "539322440263"
}; 

firebase.initializeApp(config);

class Usurvey extends Component {
    nameSubmit(event) {
        var userEmail = this.refs.name.value;
        this.setState({ userEmail: userEmail }, function () {
            console.log(this.state);
        });
    }
    answerSelected(event) {
        var answers = this.state.answers;
        if (event.target.name === 'answer1') {
            answers.answer1 = event.target.value;
        } else if (event.target.name === 'answer2') {
            answers.answer2 = event.target.value;
        } else if (event.target.name === 'answer3') {
            answers.answer3 = event.target.value;
        } else if (event.target.name === 'answer4') {
            answers.answer4 = event.target.value;
        }

        this.setState({ answers: answers }, function () {
            console.log(this.state);
        });
    }

    questionSubmit() {
        firebase.database().ref('uSurvey/' + this.state.uid).set({
            userEmail: this.state.userEmail,
            answers: this.state.answers
        });
        this.setState({ isSubmitted: true });
    }

    constructor(props) {
        super(props);

        this.state = {
            uid: uuid.v1(),
            userEmail: '',
            answers: {
                answer1: '',
                answer2: '',
                answer3: '',
                answer4:'',
            },
            isSubmitted: false
        };
        this.nameSubmit = this.nameSubmit.bind(this);
        this.answerSelected = this.answerSelected.bind(this);
        this.questionSubmit = this.questionSubmit.bind(this);
    }

    render() {
        var userEmail;
        var questions;

        if (this.state.userEmail === '' && this.state.isSubmitted === false) {
           //style first part here//
           userEmail = <div class="center">
                <h2>To be entered in the Nike SB Freddy Krueger Dunk raffle,<p/>type your email and press Enter to complete the survey: </h2>
                <form onSubmit={this.nameSubmit}>
                    <input className="name" type="text" placeholder="Enter your email" ref="name" />
                </form>
            </div>;
            questions = ''
        } else if (this.state.userEmail !== '' && this.state.isSubmitted === false) {
            userEmail = <h1 class="lead">Welcome to SkateSurvey, {this.state.userEmail}. Tell us what you think:</h1>;
            questions = <div>
                
                <form onSubmit={this.questionSubmit}>
                    
                    <div className="card">
                        <label className="question">What's your favorite brand of skate shoe? </label> <br />
                        <input type="radio" name="answer1" value="Vans" onChange={this.answerSelected}/>Vans 
              <input type="radio" name="answer1" value="Nike SB" onChange={this.answerSelected} />Nike SB 
              <input type="radio" name="answer1" value="Emerica" onChange={this.answerSelected} />Emerica 
              <input type="radio" name="answer1" value="Es" onChange={this.answerSelected} />Es 
              <input type="radio" name="answer1" value="Adidas" onChange={this.answerSelected} />Adidas
            </div>
                    <div className="card">
                        <label className="question">How do you feel about Dunk drops? </label> <br />
                        <input type="radio" name="answer2" value="Yay" onChange={this.answerSelected} />Yay! Best skate shoe ever!
                        
              <input type="radio" name="answer2" value="Nope" onChange={this.answerSelected} />Nope. Nike SB isn't skateboarding.
              
              <input type="radio" name="answer2" value="Dope" onChange={this.answerSelected} />Dope. I make a lot of money flipping those on StockX.
            </div>
                    <div className="card">
                        <label className="question">Do you buy softgoods? (Shirts, pants, hats, etc.)  </label> <br />
                        <input type="radio" name="answer3" value="Yep" onChange={this.answerSelected} />Yep. Always.
                        <br/>
              <input type="radio" name="answer3" value="Nope" onChange={this.answerSelected} />Nah. Dickies and the thrift shop for me.
              <br />
              <input type="radio" name="answer3" value="Sometimes" onChange={this.answerSelected} />Sometimes I'll get some boutique/small brand stuff like Polar, FA, Alltimers.
            </div>
                    <div className="card">
                        <label className="question">Do you buy shop boards?</label> <br />
                        <input type="radio" name="answer4" value="yes" onChange={this.answerSelected} />Yes<br/>
                        <input type="radio" name="answer4" value="no" onChange={this.answerSelected} />No<br />
              <input type="radio" name="answer4" value="depends" onChange={this.answerSelected} />Depends. Which wood shop do you use?
            </div>
            <div class="buttonCenter">
                    <input className="feedback-button" type="submit" value="submit" />
                    </div>
                </form>
            </div>
           
        } else if (this.state.isSubmitted === true) {
            userEmail = <div class="endcenter"> <h1>Thanks, {this.state.userEmail}. All raffle winners will be <br/>notified by email 1/01/21. Good Luck!</h1></div>
        }

        return (
            <div>
                {userEmail}
                
        {questions}
            </div>
            
        );
    }
}

export default Usurvey;

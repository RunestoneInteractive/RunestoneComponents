export default class HParsonsFeedback {
    constructor(hparsons) {
        this.hparsons = hparsons;
    }
    createOutput() {
        console.log('createOutput method not implemented in feedback!');
    }
    async runButtonHandler() {
        console.log('runButtonClicked method not implemented in feedback!');
    }
    customizeUI() {
        // used to change some minor UI, e.g. the text on Run button
    }
    init() {
        // initlizations functionalities such as preparing SQL,
        // or checking related options
    }

    clearFeedback() {
        // called when input is changed
        console.log('clearFeedback method not implemented in feedback!');
    }
    
    reset() {
        // called when reset is clicked
        console.log('reset method not implemented in feedback!');
    }
}

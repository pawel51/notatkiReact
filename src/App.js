import React, {Component} from "react";


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        };
    }

    increment() {
        this.setState((prevState) => {
            let prev = prevState.counter;
            prev = prev + 1;
            return { counter: prev };
        })

    }

    render() {
        return (
            <div>
                <p>Counter: {this.state.counter}</p>
                <input type="button"
                       value="Increment"
                       onClick={() => this.increment()} />
            </div>
        );
    }
}
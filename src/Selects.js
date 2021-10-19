
import React, {Component} from "react";
import Info from './Info'
export default class Selects extends Component{
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            nick: "",
            selectedLanguage: "",
            country: ""
        }
    }

    onChange(event) {
        let name = event.target.id;
        this.setState({
            [name]: event.target.value
        })
    }
    changeButtonName() {
        return this.state.show === false ? "Show" : "Hide"
    }

    onClick() {
        this.setState(state => {
            let status = state.show;
            return {show: !status}
        })
    }

    render () {
        const {nick, selectedLanguage, country, show} = this.state;

        return (
            <div style={{margin: "20px, 0, 0, 30px"}}>
                <p>Nick: </p><input id={"nick"} type={"text"} onChange={(e) => this.onChange(e)}/>
                <p>Programming Language
                    <select id={"selectedLanguage"}
                            onChange={(e) => this.onChange(e)}>
                        <option value={"Java"}>Java</option>
                        <option value={"Java"}>Java</option>
                        <option value={"Java"}>Java</option>
                        <option value={"Java"}>Java</option>
                        <option value={"Java"}>Java</option>
                    </select>
                </p>
                <p>
                    Country: <input id={"country"}
                                    type={"text"}
                                    list={"countryName"}
                                    onChange={(e) => this.onChange(e)}/>
                    <datalist id={"countryName"}>
                        <option>Poland</option>
                        <option>Poland</option>
                        <option>Poland</option>
                        <option>Poland</option>
                        <option>Poland</option>
                    </datalist>
                </p>
                <button onClick={() => this.onClick()}>
                    {this.changeButtonName()}
                </button>
                {show ? (
                    <Info nick={nick}
                          selectedLanguage={selectedLanguage}
                          country={country}/>
                ) : null}
            </div>
        )
    }
}
import React from 'react';
import './index.less'
import axios from "axios";


import Clock from 'components/clock'

export default class Tse extends React.Component {
    constructor(props) {
        super(props);
        console.log("tse constructor");
        this.state = {stra: "hello"};
    }

    componentWillMount() {
        console.log("tse componentWillMount");
        console.log('tse this.state.str: ' + this.state.str);
    }

    componentDidMount() {

        const url = "http://127.0.0.1:5001"

        axios.get(url).then((response) => {

            console.log('tse ok resr: ' + response);
            console.log('tse ok resr: ' + JSON.stringify(response));
            console.log('tse ok resr: ' + response.data);

            this.setState({
                stra: JSON.stringify(response)
            });

        }).catch(function (error) {
            console.log('tse resr: ' + String(error));
        });
    }

    render() {
        const numbers = [1, 2, 3, 4, 5];

        // const { str } = this.state
        return (

            <div className="mdd">
                <Clock tsee="asdf" ></Clock>
                <h1 className="red">{this.state.stra}</h1>
            </div>
        )
    }
}
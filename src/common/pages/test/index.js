import React from 'react';
import './index.less'
import axios from "axios";

import ReactPlayer from 'react-player'
import Clock from 'components/clock'
import {Button} from 'antd';

export default class Tse extends React.Component {
    constructor(props) {
        super(props);
        console.log("tse constructor");
        this.state = {
            stra: "hello",
            liked: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    // componentWillMount() {
    //     console.log("tse componentWillMount");
    //     console.log('tse this.state.str: ' + this.state.str);
    // }
    //
    // componentDidMount() {
    //
    //     const url = "http://127.0.0.1:5001"
    //
    //     axios.get(url).then((response) => {
    //
    //         console.log('tse ok resr: ' + response);
    //         console.log('tse ok resr: ' + JSON.stringify(response));
    //         console.log('tse ok resr: ' + response.data);
    //
    //         this.setState({
    //             stra: JSON.stringify(response)
    //         });
    //
    //     }).catch(function (error) {
    //         console.log('tse resr: ' + String(error));
    //     });
    // }

    handleClick() {
        this.setState(prevState => ({
            liked: !prevState.liked
        }));
    }

    render() {

        var text = this.state.liked ? '喜欢' : '不喜欢';
        return (

            <div className="mdd">
                <Clock tsee="asdf"></Clock>
                <ReactPlayer  width='100%'
                              height='100%' url='http://rscdn.ajmide.com/c_250/250.m3u8' playing />
                <Button type="danger" onClick={this.handleClick}>
                    {text}
                </Button>
                <h1 ref="tse" className="red">{this.state.stra}</h1>
            </div>
        )
    }
}
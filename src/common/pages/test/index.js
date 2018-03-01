import React from 'react';
import './index.less'
import axios from "axios";

import ReactPlayer from 'react-player'
import Clock from 'components/clock'
import {Button, List, Avatar, Icon} from 'antd';

export default class Tse extends React.Component {
    constructor(props) {
        super(props);
        console.log("tse constructor");
        this.state = {
            stra: "hello",
            liked: false,
            playing: true,
            musicurl: 'http://rscdn.ajmide.com/c_250/250.m3u8',
            programs: []
        };
    }

    componentWillMount() {
        console.log("tse componentWillMount");
    }

    componentDidMount() {

        const url = "http://s.ajmide.com/searchProgram.php?type=3&page=0&filter=0&value=%E5%8A%A8%E6%84%9F101"

        axios.get(url).then((response) => {

            console.log('tse ok resr: ' + response);
            // console.log('tse ok resr: ' + JSON.stringify(response));
            console.log('tse ok resr: ' + response.data);

            this.setState({
                stra: JSON.stringify(response.data.code),
                programs: response.data.data
            });

        }).catch(function (error) {
            console.log('tse resr: ' + String(error));
        });
    }

    handleClick = () => {
        this.setState(prevState => ({
            liked: !prevState.liked
        }));
    }
    playPause = () => {
        this.setState({playing: !this.state.playing})
    };
    changeSong = (program, e) => {
        console.log('tse changeSong: ')
        this.setState({musicurl: program.liveUrl})
    };

    render() {
        const {musicurl, playing, volume, muted, loop, played, loaded, duration, playbackRate, programs} = this.state

        var text = this.state.liked ? '喜欢' : '不喜欢';
        const pgs = programs.map((program) =>
            <li onClick={this.changeSong.bind(this, program)} key={program.name}>{program.name}
                : {program.liveUrl}  </li>
        );
        return (

            <div className="mdd">
                <Clock tsee="asdf"></Clock>
                <ReactPlayer width='10%'
                             height='10%' url={musicurl} playing={playing}/>
                <Button onClick={this.playPause}>{playing ? 'Pause' : 'Play'}</Button>
                <Button type="danger" onClick={this.handleClick}>
                    {text}
                </Button>
                <h1 ref="tse" className="red">{this.state.stra}</h1>
                <ul>{pgs}</ul>
                <h1>{musicurl}</h1>
            </div>
        )
    }
}
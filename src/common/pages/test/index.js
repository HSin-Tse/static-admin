import React from 'react';
import './index.less'
import axios from "axios";

import ReactPlayer from 'react-player'
import Clock from 'components/clock'
import {Button,Input, List, Avatar, Icon} from 'antd';

export default class Tse extends React.Component {
    constructor(props) {
        super(props);
        console.log("tse constructor");
        this.state = {
            stra: "hello",
            liked: false,
            playing: true,
            loaded: 0,
            playbackRate: 1.0,
            musicurl: 'http://rscdn.ajmide.com/c_250/250.m3u8',
            programs: []
        };
    }
    load = url => {
        this.setState({
            url,
            played: 0,
            loaded: 0
        })
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
    handelChange = (e) => {
        this.setState({playing: !this.state.playing})
        this.setState({playbackRate:e.target.value})
    };
    changeSong = (program, e) => {
        console.log('tse changeSong: ')
        this.setState({musicurl: program.liveUrl})
    };
    setPlaybackRate = e => {
        this.setState({ playbackRate: parseFloat(e.target.value) })
    }

    onSeekMouseDown = e => {
        this.setState({ seeking: true })
    }
    onSeekChange = e => {
        this.setState({ played: parseFloat(e.target.value) })
    }
    onSeekMouseUp = e => {
        this.setState({ seeking: false })
        this.player.seekTo(parseFloat(e.target.value))
    }
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
                             height='10%'
                             url={musicurl}
                             playing={playing}
                             playbackRate={playbackRate}
                             onDuration={this.onDuration}
                             onProgress={this.onProgress}
                />
                <Button onClick={this.playPause}>{playing ? 'Pause' : 'Play'}</Button>
                <Button type="danger" onClick={this.handleClick}>
                    {text}
                </Button>
                <Input  width='50px' type="number" onChange={this.handelChange} value={playbackRate} />
                <Input
                    type='range' min={0} max={1} step='any'
                    value={played}
                    // onMouseDown={this.onSeekMouseDown}
                    // onChange={this.onSeekChange}
                    // onMouseUp={this.onSeekMouseUp}
                />
                <progress max={1} value={loaded} />
                {/*<Button onClick={this.setPlaybackRate} value={playbackRate}>{playbackRate}</Button>*/}
                <h1 ref="tse" className="red">{this.state.stra}</h1>
                <ul>{pgs}</ul>
                <h1>播放速度 {playbackRate}</h1>
                <h1>{musicurl}</h1>
            </div>
        )
    }
}
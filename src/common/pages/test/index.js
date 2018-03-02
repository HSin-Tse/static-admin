import React from 'react';
import './index.less'
import axios from "axios";

import ReactPlayer from 'react-player'
import Clock from 'components/clock'
import {Button, Input, Progress, Layout} from 'antd';

const {Header, Footer, Sider, Content} = Layout;
const MULTIPLE_SOURCES = [
    {src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4', type: 'video/mp4'},
    {src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.ogv', type: 'video/ogv'},
    {src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.webm', type: 'video/webm'}
]

export default class Tse extends React.Component {
    constructor(props) {
        super(props);
        console.log("tse constructor");
        this.state = {
            stra: "hello",
            liked: false,
            playing: true,
            loaded: 0,
            per: 0,
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
        this.setState({playbackRate: e.target.value})
    };
    changeSong = (program, e) => {
        console.log('tse changeSong: ')
        this.setState({musicurl: program.liveUrl})
    };
    setPlaybackRate = e => {
        this.setState({playbackRate: parseFloat(e.target.value)})
    }

    onSeekMouseDown = e => {
        this.setState({seeking: true})
    }
    onSeekChange = e => {
        this.setState({played: parseFloat(e.target.value)})
    }
    onSeekMouseUp = e => {
        this.setState({seeking: false})
        this.player.seekTo(parseFloat(e.target.value))
    }
    onDuration = (duration) => {
        console.log('onDuration', duration)
        this.setState({duration})
    }
    onProgress = state => {
        console.log('onProgress', state)
        // We only want to update time slider if we are not currently seeking
        if (!this.state.seeking) {
            this.setState(state)
        }
    }

    ref = player => {
        this.player = player
    }

    render() {
        const {musicurl, playing, volume, muted, loop, played, loaded, duration, playbackRate, programs} = this.state

        var text = this.state.liked ? '喜欢' : '不喜欢';
        const pgs = programs.map((program) =>
            <div>
                <h3 onClick={this.changeSong.bind(this, program)} key={program.name}>{program.name}
                    : {program.liveUrl}  </h3>
                <img style={{height: '100px', width: '100px'}}  src={program.imgPath}></img>
            </div>
        );
        return (

            <div className="mdd">
                <Layout>

                    <Sider style={{background: '#fff', margin: '20px'}}>
                        <div>
                            <Clock tsee="asdf"></Clock>
                            <ReactPlayer width='10%'
                                         height='10%'
                                         ref={this.ref}
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
                            <Input width='50px' type="number" onChange={this.handelChange} value={playbackRate}/>
                            <Input
                                type='range' min={0} max={1} step='any'
                                value={played}
                                onMouseDown={this.onSeekMouseDown}
                                onChange={this.onSeekChange}
                                onMouseUp={this.onSeekMouseUp}
                            />
                            <h3>load</h3>
                            <Progress type="circle" percent={Math.ceil(loaded * 100)}/>
                            <h3>Now</h3>
                            <Progress type="circle" percent={Math.ceil(played * 100)}/>
                            <h4>播放速度: {playbackRate}</h4>
                            <h4>musicurl: {musicurl}</h4>
                            <h4>loaded: {loaded}</h4>
                            <h4>duration: {Math.round(duration) / 60} 分</h4>
                        </div>
                    </Sider>
                    <Layout>
                        <Content style={{background: '#fff', margin: '20px'}}>
                            {pgs}
                        </Content>
                    </Layout>
                </Layout>
            </div>
        )
    }
}
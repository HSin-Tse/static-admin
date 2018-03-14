import React from 'react'
import {Component} from 'react'
import {createDevTools} from 'redux-devtools'
import DockMonitor from 'redux-devtools-dock-monitor'
import ReactJson from 'react-json-view'
import {autorun} from 'mobx';
import axios from 'axios';
import {observable, useStrict, action} from 'mobx';
import {observer} from 'mobx-react';
import {findDOMNode} from 'react-dom'
import screenfull from 'screenfull'
import {version} from '../../package.json'
import ReactPlayer from 'react-player'
import {Card, Button, Input, Progress, Layout} from 'antd';

import Duration from './Duration'

useStrict(true);

class MyState {
    @observable res = {
        aaa: "MyState",
    };
    @observable music = '';
    // @action addNum = () => {
    //     this.num++;
    // };
    @action set = (oo) => {
        this.res = oo
    };
    @action setMusic = (oo) => {
        this.music = oo
    };
}

export const newState = new MyState();
newState.set({ee: "eeee"});
window.ax = axios;

// 添加响应拦截器
window.ax.interceptors.response.use((response) => {
    newState.set(response);
    return response;
}, function (error) {
    return Promise.reject(error);
});


const MULTIPLE_SOURCES = [
    {src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4', type: 'video/mp4'},
    {src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.ogv', type: 'video/ogv'},
    {src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.webm', type: 'video/webm'}
]

@observer
class AjmdPlayer extends Component {

    state = {
        url: newState.music,
        playing: true,
        volume: 0.8,
        muted: false,
        played: 0,
        loaded: 0,
        duration: 0,
        playbackRate: 1.0,
        loop: false
    };
    load = url => {
        this.setState({
            url,
            played: 0,
            loaded: 0
        })
    };
    playPause = () => {
        this.setState({playing: !this.state.playing})
    }
    stop = () => {
        this.setState({url: null, playing: false})
    }
    toggleLoop = () => {
        this.setState({loop: !this.state.loop})
    }
    setVolume = e => {
        this.setState({volume: parseFloat(e.target.value)})
    }
    toggleMuted = () => {
        this.setState({muted: !this.state.muted})
    }
    setPlaybackRate = e => {
        this.setState({playbackRate: parseFloat(e.target.value)})
    }
    onPlay = () => {
        console.log('onPlay')
        this.setState({playing: true})
    }
    onPause = () => {
        console.log('onPause')
        this.setState({playing: false})
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
    onProgress = state => {
        console.log('onProgress', state)
        // We only want to update time slider if we are not currently seeking
        if (!this.state.seeking) {
            this.setState(state)
        }
    }
    onEnded = () => {
        console.log('onEnded')
        this.setState({playing: this.state.loop})
    }
    onDuration = (duration) => {
        console.log('onDuration', duration)
        this.setState({duration})
    }
    onClickFullscreen = () => {
        screenfull.request(findDOMNode(this.player))
    }
    renderLoadButton = (url, label) => {
        return (
            <button onClick={() => this.load(url)}>
                {label}
            </button>
        )
    }
    ref = player => {
        this.player = player
    }

    render() {
        const {url, playing, volume, muted, loop, played, loaded, duration, playbackRate} = this.state
        const SEPARATOR = ' · '

        return (
            <div className='app'>
                <section className='section'>
                    <h1>ReactPlayer Demo</h1>
                    <div className='player-wrapper'>
                        <ReactPlayer
                            ref={this.ref}
                            className='react-player'
                            width='1%'
                            height='1%'
                            url={newState.music}
                            playing={playing}
                            loop={loop}
                            playbackRate={playbackRate}
                            volume={volume}
                            muted={muted}
                            onReady={() => console.log('onReady')}
                            onStart={() => console.log('onStart')}
                            onPlay={this.onPlay}
                            onPause={this.onPause}
                            onBuffer={() => console.log('onBuffer')}
                            onSeek={e => console.log('onSeek', e)}
                            onEnded={this.onEnded}
                            onError={e => console.log('onError', e)}
                            onProgress={this.onProgress}
                            onDuration={this.onDuration}
                        />
                    </div>

                    <table>
                        <tbody>
                        <tr>
                            <th>Controls</th>
                            <td>
                                <Button onClick={this.stop}>Stop</Button>
                                <Button onClick={this.playPause}>{playing ? 'Pause' : 'Play'}</Button>
                                {/*<button onClick={this.onClickFullscreen}>Fullscreen</button>*/}
                                <Button onClick={this.setPlaybackRate} value={1}>1</Button>
                                <Button onClick={this.setPlaybackRate} value={1.5}>1.5</Button>
                                <Button onClick={this.setPlaybackRate} value={2}>2</Button>
                            </td>
                        </tr>
                        <tr>
                            <th>Seek</th>
                            <td>
                                <input
                                    type='range' min={0} max={1} step='any'
                                    value={played}
                                    onMouseDown={this.onSeekMouseDown}
                                    onChange={this.onSeekChange}
                                    onMouseUp={this.onSeekMouseUp}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>Volume</th>
                            <td>
                                <input type='range' min={0} max={1} step='any' value={volume}
                                       onChange={this.setVolume}/>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label htmlFor='muted'>Muted</label>
                            </th>
                            <td>
                                <input id='muted' type='checkbox' checked={muted} onChange={this.toggleMuted}/>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label htmlFor='loop'>Loop</label>
                            </th>
                            <td>
                                <input id='loop' type='checkbox' checked={loop} onChange={this.toggleLoop}/>
                            </td>
                        </tr>
                        <tr>
                            <th>Played</th>
                            <td>
                                <progress max={1} value={played}/>
                            </td>
                            <Progress type="circle" percent={Math.ceil(played * 100)}/>

                        </tr>
                        <tr>
                            <th>Loaded</th>
                            <td>
                                <progress max={1} value={loaded}/>
                            </td>
                            <Progress type="circle" percent={Math.ceil(loaded * 100)}/>

                        </tr>
                        </tbody>
                    </table>
                </section>
                <section className='section'>


                    <h2>播放器狀態</h2>

                    <table>
                        <tbody>
                        <tr>
                            <th>url</th>
                            <td className={!newState.music ? 'faded' : ''}>
                                {(newState.music instanceof Array ? 'Multiple' : newState.music) || 'null'}
                            </td>
                        </tr>
                        <tr>
                            <th>playing</th>
                            <td>{playing ? 'true' : 'false'}</td>
                        </tr>
                        <tr>
                            <th>播放速度</th>
                            <td>{playbackRate}</td>
                        </tr>
                        <tr>
                            <th>volume</th>
                            <td>{volume.toFixed(3)}</td>
                        </tr>
                        <tr>
                            <th>played</th>
                            <td>{played.toFixed(3)}</td>
                        </tr>
                        <tr>
                            <th>loaded</th>
                            <td>{loaded.toFixed(3)}</td>
                        </tr>
                        <tr>
                            <th>duration</th>
                            <td><Duration seconds={duration}/></td>
                        </tr>
                        <tr>
                            <th>elapsed</th>
                            <td><Duration seconds={duration * played}/></td>
                        </tr>
                        <tr>
                            <th>remaining</th>
                            <td><Duration seconds={duration * (1 - played)}/></td>
                        </tr>
                        </tbody>
                    </table>
                </section>
                {/*<footer className='footer'>*/}
                {/*Version <strong>{version}</strong>*/}
                {/*{SEPARATOR}*/}
                {/*<a href='https://github.com/CookPete/react-player'>GitHub</a>*/}
                {/*{SEPARATOR}*/}
                {/*<a href='https://www.npmjs.com/package/react-player'>npm</a>*/}
                {/*</footer>*/}
            </div>
        )
    }
}

@observer
class Tse extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            initName: {init: "init"},
            initArr: [0, 1],
            date: new Date()
        };

    };



    render() {
        return (
            <div>
                <h1>{this.state.date.toLocaleTimeString()}</h1>


                <div>
                    {/*<ReactJson src={newState.res}/>*/}

                    <AjmdPlayer ></AjmdPlayer>

                </div>

            </div>
        )
    }
}


export default createDevTools(
    <DockMonitor
        toggleVisibilityKey="ctrl-H"
        changePositionKey="ctrl-Q"
        changeMonitorKey="ctrl-M"
        defaultIsVisible={false}
    >
        <Tse defaultIsVisible={false}/>
    </DockMonitor>,
)


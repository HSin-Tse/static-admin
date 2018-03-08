import React from 'react';
import './index.less'
import axios from "axios";

import ReactPlayer from 'react-player'
import Clock from 'components/clock'
import {Card, Button, Input, Progress, Layout} from 'antd';

const {Meta} = Card;
const {Sider, Content} = Layout;
export default class Test extends React.Component {
    constructor(props) {
        super(props);
        console.log("tse constructor");
        this.state = {
            liked: false,
            playing: true,
            loaded: 0,
            per: 0,
            playbackRate: 1.0,
            // musicurl: 'http://rscdn.ajmide.com/c_250/250.m3u8',
            musicurl: null,
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



    componentDidMount() {


        // axios.get('http://a.ajmide.com/v7/get_play_list.php', {
        //     params: {
        //         id: 10062,
        //         t: 'p'
        //     }
        // }).then( (response) => {
        //     console.log(response);
        //     this.setState({
        //         musicurl: response.data.data[0].liveUrl
        //     });
        // }).catch(function (error) {
        //     console.log(error);
        // });


        const url = "http://s.ajmide.com/searchProgram.php?type=3&page=0&filter=0&value=动感101"

        axios.get(url).then((response) => {

            console.log('tse ok resr: ' + response);
            console.log('tse ok resr: ' + response.data);
            this.setState({
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
        if (!this.state.seeking) {
            this.setState(state)
        }
    }
    onClickTest = state => {
        console.log('tse onClickTest')
    };
    ref = player => {
        this.player = player
    }

    render() {
        const {musicurl, playing, volume, muted, loop, played, loaded, duration, playbackRate, programs} = this.state

        var text = this.state.liked ? '喜欢' : '不喜欢';
        const pgs = programs.map((program) =>
            <div key={program.imgPath}  style={{border: '1px solid grey'}}>
                <Card className="card-test"

                      onClick={this.changeSong.bind(this, program)}
                      hoverable
                      style={{width: 240, height: 400, margin: 4,}}
                      cover={<img style={{border: '1px solid grey', width: 240, height: 240, margin: 0}}
                                  src={program.imgPath}></img>}
                      title={program.name}
                ><Meta
                    description={program.intro}
                />

                </Card>
            </div>
        );
        return (

            <div>
                <Layout>

                    <Sider style={{background: '#fff', margin: '10px'}}>
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
                        <Content>

                            <div className="flex">
                                {pgs}
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        )
    }
}
import React from 'react';
import './index.less'
import {Card, Tabs} from 'antd';
import ILike from 'pages/ilike'
import Test from 'pages/test'

const {Meta} = Card;
const TabPane = Tabs.TabPane;
export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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


    componentDidMount() {

        const url = "http://s.ajmide.com/searchProgram.php?type=3&page=0&filter=0&value=动感101"

        window.ax.get(url).then((response) => {


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
            <div style={{border: '1px solid grey'}}>
                <Card className="card-test"

                      onClick={this.changeSong.bind(this, program)}
                      hoverable
                      style={{width: 240, height: 400, margin: 10,}}
                      cover={<img style={{border: '1px solid grey', width: 240, height: 240, margin: 0}}
                                  src={program.imgPath}/>}
                      title={program.name}
                ><Meta
                    description={program.intro}
                />
                </Card>
            </div>
        );
        return (
            <div>
                <Tabs defaultActiveKey="3">
                    <TabPane tab="我喜欢" key="1"><ILike/></TabPane>
                    <TabPane tab="节目" key="2"><Test/></TabPane>
                    <TabPane tab="节目" key="3"><Calculator/></TabPane>
                </Tabs>
            </div>
        )
    }
}
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}

const BoilingVerdict = (props) => {
    if (props.celsius >= 100) {
        return <p>水会烧开</p>;
    }
    return <p>水不会烧开</p>;
};


const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
};
function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}
class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onTemperatureChange(e.target.value);
    }

    render() {
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>在{scaleNames[scale]}:中输入温度数值</legend>
                <input value={temperature}
                       onChange={this.handleChange} />
            </fieldset>
        );
    }
}
class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        this.state = {temperature: '99', scale: 'c'};
    }

    handleCelsiusChange(temperature) {
        this.setState({scale: 'c', temperature});
    }

    handleFahrenheitChange(temperature) {
        this.setState({scale: 'f', temperature});
    }

    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

        return (
            <div>
                <TemperatureInput
                    scale="c"
                    temperature={celsius}
                    onTemperatureChange={this.handleCelsiusChange} />

                <TemperatureInput
                    scale="f"
                    temperature={fahrenheit}
                    onTemperatureChange={this.handleFahrenheitChange} />

                <BoilingVerdict
                    celsius={parseFloat(celsius)} />

            </div>
        );
    }
}
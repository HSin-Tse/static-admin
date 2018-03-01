import React from 'react';
// import style from './index.css'

export default class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <div>
                {/*<h1 className= "animated swing"  style={{ color: '#f0f' }}> {this.props.tsee}</h1>*/}
                <h1>{this.state.date.toLocaleTimeString()}</h1>
            </div>
        );
    }
}


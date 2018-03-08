import React from 'react'
import {createDevTools} from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import SliderMonitor from 'redux-slider-monitor';
import DockMonitor from 'redux-devtools-dock-monitor'
import ReactJson from 'react-json-view'
import axios from 'axios';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // Do something with response data
    console.log(response);
    window.ps = response;
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});


class Tseee extends React.Component {
    render() {
        return (
            <div>

                <div>tsetsetsteee。</div>
            </div>
        )
    }
}

class NotesList extends React.Component {
    render() {
        return (
            <div>
                <ol>
                    {
                        this.props.children.map(function (child) {
                            return <li>{child}</li>
                        })
                    }
                </ol>
                <div>计划在本项目中，把平时工作、学习中遇到的事抽象成demo给展现出来。其实这套界面风格不仅仅可以作为后台管理系统，也可以修改成一个美观的博客。</div>
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
        {/*<LogMonitor />*/}
        {/*<SliderMonitor />*/}
        {/*<ReactJson src={window.ps} />*/}
        {/*<NotesList>*/}
            {/*<span>hello</span>*/}
            {/*<span>world</span>*/}
            {/*<h1>dd</h1>*/}

        {/*</NotesList>*/}
        <Tseee defaultIsVisible={false}/>
    </DockMonitor>,
)

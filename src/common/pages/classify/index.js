import React from 'react';
// import axios from "axios";
import ReactJson from 'react-json-view'
import {newState} from "../../../client/netdevTools";

import {Carousel, Button} from 'antd';
import {observer} from "mobx-react/index";
import axios from "axios/index";
import {List, Avatar} from 'antd';
import {Row, Col} from 'antd';
// http://a.ajmide.com/v7/get_play_list.php?id=10062&t=p
@observer export default class Classify extends React.Component {

    constructor(props) {
        super(props);
        // this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);

        this.state = {
            gallery: null,
            res: '',
            programsLike: {tse: "ss"},
            RollList: [],
            rankingList: [],
            bocaiShow: [],
            localShow: [],
            programList: [],
            liveShow: [],
        };
    }

    componentDidMount() {

        // const url = "http://a.ajmide.com/v16/ListFeed.php?login_status=0&fav_ids=&count=20&offset=60&fav_ids_top="
        const url = "http://a.ajmide.com/getProgramClassify.php";

        window.ax.get(url).then((response) => {


            this.setState({
                programsLike: response.data.data,
                // RollList: response.data.data.RollList,
            });

        }).catch(function (error) {
            console.log('tse resr: ' + String(error));
            programsLike: String(error)

        });

    }


    playProgram = (pid) => {

        axios.get('http://a.ajmide.com/v7/get_play_list.php', {
            params: {
                id: pid,
                t: 'p'
            }
        }).then((response) => {
            console.log(response);
            newState.setMusic(response.data.data[0].liveUrl)

        }).catch(function (error) {
            console.log(error);
        });

    };
    testClick = (pid) => {

        console.log('tse:' + pid);


    };


    render() {

        const {programsLike, res, RollList} = this.state;
        const rollist = RollList.map((roll) =>
            <div key={roll.imgPath}>
                <img key={roll.imgPath}
                     style={{
                         margin: 'auto',
                         border: '1px solid yellow',
                         width: '600px',
                         height: 'auto',
                         alt: roll.imgPath
                     }}
                     src={roll.imgPath}/>
            </div>
        );

        return (
            <div>
                <div>
                    <Row>
                        <Col span={12} style={{ background:"red"}}>
                            <h1 style={{ background:"yellow",height:1000}}
                        >www</h1></Col>
                        <Col span={12}>col-12</Col>
                    </Row>
                    <Row>
                        <Col span={8}>col-8</Col>
                        <Col span={8}>col-8</Col>
                        <Col span={8}>col-8</Col>
                    </Row>
                    <Row>
                        <Col span={6}>col-6</Col>
                        <Col span={6}>col-6</Col>
                        <Col span={6}>col-6</Col>
                        <Col span={6}>col-6</Col>
                    </Row>
                    <Row>
                        <Col span={2}
                             height="30px"
                        >
                            <List
                                height={"30px"}
                                itemLayout="horizontal"
                                dataSource={programsLike.classify}
                                renderItem={(item, index) => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar src={item.imgPath}/>}
                                            title={<a href="https://ant.design">{item.name}</a>}
                                            description={index}
                                        />
                                    </List.Item>
                                )}
                            /></Col>
                        <Col span={6}>col-6</Col>
                        <Col span={6}>col-6</Col>
                        <Col span={6}>c</Col>
                    </Row>
                </div>
                <Button onClick={this.playProgram.bind(this, '10024')}>Test PlayPid</Button>
                <Button onClick={this.testClick.bind(this, '10024')}>Test</Button>

                <ReactJson src={programsLike}/>
            </div>
        )
    }
}




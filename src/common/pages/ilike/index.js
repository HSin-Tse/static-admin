import React from 'react';
import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';
import './index.less'
import axios from "axios";
import {Carousel} from 'antd';
// http://a.ajmide.com/v7/get_play_list.php?id=10062&t=p
export default class Ilike extends React.Component {
    state = {
        gallery: null,
        res: '',
        programslike: "ddd123",
        RollList: [],
        rankingList: [],
        bocaiShow: [],
        localShow: [],
        programList: [],
        liveShow: [],
    };

    componentDidMount() {

        // axios.get('http://a.ajmide.com/v7/get_play_list.php', {
        //     params: {
        //         id: 10062,
        //         t: 'p'
        //     }
        // }).then( (response) => {
        //     console.log(response);
        //         this.setState({
        //             // programslike:'sss'
        //             programslike: JSON.stringify(response),
        //             // RollList: response.data.data.RollList,
        //         });
        // }).catch(function (error) {
        //     console.log(error);
        // });


        // const url = "http://a.ajmide.com/v16/ListFeed.php?login_status=0&fav_ids=&count=20&offset=60&fav_ids_top="
        const url = "http://a.ajmide.com/v14/getMainProgram.php";

        // axios.get(url).then((response) => {
        //
        //     console.log('tse ok resr: ' + response);
        //     console.log('tse ok resr: ' + response.data);
        //
        //     this.setState({
        //         programslike: JSON.stringify(response.data.data),
        //         RollList: response.data.data.RollList,
        //     });
        //
        // }).catch(function (error) {
        //     console.log('tse resr: ' + String(error));
        //     programslike: String(error)
        //
        // });


    }

    onChange(a, b, c) {
        console.log(a, b, c);
    }

    render() {

        const {programslike, res, RollList} = this.state;
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
        const banners = [
            {id: 1, image: 'http://upload.ajmide.com/p/image/201705/07/zhuanti-1D7f9m_1080x519.jpg'},
            {id: 2, image: 'http://upload.ajmide.com/p/image/201705/07/zhuanti-1D7f9m_1080x519.jpg'},
        ];

        const bannerView = (
            <Carousel autoplay>
                {banners.map(item => (
                    <span key={item.id}>
                        <img
                            style={{margin: 'auto', border: '1px solid yellow', width: '600px', height: 'auto'}}

                            src={item.image}
                            key={item.id}
                            alt={item.image}
                            width='600px'
                            height='auto'
                            margin='auto'
                            border='1px solid yellow'/>
                    </span>
                ))}
            </Carousel>);
        return (
            <div>
                {/*{bannerView}*/}

                <Carousel autoplay>
                    {rollist}
                </Carousel>
                <h2>{programslike}</h2>

            </div>
        )
    }
}



import React from 'react';
import './index.less'

export default class APP extends React.Component {

    render() {

        return (
            <div className="mdd"   >
                <iframe className="markdown" src="https://tse-ting.herokuapp.com"></iframe>

            </div>
        )
    }
}
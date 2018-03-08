import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import routes from '../common/routes';
import axios from 'axios';
import './index.less';
import DevTools from './devTools'
import NetDevTools from './netdevTools'
import configureStore from './store/configureStore'
import {ConnectedRouter} from 'react-router-redux'
import createHistory from 'history/createHashHistory'

const history = createHistory()

const store = configureStore()


ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                {routes}
                {/*{process.env.NODE_ENV === 'development' ? <DevTools /> : ''}*/}
                {/*{process.env.NODE_ENV === 'development' ? <NetDevTools/> : ''}*/}


            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
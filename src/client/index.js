import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import routes from '../common/routes';
import './index.less';
import configureStore from './store/configureStore'
import {ConnectedRouter} from 'react-router-redux'
import createHistory from 'history/createHashHistory'
import NetDevTools from './netdevTools'
// import ReactDOMServer from 'react-dom/server';
import {renderToString} from 'react-dom/server';

const history = createHistory()
const store = configureStore()

// var html = ReactDOMServer.renderToString(
//     <Provider store={store}>
//         <ConnectedRouter history={history}>
//             <div>
//                 {routes}
//                 {process.env.NODE_ENV === 'development' ? <NetDevTools/> : ''}
//
//
//             </div>
//         </ConnectedRouter>
//     </Provider>
// );
// ReactDOM.render(
//   html,
//     document.getElementById('root')
// );
export var  html=    <Provider store={store}>
    <ConnectedRouter history={history}>
        <div>
            {routes}
            {process.env.NODE_ENV === 'development' ? <NetDevTools/> : ''}


        </div>
    </ConnectedRouter>
</Provider>
ReactDOM.render(
    html,
    document.getElementById('root')
);
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import 'antd-mobile/dist/antd-mobile.css';
import VideoPlay from "./js/videoDisplay";
import './css/mobile.css';
import {BrowserRouter, Route} from 'react-router-dom';
import CallBackDetail from './js/recallDetail';
import MaintenanceDetail from "./js/maintenanceDetail";
import Consultancy from "./js/consultancy";
import MainLayout from "./js/tabBar";
import CollectReecord from "./js/collectRecord";
import Record from "./js/record";
import SearchResult from "./js/searchResult";

class Root extends React.Component {
    render() {
        const projectName = "weiXin";
        return (
            <BrowserRouter>
                <div id="container" style={{position: 'fixed', right: 0,top: 0, left: 0, bottom: 0}}>
                    <Route path={`/${projectName}`} component={MainLayout} />
                    <Route path={`/${projectName}/maintenance/maintenanceDetail/:cid`} component={MaintenanceDetail} />
                    <Route path={`/${projectName}/video/videoPlay/:vid`} component={VideoPlay} />
                    <Route path={`/${projectName}/video/videoPlay/:vid/consultancy`} component={Consultancy} />
                    <Route path={`/${projectName}/recall/recallDetail/:rid`} component={CallBackDetail} />
                    <Route path={`/${projectName}/my/collectRecord`} component={CollectReecord} />
                    <Route path={`/${projectName}/my/record`} component={Record} />
                    <Route path={`/${projectName}/video/searchResult/:event`} component={SearchResult} />
                </div>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<Root/>, document.getElementById('root'));
registerServiceWorker();

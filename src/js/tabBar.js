import {TabBar} from 'antd-mobile';
import React from 'react';
import VideoTab from './videoTab';
import Maintenance from './maintenance';
import Recall from "./recall";
import UserCenter from './userCenter';
import '../css/mobile.css';
import {Route, Switch} from 'react-router-dom';

export default class MainLayout extends React.Component {
    render() {
        const navList = [
            {
                path: 'video',
                text: '视频',
                title: 'video',
                component: VideoTab,
                icon: 'video'
            },
            {
                path: 'maintenance',
                text: '保养',
                title: 'maintenance',
                component: Maintenance,
                icon: 'maintenance'
            },
            {
                path: 'recall',
                text: '召回',
                title: 'recall',
                component: Recall,
                icon: 'recall'
            },
            {
                path: 'my',
                text: '我',
                title: 'my',
                component: UserCenter,
                icon: 'my'
            },
        ];
        const {pathname} = this.props.location;

        return(
                <TabBar
                    barTintColor="#fcfcfc"
                    tintColor="#46bf18"
                    unSelectedTintColor="#9a9a9a"
                >
                    {navList.map(tabBarItem => (
                        <TabBar.Item
                            key={tabBarItem.path}
                            title={tabBarItem.text}
                            icon={{uri: `https://www.eyeauto.cn/images/${tabBarItem.icon}.png`}}
                            selectedIcon={{uri: `https://www.eyeauto.cn/images/${tabBarItem.icon}-active.png`}}
                            selected={pathname === `/weiXin/${tabBarItem.path}`}
                            onPress={() => {
                                this.setState({
                                    selectedTab: `${tabBarItem.title}`
                                });

                                this.props.history.push(`/weiXin/${tabBarItem.path}`)
                            }}

                        >
                            <div>
                                <Switch>
                                    <Route key={tabBarItem.path} path={`/weiXin/${tabBarItem.path}`} component={tabBarItem.component} />
                                </Switch>
                            </div>
                        </TabBar.Item>
                    ))}
                </TabBar>
        )
    }

};


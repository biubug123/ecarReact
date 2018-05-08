import React from 'react';
import {SearchBar, Tabs} from 'antd-mobile';
import Demo from './test';


export default class VideoTab extends React.Component {

    constructor() {
        super();
        this.state = {
            type: '',
            videos: '',
        }
    }

    handleClick(event) {
        this.props.history.push(`/weiXin/video/searchResult/${event}`)
    }


    render() {

        const tabs = [
            {
                title: '所有视频'
            },
            {
                title: '应急处理'
            },
            {
                title: '功能介绍'
            },
            {
                title: '娱乐生活'
            },
            {
                title: '户外活动'
            }
        ];


        const TabExample = () => (
            <Tabs tabs={tabs}
                  renderTabBar={props => <Tabs.DefaultTabBar{...props} page={3} />}
                  initialPage={0}
                  onChange={(tab, index) => {
                      console.log('onChange', index, tab);
                  }}
                  onTabClick={(tab, index) => {
                      console.log('onClick', index, tab);
                  }}
                  tabBarBackgroundColor='#373b3e'
                  tabBarActiveTextColor='#28b74a'
                  tabBarInactiveTextColor='#FFFFFF'
            >
                <div style={{backgroundColor: '#f4f4f6'}}>
                    <SearchBar
                        placeholder=""
                        maxLength={17}
                        onSubmit={this.handleClick.bind(this)}
                    />
                    <Demo type={"0"} history={this.props.history} />
                </div>

                <div style={{backgroundColor: '#f4f4f6'}}>
                    <SearchBar
                        placeholder="内容关键字"
                        maxLength={17}
                        onSubmit={this.handleClick.bind(this)}
                    />
                    <Demo type={"1"} history={this.props.history} />
                </div>
                <div style={{backgroundColor: '#f4f4f6'}}>
                    <SearchBar
                        placeholder="内容关键字"
                        maxLength={17}
                        onSubmit={this.handleClick.bind(this)}
                    />
                    <Demo type={"2"} history={this.props.history} />
                </div>
                <div style={{backgroundColor: '#f4f4f6'}}>
                    <SearchBar
                        placeholder="内容关键字"
                        maxLength={17}
                        onSubmit={this.handleClick.bind(this)}
                    />
                    <Demo type={"3"} history={this.props.history} />
                </div>
                <div style={{backgroundColor: '#f4f4f6'}}>
                    <SearchBar
                        placeholder="内容关键字"
                        maxLength={17}
                        onSubmit={this.handleClick.bind(this)}
                    />
                    <Demo type={"4"} history={this.props.history} />
                </div>
            </Tabs>
        )
        return (
            <TabExample/>
        )
    }
}
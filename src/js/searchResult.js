import React from 'react';
import {Icon} from 'antd-mobile';
import moment from 'moment';
import '../css/mobile.css';


export default class SearchResult extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            videos: ''
        }
    }


    componentDidMount() {
        fetch(`https://www.eyeauto.cn/HelloSpringBoot/listVideosByKeyWord?&keyword=${this.props.match.params.event}`, {method: 'GET'})
            .then(response => response.json())
            .then(data =>{
                this.setState({videos: data});
            });
        console.log(this.state.videos);
    }

    handleClick = (vid, event) =>{
        this.props.history.push(`/weiXin/video/videoPlay/${vid}`);
    };

    render() {
        const {videos} = this.state;
        const searchResult = videos.length > 0 ?
            videos.map((item, index) => (
                <div key={index} style={{width:'100%',margin: '0 15px' }}  onClick={this.handleClick.bind(this, item&&item.vid)}>

                    <div style={{  display: 'flex', margin: '15px 0px', height: '90px', borderBottom: '1px solid #e0e0e0'}}>

                        <img alt="logo" style={{ height: '64px', marginRight: '15px' }} src={require("../images/test.jpg")}  />
                        <div>
                            <div style={{marginTop: '13px', fontSize: '16px'}}>{item&&item.fileName}  </div>
                            <div style={{marginTop: '10px', color: '#808080'}}>{moment(item&&item.publishDate).format("YYYY-MM-DD HH:mm:ss")}</div>
                        </div>
                        <div style={{width: '150px', position: 'absolute', left:'230px', height: '80px'}}>
                            <div style={{ position: 'absolute', left: '100px', top: '20px'}}>
                                <Icon type="right" style={{width: '30px', height: '30px'}} />
                            </div>
                        </div>
                    </div>
                </div>
            ))
            :
            <div></div>
        ;
        return (
            <div className="component" style={{zIndex: 4}}>
                <div style={{borderBottom: '1px solid #e0e0e0', height: '40px', lineHeight: '40px', width: '90%', margin: 'auto'}}><span>搜索结果</span></div>
                {searchResult}
            </div>
        )
    }
}
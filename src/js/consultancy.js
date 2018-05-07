import React from 'react';
import '../css/button.css';
import {Toast} from 'antd-mobile';
import '../css/mobile.css';
import {Link} from 'react-router-dom';

export default class Consultancy extends React.Component {
    handleClick(e) {
        var myFetchOptions = {
            method: 'GET'
        };
        let questionTitle = document.getElementById("questionTitle").value;
        let questionContent = document.getElementById("questionWord").value;


        fetch(`https://www.eyeauto.cn/HelloSpringBoot/insertConsult?userPhone=${localStorage.userPhone}
        &title=${questionTitle}&content=${questionContent}&vid=${this.props.match.params.vid}`, myFetchOptions)
            .then(response => response.json())
            .then(json => {
                Toast.success('提交成功,等待审核', 1)
            });
        this.props.history.push(`/weiXin//Video/videoPlay/${this.props.match.params.vid}`);
    }

    toVideo = () => {
        this.props.history.push(`/weiXin//Video/videoPlay/${this.props.match.params.vid}`);
    }

    render() {
        return (
            <div>
                <div className="topOpacity" style={{zIndex: 2}} />
                <div style={{zIndex: 2}} className="opacityDiv">
                    <div style={{
                        height: '36px',
                        lineHeight: '36px',
                        fontWeight: '560',

                    }}>
                        <div style={{float: 'left', marginLeft: '15px', marginTop: '5px'}}>
                            <Link to={`/weiXin//Video/videoPlay/${this.props.match.params.uuid}`}>取消</Link>
                        </div>
                        <div style={{float: 'right', marginRight: '15px', marginTop: '5px'}}>
                            <div onClick={this.handleClick.bind(this)}>发送</div>
                        </div>
                    </div>
                    <div>
                        <form style={{marginTop: '20px', textAlign: 'center'}}>
                            <div style={{fontWeight: '560', width: '100%'}}>
                                <input type="text" placeholder="问题标题" id="questionTitle" style={{
                                    border: '1.2px solid white',
                                    height: '25px',
                                    width: '85%',
                                    borderRadius: '0.3em',
                                    backgroundColor: '#eeeeee',
                                    padding: '8px 0px'
                                }}/>
                            </div>
                            <div style={{fontWeight: '560', width: '100%', paddingTop: '6%'}}>
                                <textarea placeholder="问题详情" id="questionWord" style={{
                                    border: '1.2px solid white',
                                    height: '110px',
                                    width: '85%',
                                    borderRadius: '0.3em',
                                    backgroundColor: '#eeeeee'
                                }}/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
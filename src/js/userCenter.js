import React from 'react';
import {Button, Card, Icon, InputItem, List, Modal, Toast} from 'antd-mobile';
import '../css/mobile.css';
import {Link} from 'react-router-dom';
import Login from "./login";


const Item = List.Item;
export default class UserCenter extends React.Component {
    constructor() {
        super();
        this.state = {
            modalVisible: false,
            hasLogined: false,
            openId: '',

        };
    };



    loginModal = () => {
        this.setState({modalVisible: true});
    };

    getCookie(name) {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }

    render() {
        const userShow = localStorage.hasLogined ==  undefined ?
            <div style={{ background: `-webkit-linear-gradient(#535757, #ddd)`, height: '30%', position: 'fixed', top: 0, width: '100%',zIndex: 4}}>
                <div style={{textAlign: 'center', marginTop: '5%'}}>
                    <img alt="logo" src={(`https://www.eyeauto.cn/images/美女.jpg`)} style={{borderRadius: '100%', width: '25%'}} />
                </div>
                <div style={{textAlign: 'center', paddingTop: '5%'}} onClick={this.loginModal}>
                    未登录
                </div>
                <Login visible={this.state.modalVisible}/>
            </div>
            :
            <div style={{ background: `-webkit-linear-gradient(#535757, #ddd)`, height: '30%',position: 'fixed', top: 0, width: '100%',zIndex: 4}}>
                <div style={{textAlign: 'center', marginTop: '5%'}}>
                    <img src={this.getCookie("headImgUrl")} style={{borderRadius: '100%', width: '25%'}} />
                </div>
                <div style={{textAlign: 'center', paddingTop: '5%'}}>
                    {this.getCookie("nickName")}
                </div>
            </div>
        ;

        return (
            <List>
                {userShow}
                <div style={{position: 'fixed', top: '30%',  height: '61%', width: '100%', overflow: 'scroll'}}>
                    <Item arrow="horizontal" onClick={() => {}} style={{height: '50px'}}>
                        <div>
                            <div style={{float: 'left'}}>
                                <img alt="logo" src={('https://www.eyeauto.cn/images/捐助记录1_1.png')}
                                     style={{width: '25px', height: '25px'}}/>
                            </div>
                            <div className="userCenterWord">
                                捐助记录
                            </div>
                        </div>
                    </Item>

                    <Item arrow="horizontal" onClick={ () => {this.props.history.push(`/weiXin/my/collectRecord`)}} style={{height: '50px'}}>
                        <div>
                            <div style={{float: 'left'}}>
                                <img alt="logo" src={('https://www.eyeauto.cn/images/我的收藏2.png')}
                                     style={{width: '25px', height: '25px'}}/>
                            </div>
                            <div className="userCenterWord">
                                我的收藏
                            </div>
                        </div>
                    </Item>

                    <Item arrow="horizontal" onClick={ () => {this.props.history.push(`/weiXin/my/record`)}} style={{height: '50px'}}>
                        <div>
                            <div style={{float: 'left'}}>
                                <img alt="logo" src={('https://www.eyeauto.cn/images/点播记录3_1.png')}
                                     style={{width: '25px', height: '25px'}}/>
                            </div>
                            <div className="userCenterWord">
                                点播记录
                            </div>
                        </div>
                    </Item>

                    <Item arrow="horizontal" onClick={() => {}} style={{height: '50px'}}>
                        <div>
                            <div style={{float: 'left'}}>
                                <img alt="logo" src={('https://www.eyeauto.cn/images/提问记录1.png')}
                                     style={{width: '25px', height: '25px'}}/>
                            </div>
                            <div className="userCenterWord">
                                我的提问
                            </div>
                        </div>
                    </Item>

                <Item arrow="horizontal" onClick={ () => {}} style={{height: '50px'}}>
                    <div>
                        <div style={{float: 'left'}}>
                            <img alt="logo" src={('https://www.eyeauto.cn/images/汽车档案.png')}
                                 style={{width: '25px', height: '25px'}}/>
                        </div>
                        <div className="userCenterWord">
                            汽车档案
                        </div>
                    </div>
                </Item>

                <Item arrow="horizontal" onClick={ () => {}} style={{height: '50px'}}>
                    <div>
                        <div style={{float: 'left'}}>
                            <img alt="logo" src={('https://www.eyeauto.cn/images/设置.png')} style={{width: '25px', height: '25px'}}/>
                        </div>
                        <div className="userCenterWord">
                            账户设置
                        </div>
                    </div>
                </Item>

                    <Item arrow="horizontal" onClick={ () => {}} style={{height: '50px'}}>
                        <div>
                            <div style={{float: 'left'}}>
                                <img alt="logo" src={('https://www.eyeauto.cn/images/捐助记录1_1.png')}
                                     style={{width: '25px', height: '25px'}}/>
                            </div>
                            <div className="userCenterWord">
                                通用设置
                            </div>
                        </div>
                    </Item>

                </div>
            </List>
        )
    }
}
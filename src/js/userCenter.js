import React from 'react';
import {Button, Card, Icon, InputItem, List, Modal, Toast} from 'antd-mobile';
import '../css/mobile.css';
import {Link} from 'react-router-dom';
import Login from "./login";

function Trim(str)
{
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

export default class UserCenter extends React.Component {
    constructor() {
        super();
        this.state = {
            modalVisible: false,
            hasLogined: false,
            openId: '',

        };
    };

    onClose = key => () => {

    };

    componentWillMount() {
        if (localStorage.userPhone !== '') {
            this.setState({hasLogined: true});
            this.setState({openId: localStorage.openId});
        }
    }

    loginModal = () => {

        this.setState({modalVisible: true});
    };

    render() {
        const userShow = localStorage.userPhone == '' ?
            <div style={{ background: `-webkit-linear-gradient(#535757, #ddd)`,position: 'fixed', top: 0, width: '100%',zIndex: 4}}>
                <div style={{textAlign: 'center', marginTop: '5%'}}>
                    <img alt="logo" src={(`https://www.eyeauto.cn/images/美女.jpg`)} style={{borderRadius: '100%', width: '25%'}} />
                </div>
                <div style={{textAlign: 'center', paddingTop: '5%'}} onClick={this.loginModal}>
                    未认证
                </div>
                <Login visible={this.state.modalVisible}/>
            </div>

            :
            <div style={{ background: `-webkit-linear-gradient(#535757, #ddd)`, height: '30%',position: 'fixed', top: 0, width: '100%',zIndex: 4}}>
                <div style={{textAlign: 'center', marginTop: '5%'}}>
                    <img src={`https://www.eyeauto.cn/images/美女.jpg`} style={{borderRadius: '100%', width: '25%'}} />
                </div>
                <div style={{textAlign: 'center', paddingTop: '5%'}}>
                    用户名
                </div>
            </div>
        ;

        return (
            <List>
                {userShow}
                <div style={{position: 'fixed', top: '30%',  height: '61%', width: '100%', overflow: 'scroll'}}>
                    <Card.Body style={{height: '50px', backgroundColor: 'white'}}>
                        <div>
                            <div style={{float: 'left'}}>
                                <img alt="logo" src={('https://www.eyeauto.cn/images/捐助记录1_1.png')}
                                     style={{width: '25px', height: '25px'}}/>
                            </div>
                            <div className="userCenterWord">
                                捐助记录
                            </div>
                            <div style={{float: 'right'}}>
                                <Icon type="right" color={'#959595'}/>
                            </div>
                        </div>
                    </Card.Body>

                <Card.Body style={{height: '50px'}}>
                    <Link to={`/weiXin/my/collectRecord`}>
                    <div>
                        <div style={{float: 'left'}}>
                            <img alt="logo" src={('https://www.eyeauto.cn/images/我的收藏2.png')}
                                 style={{width: '25px', height: '25px'}}/>
                        </div>
                        <div className="userCenterWord">
                            我的收藏
                        </div>
                        <div style={{float: 'right' }}>
                            <Icon type="right" color={'#959595'}/>
                        </div>
                    </div>
                    </Link>
                </Card.Body>
                <Card.Body style={{height: '50px'}}>
                    <Link to={`/weiXin/my/record`}>
                    <div>
                        <div style={{float: 'left'}}>
                            <img alt="logo" src={('https://www.eyeauto.cn/images/点播记录3_1.png')}
                                 style={{width: '25px', height: '25px'}}/>
                        </div>
                        <div className="userCenterWord">
                            点播记录
                        </div>
                        <div style={{float: 'right'}}>
                            <Icon type="right" color={'#959595'}/>
                        </div>
                    </div>
                    </Link>
                </Card.Body>

                <Card.Body style={{height: '50px'}}>
                    <div>
                        <div style={{float: 'left'}}>
                            <img alt="logo" src={('https://www.eyeauto.cn/images/提问记录1.png')}
                                 style={{width: '25px', height: '25px'}}/>
                        </div>
                        <div className="userCenterWord">
                            我的提问
                        </div>
                        <div style={{float: 'right'}}>
                            <Icon type="right" color={'#959595'}/>
                        </div>
                    </div>
                </Card.Body>
                <Card.Body style={{height: '50px'}}>
                    <div>
                        <div style={{float: 'left'}}>
                            <img alt="logo" src={('https://www.eyeauto.cn/images/汽车档案.png')}
                                 style={{width: '25px', height: '25px'}}/>
                        </div>
                        <div className="userCenterWord">
                            汽车档案
                        </div>
                        <div style={{float: 'right'}}>
                            <Icon type="right" color={'#959595'}/>
                        </div>
                    </div>
                </Card.Body>
                <Card.Body style={{height: '50px'}}>
                    <div>
                        <div style={{float: 'left'}}>
                            <img alt="logo" src={('https://www.eyeauto.cn/images/设置.png')} style={{width: '25px', height: '25px'}}/>
                        </div>
                        <div className="userCenterWord">
                            账户设置
                        </div>
                        <div style={{float: 'right'}}>
                            <Icon type="right" color={'#959595'}/>
                        </div>
                    </div>
                </Card.Body>

                    <Card.Body style={{height: '50px', backgroundColor: 'white'}}>
                        <div>
                            <div style={{float: 'left'}}>
                                <img alt="logo" src={('https://www.eyeauto.cn/images/捐助记录1_1.png')}
                                     style={{width: '25px', height: '25px'}}/>
                            </div>
                            <div className="userCenterWord">
                                通用设置
                            </div>
                            <div style={{float: 'right'}}>
                                <Icon type="right" color={'#959595'}/>
                            </div>
                        </div>
                    </Card.Body>
                </div>
            </List>
        )
    }
}
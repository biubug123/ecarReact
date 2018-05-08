import React from 'react';
import {Button, Card, Icon, InputItem, List, Modal, Toast} from 'antd-mobile';
import '../css/mobile.css';


export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: '',
            openId: '',
            hasError: '',
            value: '',
            smscode: '',
            checkResult: '',
            getSmscode: '',
            isExisit: '',
            password: ''
        };
    }

    componentWillMount() {
        fetch(`http://localhost:8080/getUserIsExist?openId=${this.getCookie("openId")}`, {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                this.setState({isExisit: data})
            });

    }



    onErrorClick = () => {
        if (this.state.hasError) {
            Toast.info('请输入11位数字');
        }
    };
    onChange = (value) => {
        if (value.replace(/\s/g, '').length < 11) {
            this.setState({
                hasError: true,
            });
        } else {
            this.setState({
                hasError: false,
            });
        }

        this.setState({
            value,
        });
    };

    smsChange = (smscode) => {
        this.setState({
            smscode,
        })
    };

    loginChange = (password) => {
        this.setState({
            password,
        })
    };


    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    };

    componentWillReceiveProps() {
        this.setState({modalVisible: this.props.visible});
    }

    getCookie(name)
    {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }

    // 发送验证码
    getSms = () => {
        const {value} = this.state;
        fetch(`https://www.eyeauto.cn/HelloSpringBoot/sendSmsCodeByPhone?phone=${value}`, {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                this.setState({getSmscode: data});
            });
        if(this.state.getSmscode === true) {
            Toast.success("发送成功");
        }
    };


    handleClick = () => {
        let phone = this.state.value.replace(/\s+/g,"");
        let smscode = this.state.smscode;
        fetch(`https://www.eyeauto.cn/HelloSpringBoot/getSmscodeByPhone?phone=${phone}&code=${smscode}`, {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                this.setState({checkResult: data}, () => {
                    if(this.state.checkResult === false) {
                        Toast.fail("验证失败");
                    } else {
                        //验证成功，将用户绑定至表中
                        fetch(`http://localhost:8080/insertUser?userPhone=${phone}&openId=${this.getCookie("openId")}`, {method: 'post'});
                        this.setState({modalVisible: false}, () => {
                            Toast.success("验证成功");
                            localStorage.hasLogined = true;
                            localStorage.userPhone = phone;
                        })
                    }
                });
            });
    };

    login =() => {
        let phone = this.state.value.replace(/\s+/g,"");
        let password = this.state.password;
        fetch(`http://localhost:8080/getUser?userPhone=${phone}&password=${password}`, {method: 'POST'})
            .then(response => response.json())
            .then(data => {
                if(data !== false) {
                    Toast.success("登录成功");
                    localStorage.hasLogined = true;
                    localStorage.userPhone = phone;
                    this.setState({modalVisible: false});
                } else {
                    Toast.fail("手机号或密码错误");
                }
            })
    };

    render() {
        const loginOrRegister = this.state.isExisit == false ?
            <Modal
            visible={this.state.modalVisible}
            onClose={this.onClose('modalVisible')}
            transparent={true}
            title={"用户手机绑定"}
            animationType="slide-up"
        >
            <form>
                <InputItem
                    type="phone"
                    placeholder="你的号码"
                    error={this.state.hasError}
                    onErrorClick={this.onErrorClick}
                    onChange={this.onChange}
                    value={this.state.value}
                >手机号码</InputItem>
                <InputItem
                    placeholder="验证码"
                    onChange={this.smsChange}
                    value={this.state.smscode}
                    onErrorClick={this.onErrorClick}
                >验证码</InputItem>
                <Button onClick={this.getSms.bind(this)} style={{fontSize: '12px', width: '80px', float: 'right'}}>获取验证码</Button>
                <Button style={{fontSize: '12px', width: '80px', float: 'left'}} onClick={this.handleClick}>提交</Button>
            </form>
        </Modal>

        :
        <Modal
            visible={this.state.modalVisible}
            onClose={this.onClose('modalVisible')}
            transparent={true}
            title={"登录"}
            animationType="slide-up"
        >
            <form>
                <InputItem
                    type="phone"
                    placeholder="你的号码"
                    error={this.state.hasError}
                    onErrorClick={this.onErrorClick}
                    onChange={this.onChange}
                    value={this.state.value}
                >手机号码</InputItem>

                <InputItem
                    type="password"
                    placeholder="密码"
                    onChange={this.loginChange}
                    value={this.state.password}
                    onErrorClick={this.onErrorClick}
                >密码</InputItem>
                <Button style={{fontSize: '12px', width: '80px', margin: 'auto'}} onClick={this.login}>登录</Button>
            </form>
        </Modal>
        ;
        return (
            <div>
                {loginOrRegister}
            </div>
        )
    }
}
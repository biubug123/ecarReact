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
        };
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


    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    };

    componentWillReceiveProps() {
        this.setState({modalVisible: this.props.visible});
    }

    // 发送验证码
    getSms = () => {
        const {value} = this.state;
        console.log(value);
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
        let phone = this.state.value;
        let smscode = this.state.smscode;
        fetch(`https://www.eyeauto.cn/HelloSpringBoot/getSmscodeByPhone?phone=${phone}&code=${smscode}`, {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                this.setState({checkResult: data}, () => {
                    if(this.state.checkResult === false) {
                        console.log(this.state.checkResult);
                        Toast.fail("验证失败");
                    } else {
                        localStorage.userPhone = phone;
                        Toast.success("验证成功");
                        //验证成功，将用户绑定至表中
                        this.setState({modalVisible: false})
                    }
                });
            });

    };

    render() {
        return (
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
        )
    }
}
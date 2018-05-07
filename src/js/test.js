import React from 'react';
import {Icon, Modal, Toast} from 'antd-mobile';
import moment from 'moment';


export default class Demo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            height: document.documentElement.clientHeight * 3 / 4,
            favourite: '',
            data: ''
        };
    }

    componentDidMount() {
        if(this.props.type == ""){
            fetch("http://localhost:8080/listVideo", {method: 'GET'})
                .then(response => response.json())  
                .then(json => ())
         else {
            fetch(`https://www.eyeauto.cn/HelloSpringBoot/listVideoByType?type=${this.props.type}`,{method: 'GET'})
                .then(response => response.json())
                .then(json => {
                    console.log(json);
                    this.setState({
                        data: json
                    });
                });
        }
    }


    handleFavourite(uuid, e){
        const fetchOption = {
            method: 'GET'
        };

        if(localStorage.userPhone === '') {
            Modal.prompt(
                '登录',
                '请输入你的登录信息',
                (login, password) => fetch(`https://www.eyeauto.cn/HelloSpringBoot/prod/getUser?userPhone=${login}&password=${password}`, fetchOption).then(response => response.text()).then(data => {
                    localStorage.openId = data;
                    localStorage.userPhone = `${login}`;
                    this.setState({openId: data});
                }),
                'login-password',
                null,
                ['请输入账户名', '请输入密码'],
            )
        } else {
            fetch(`https://www.eyeauto.cn/HelloSpringBoot/collectRecord?userPhone=${localStorage.userPhone}&videoId=${uuid}`, fetchOption)
                .then(response => response.text())
                .then(data => {if(data == 1) {
                    Toast.success("收藏成功");
                } else {
                    Toast.success("取消收藏")
                }
                });
        }
        //方案，直接修改数据中的image字段属性

        e.stopPropagation();
    };

    handleClick = (vid, event) =>{
        if(localStorage.userPhone != null) {
            fetch(`https://www.eyeauto.cn/HelloSpringBoot/insertOrUpdateRecord?userPhone=${localStorage.userPhone}&vid=${vid}`, {method: 'GET'})
                .then(response => response.json());
        }
        this.props.history.push(`/weiXin/video/videoPlay/${vid}`);
    };


    render() {
        const {data} = this.state;
        const videoList = data.length > 0 ?
            data.map((obj, index) => (
                <div key={index} style={{width:'100%',padding: '0 15px',borderTop:'1px solid #d7d7d7',borderBottom:'1px solid #d7d7d7' }} onClick={this.handleClick.bind(this, obj&&obj.vid)}>

                    <div style={{padding: '15px 0', height: '90px',}}>

                        {/*<img style={{ height: '64px', marginRight: '15px' }} src={require(`${obj.imageUrl}`)} alt="" />*/}
                        <div style={{float: 'left'}}>
                            <div style={{marginTop: '13px', fontSize: '16px', color: '#292929'}}>{obj&&obj.fileName.split(obj.fileName.lastIndexOf("."))}  </div>
                            <div style={{marginTop: '10px', color: '#959595'}}>{moment(obj&&obj.publishDate).format("YYYY-MM-DD")}</div>
                        </div>
                        <div style={{float: 'right', marginTop: '15px'}}>
                            <Icon type="right" style={{width: '30px', height: '30px', float: 'right', }} color={'#959595'} />
                        </div>
                    </div>
                </div>
            ))
            :
            <div style={{textAlign: 'center'}}>无内容</div>
        ;

        return (
            <div>
            {videoList}
            </div>
        );
    }
}

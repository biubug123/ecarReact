import React from 'react';
import {Modal, Toast, InputItem, Button} from 'antd-mobile';
import "video-react/dist/video-react.css";
import '../css/mobile.css';
import moment from 'moment';
import Login from './login';


export default class VideoPlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            selectedTab: 'blueTab',
            hidden: false,
            fullScreen: false,
            video: '',
            consult: '',
            modal2: false,
            questionTitle: '',
            favourite: ''
        };
    }


    componentWillMount() {
        let myFetchOptions = {
            method: 'GET'
        };
        fetch(`https://www.eyeauto.cn/HelloSpringBoot/getVideoByUUID?vid=${this.props.match.params.vid}`, myFetchOptions)
            .then(response => response.json())
            .then(json => {
                console.log(json.videoUrl);
                this.setState({video: json});
            });
        fetch(`https://www.eyeauto.cn/HelloSpringBoot/getConsult?videoId=${this.props.match.params.vid}`, myFetchOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({consult: data});
            });
    }




    handleClick(e) {
        let myFetchOptions = {
            method: 'post'
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


    toConsultancy() {
        if(localStorage.userPhone === '') {

        } else {
            this.setState({modal2: true});
        }
    };

    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    };

    closeByCancel = () => {
        this.setState({
            modal2: false,
        });
    };

    showLogin = () =>{
        console.log(2333);
        this.setState({modalVisible: true});
        console.log(this.state.modalVisible);
    };

    handleFavourite = (e) =>{
        const fetchOption = {
            method: 'GET',
            mode: 'no-cors'
        };

        if(localStorage.userPhone == '') {
            this.showLogin();
        } else {
            fetch(`https://www.eyeauto.cn/HelloSpringBoot/collectRecord?userPhone=${localStorage.userPhone}&videoId=${this.props.match.params.vid}`, fetchOption)
                .then(response => response.text())
                .then(data => {if(data == 1) {
                    this.setState({favourite: data});
                    Toast.success("收藏成功");
                } else {
                    Toast.success("取消收藏");
                }
                });
        }
        //方案，直接修改数据中的image字段属性
    };



    render() {
        const {consult} = this.state;

        const favourite = this.state.favourite == 1 ?
            <img alt="logo" src={require(`../images/收藏2_do.png`)} style={{width: '24px', height: '24px',marginLeft: '12%'}} onClick={this.handleFavourite.bind(this.props.match.params.vid, this)} />
            :
            <img alt="logo" src={require(`../images/收藏2.png`)} style={{width: '24px', height: '24px',marginLeft: '12%'}} onClick={this.handleFavourite.bind(this.props.match.params.vid, this)} />

        ;




        const modal = <Modal
            popup
            visible={this.state.modal2}
            onClose={this.onClose('modal2')}
            animationType="slide-up"

        >


            <div>
                <div style={{float: 'left', margin: '15px 0 15px 15px', color: '#909090'}} onClick={this.closeByCancel.bind(this)}>
                    取消
                </div>
                <div style={{float: 'right', margin: '15px 15px 15px 0px', color: '#28b74a'}}>
                    <div onClick={this.handleClick.bind(this)}>发送</div>
                </div>
                <form style={{paddingTop: '20px', textAlign: 'center'}}>
                    <div style={{fontWeight: '560'}}>
                        <input type="text" placeholder="问题标题" id="questionTitle" style={{
                            border: '1.2px solid white',
                            height: '25px',
                            width: '85%',
                            borderRadius: '0.3em',
                            backgroundColor: '#f4f5f6',
                            padding: '5px 8px 5px 8px'
                        }}/>
                    </div>
                    <div style={{fontWeight: '560', padding: '20px 0'}}>
                                <textarea placeholder="问题详情" id="questionWord" style={{
                                    border: '1.2px solid white',
                                    height: '110px',
                                    width: '85%',
                                    borderRadius: '0.3em',
                                    backgroundColor: '#f4f5f6',
                                    padding: '5px 8px 5px 8px'
                                }}/>
                    </div>
                </form>
            </div>
            </Modal>

        const consultList = consult.length > 0 ?
            consult.map((Item, index) => (
                  <div style={{width: '100%', height: '80px', marginTop: '1px'}} key={index}>
                      <div style={{backgroundColor: '#d7dadb', height: '30px',lineHeight: '30px' , borderBottom: '1px solid #d7d7d7' }}>
                          <div style={{float: 'left', marginLeft: '10px', fontSize: '14px',color: '#292929'}}><span style={{padding: '0px 5px'}}>{Item.title}</span></div>
                          <div style={{float: 'right',marginRight: '10px', color: '#606060'}}>[{moment(Item.qdate).format("YYYY-MM-DD")}]</div>
                      </div>
                      <div style={{width: '100%', height: '45px',lineHeight: '45px', borderBottom: '1px solid #d7d7d7',whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingLeft: '12px', backgroundColor: '#FFFFFF', marginBottom: '5px'}}>
                          {Item.question}
                      </div>
                  </div>
            ))
            :
            <div></div>
        ;
        return (
            <div className="component" style={{zIndex: 2, bottom: '30px'}}>
                <Login visible={this.state.modalVisible}/>
                <div>
                    <video src={this.state.video.videoUrl} width="100%"
                           height="240px" controls="controls"/>
                    <div style={{ backgroundColor: '#373B3E',padding: '0 10px'}}>
                    <div style={{ lineHeight: '40px', paddingLeft: '5px',  margin: 'auto', borderBottom: '2px solid #78bc78', color: '#FFFFFF', wordBreak: 'break-all', wordWrap: 'break-word'}}>
                        <span style={{padding: '0px 5px'}}>{this.state.video.fileName}</span>
                    </div>
                    </div>
                </div>

                <div style={{backgroundColor: '#f4f4f6', height: '45%', overflow: 'scroll'}}>
                    {consultList}
                </div>

                <div style={{position: 'fixed', width: '100%', height: '50px', bottom: 0, backgroundColor: '#FCFCFC', borderTop: '1px solid #d7d7d7'}}>
                    {modal}
                    <div style={{width: '50%', float: 'left', marginTop: '11px'}}>
                        <input type="text" placeholder="咨询" style={{height: '24px', width: '90%', border: '1px solid #d1d1d1', borderRadius: '10px', backgroundColor: '#fcfcfc', marginLeft: '30px', color: '#d7d7d7'}} onClick={this.toConsultancy.bind(this)}/>
                    </div>

                    <div style={{width: '50%', float: 'right', marginTop: '12px'}}>
                        {/*<img alt="logo" src={require(`../images/设置.png`)} style={{width: '24px', height: '24px',marginLeft: '18%'}} />*/}
                        {favourite}
                        {/*<img alt="logo" src={require(`../images/设置.png`)} style={{width: '24px', height: '24px',marginLeft: '12%'}} />*/}
                    </div>
                </div>
            </div>

        )
    }
}
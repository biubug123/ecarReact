import React from 'react';
import {Icon, NavBar, SearchBar, WhiteSpace, Toast, Modal} from 'antd-mobile';
import '../css/mobile.css';
import {Link} from 'react-router-dom';
import moment from 'moment';

export default class CallBack extends React.Component {
    constructor() {
        super();
        this.state = {
            recall: '',
            value: '',

        }
    }


    componentWillMount() {
        let myFetchOption = {
            method: 'GET'
        }
        fetch(`https://www.eyeauto.cn/HelloSpringBoot/listRecall`, myFetchOption)
            .then(response => response.json())
            .then(data => this.setState({recall: data}));
    }

    onSubmit = (value) => {
        fetch(`https://www.eyeauto.cn/HelloSpringBoot/getVinIsRecall?vin=${value}`, {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                this.setState({value: data}, () => {
                    if(this.state.value === false) {
                        Toast.fail("范围内无此车");
                    } else {
                        Toast.success("该车在召回范围中")
                    }
                });
            })
    };

    searchRecall = (val) => {
        fetch(`https://www.eyeauto.cn/HelloSpringBoot/listRecallByKeyword?keyword=${val}`, {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                this.setState({recall: data});
            })
    };

    render() {
        const {recall} = this.state;
        const recallList = recall.length > 0 ?
            recall.map((recallItem, index) => (
                <Link to={`/weiXin/recall/recallDetail/${recall[index].rid}`} key={index}>
                    <ul style={{
                        listStyleType: 'none',
                        margin: '0px 0px 0px -20px',
                        borderBottom: 'solid 1px #d7d7d7',
                        height: '65px',
                    }}>
                        <li style={{width: '70%',float: 'left',marginTop: '16px',  color: '#292929'}}>{recallItem.title}</li>
                        <span style={{float:'right', textAlign: 'right',margin: '40px 10px 0px 0px', color: '#959595'}}>{moment(recallItem.publishDate).format("YYYY-MM-DD")}</span>
                    </ul>
                </Link>
            ))
            :
            "无信息";

        return (
            <div>

                <SearchBar
                    placeholder="输入17位VIN"
                    maxLength={17}
                    onSubmit={this.onSubmit}
                />

                <WhiteSpace/>
                <NavBar
                    mode="dark"
                    leftContent="召回公告"
                    rightContent={[<Icon key="0" type="search" onClick={() => Modal.prompt('公告查询', '输入你要查询的公告', [
                        { text: '取消' },
                        { text: '提交', onPress: this.searchRecall },
                    ])} style={{marginRight: '16px'}}/>,]}
                />
                <div>
                    {recallList}
                </div>
            </div>
        )
    }
}
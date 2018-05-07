import React from 'react';
import {WingBlank} from 'antd-mobile';
import {Link} from 'react-router-dom';
import '../css/mobile.css';
import moment from 'moment';

export default class Record extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            record: ''
        }
    }

    componentWillMount() {
        fetch(`https://www.eyeauto.cn/HelloSpringBoot/listRecordByPhone?userPhone=${localStorage.userPhone}`, {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                this.setState ({
                    record: data
                });
            })
    }

    render() {
        const {record} = this.state;
        console.log(record);
        const records = record.length > 0 ?
            record.map((Item, index) => (
                    <WingBlank size="lg" key={index}>
                        <Link to={`/weiXin/video/videoPlay/${Item.uuid}`}>
                            <div style={{width: '100%', height: '120px'}}>
                                <div style={{width: '45%', float: 'left', height: '70%', marginTop: '20px'}}><img  alt="" src={require(`../images/background.png`)} width={"100%"} height={"100%"} /> </div>
                                <div style={{width: '50%',float: 'right', marginLeft: '5px', height: '70%', marginTop: '20px',wordBreak: 'break-all', wordWrap: 'break-word'}}>
                                    <div style={{height: '60%', fontWeight: 'bold'}}>{Item.videos.fileName}</div>
                                    <div style={{height: '20%', color: '#8c99a6', fontSize: '12px'}}>发布人：{Item.videos.publisher}</div>
                                    <div style={{height: '10%', color: '#8c99a6', fontSize: '12px',marginTop: '5px'}}>浏览时间:{moment(Item.lastdate).format("YYYY-MM-DD HH:mm")}</div>
                                </div>
                            </div>
                        </Link>
                    </WingBlank>
            ))
            :
            <div/>
        ;

        return (
            <div className="component" style={{zIndex: 3, overflow: 'scroll'}}>
                {records}
            </div>
        )
    }
}
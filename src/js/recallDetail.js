import React from 'react';
import '../css/mobile.css';
import {Button} from 'antd-mobile';


export default class CallBackDetail extends React.Component {
    constructor() {
        super();
        this.state = {
            recall: '',
            vin: '',
        }
    }

    componentWillMount() {

        let myFetchOption = {
            method: 'GET'
        };
        fetch(`https://www.eyeauto.cn/HelloSpringBoot/listRecall/getRecallByUUID?rid=${this.props.match.params.rid}`, myFetchOption)
            .then(response => response.json())
            .then(data => this.setState({recall: data}));
        fetch(`https://www.eyeauto.cn/HelloSpringBoot/listVinByRid?rid=${this.props.match.params.rid}`, myFetchOption)
            .then(response => response.json())
            .then(json => this.setState({vin: json}));
    }


    render() {
        const {recall} = this.state;
        const {vin} = this.state;
        const vinList = vin.length > 0 ?
            vin.map((item, index) => (
                <tr key={index}>
                    <td>{item.carmodels}</td>
                    <td>{item.models}</td>
                    <td>{item.years}</td>
                    <td>起: {item.startnumber} 止： {item.endnumber}</td>
                </tr>
            ))
            :
            <tr>
            </tr>
        ;

        return(
            <div className="component" style={{zIndex: 2, overflow: 'scroll'}} >
                <h2 style={{textAlign: 'center'}}>{recall&&recall.title}</h2>
                <table className="tableborder">
                    <tbody>
                        <tr>
                            <th style={{width: '5px'}}>制造商</th>
                            <td colSpan={3}>{recall&&recall.manufacturer}</td>
                        </tr>
                        <tr>
                            <th>召回时间</th>
                            <td colSpan={3}>{recall&&recall.intervalDate}</td>
                        </tr>
                        <tr>
                            <th>涉及数量</th>
                            <td colSpan={3}>{recall&&recall.inNumber}</td>
                        </tr>
                        <tr>
                            <th>车型</th>
                            <th style={{width: '150px'}}>型号</th>
                            <th>年款</th>
                            <th>VIN范围</th>
                        </tr>
                        {vinList}
                        <tr>
                            <th>缺陷情況</th>
                            <td colSpan={3}>{recall&&recall.defects}</td>
                        </tr>
                        <tr>
                            <th>可能后果</th>
                            <td colSpan={3}>{recall&&recall.consequence}</td>
                        </tr>
                        <tr>
                            <th>维修措施</th>
                            <td colSpan={3}>{recall&&recall.maintain}</td>
                        </tr>
                        <tr>
                            <th>改进措施</th>
                            <td colSpan={3}>{recall&&recall.improve}</td>
                        </tr>
                        <tr>
                            <th>投诉情况</th>
                            <td colSpan={3}>{recall&&recall.complain}</td>
                        </tr>
                        <tr>
                            <th>车主通知</th>
                            <td colSpan={3}>）{recall&&recall.notification}</td>
                        </tr>
                        <tr>
                            <th>其他信息</th>
                            <td colSpan={3}>{recall&&recall.otherInfo}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
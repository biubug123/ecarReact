import React from 'react';
import '../css/mobile.css';
import {Icon, InputItem, List} from 'antd-mobile';

export default class MaintenanceDetail extends React.Component {

    constructor() {
        super();
        this.state = {
            maintenance: '',
            hasError: '',
            total: '',
            loading: true,
            car: ''
        }
    }

    toMaintenance = () => {
        this.props.history.push("/weiXin//maintenance");
    };

    componentDidMount() {
        fetch(`https://www.eyeauto.cn/HelloSpringBoot/getCarByCid?cid=${this.props.match.params.cid}`)
            .then(response => response.json())
            .then(data =>{
                console.log(data);
                this.setState({car: data});
            });
    }


    getMainteananceByMile(event) {

        let myFetchOption = {
            method: 'GET'
        };
        if(event == null || event == 0) {
            event = 1;
        }
        console.log("event" + event);

        fetch(`https://www.eyeauto.cn/HelloSpringBoot/listChecksByBrandIdAndType?brandId=${this.state.car.brandId}&type=${event}`,myFetchOption)
            .then(response => response.json())
            .then(data => {
                this.setState({maintenance: data}, () => {
                    this.setState({
                        total: this.calculateTheCost(this.props.match.params.price,
                            this.state.maintenance[0].zj + this.state.maintenance[1].zj,
                            this.state.maintenance[0].price)
                    })
                });
            })
            .catch(error => {
                throw error;
            })

    }



    calculateTheCost(carPrice, zj, basePrice) {
        carPrice = carPrice.substring(0, carPrice.indexOf("万"));

        let factor = carPrice * 10000 / basePrice;

        let weight = 0;

        if(weight>=5){
            weight = zj*2*factor;
        }else if(weight>=3){
            weight = zj*1.667*factor;
        }else if(weight>=2){
            weight = zj*1.5*factor;
        }else if(weight>=1.5){
            weight = zj*1.333*factor;
        }else if(weight>=1.2){
            weight = zj*1.125*factor;
        }else if(weight>=1){
            weight = zj*1.083*factor;
        }else if(weight>=0.8){
            weight = zj*0.917*factor;
        }else if(weight>=0.6){
            weight = zj*0.8*factor;
        }else if(weight>=0.3){
            weight = zj*0.75*factor;
        }else{
            weight = zj*0.5*factor;
        }
        zj = Math.round(weight);

        return zj;
    }



    render(){

        const {maintenance} = this.state;
        // const check = maintenance[0].length > 0 ?
        //     <Icon type="check-circle" />
        //     :
        //     <div></div>
        // ;
        //
        // const right = maintenance[1].length > 0 ?
        //     <Icon type="check-circle"/>
        //     :
        //     <div></div>
        // ;


        return(
            <div className="component" style={{zIndex: 3, overflow: 'scroll'}}>

                <List renderHeader={() => <div style={{textAlign: 'center', lineHeight: '24px'}}>
                    {this.state.car.carName}
                    <br/>
                    <div style={{textAlign: 'right', color: 'red'}}>￥：{this.state.car.price}</div>
                    </div>}>

                </List>
                <div style={{position: 'fixed', bottom: 0, height: '50px', width: '100%', borderTop: '1px solid #d7d7d7'}}>
                    <InputItem
                        type="number"
                        onChange={this.getMainteananceByMile.bind(this)}
                        extra="公里数"
                        style={{
                            height: '24px',
                            width: '90%',
                            borderRadius: '0.3em',
                            backgroundColor: '#f4f5f6',
                            padding: '5px 8px 5px 8px',
                        }}
                        id="specialInput"

                        maxLength={7}
                    />
                </div>

                <div style={{position: 'fixed', height: '80%', width: '100%', overflow: 'scroll'}}>
                    <table style={{width: '100%'}} className="tableborder" cellSpacing={0}>
                        <thead style={{backgroundColor: '#00a64e', color: 'white'}}>
                        <tr>
                            <th rowSpan="2">大类</th>
                            <th rowSpan="2">小类</th>
                            <th colSpan="3">一万公里</th>
                        </tr>
                        <tr>
                            <th>检查</th>
                            <th>更换</th>
                            <th>推荐</th>
                        </tr>
                        </thead>
                        <tbody style={{height: '50%'}}>
                        <tr>
                            <th rowSpan="14">发动机</th>
                            <th>机油</th>
                            <td>
                                {maintenance&&maintenance[0].jy !== null ?
                                    <Icon type="check-circle"  />
                                    :
                                    <div />
                                }
                            </td>
                            <td>
                                {maintenance&&maintenance[1].jy !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>机油格</th>
                            <td>
                                {maintenance&&maintenance[0].jyg !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td>
                                {maintenance&&maintenance[1].jyg !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>空气格</th>
                            <td>
                                {maintenance&&maintenance[0].kqg !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td>
                                {maintenance&&maintenance[1].kqg !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>发动机防冻液</th>
                            <td>
                                {maintenance&&maintenance[0].fdjfdy !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td>
                                {maintenance&&maintenance[1].fdjfdy !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>火花塞</th>
                            <td>
                                {maintenance&&maintenance[0].hhs !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td>
                                {maintenance&&maintenance[1].hhs !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>节气门清洁</th>
                            <td>
                                {maintenance&&maintenance[0].jqmqj !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td>
                                {maintenance&&maintenance[1].jqmqj !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>喷油嘴清洁</th>
                            <td>
                                {maintenance&&maintenance[0].pyzqj !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td>
                                {maintenance&&maintenance[1].pyzqj !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>清洗汽油箱</th>
                            <td>
                                {maintenance&&maintenance[0].qxqyx !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td>
                                {maintenance&&maintenance[1].qxqyx !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>汽油格</th>
                            <td>
                                {maintenance&&maintenance[0].qyg !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td>
                                {maintenance&&maintenance[1].qyg !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>发动机皮带</th>
                            <td>
                                {maintenance&&maintenance[0].fdjpd !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td>
                                {maintenance&&maintenance[1].fdjpd !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>正时链</th>
                            <td>
                                {maintenance&&maintenance[0].zsl !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td>
                                {maintenance&&maintenance[1].zsl !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>气门间隙</th>
                            <td>
                                {maintenance&&maintenance[0].qmjx !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td>
                                {maintenance&&maintenance[1].qmjx !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>曲轴油封</th>
                            <td>
                                {maintenance&&maintenance[0].qzyf !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td>
                                {maintenance&&maintenance[1].qzyf !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>排气管吊胶</th>
                            <td>
                                {maintenance&&maintenance[0].pqgdj !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td>
                                {maintenance&&maintenance[1].pqgdj !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td></td>
                        </tr>
                        </tbody>
                        <tbody>
                        <tr>
                            <th rowSpan="9">传动系统</th>
                            <th>变速箱油</th>
                            <td>
                                {maintenance&&maintenance[0].bsxy !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td>
                                {maintenance&&maintenance[1].bsxy !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>分动箱油</th>
                            <td>
                                {maintenance&&maintenance[0].fdxy !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td>
                                {maintenance&&maintenance[1].fdxy !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>差速器油</th>
                            <td>
                                {maintenance&&maintenance[0].csqy !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td>
                                {maintenance&&maintenance[1].csqy !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>传动轴胶套</th>
                            <td>
                                {maintenance&&maintenance[0].cdzjt !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td>
                                {maintenance&&maintenance[1].cdzjt !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>半轴球笼</th>
                            <td>
                                {maintenance&&maintenance[0].bzql !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td>
                                {maintenance&&maintenance[1].bzql !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>半轴胶套</th>
                            <td>
                                {maintenance&&maintenance[0].bzjt !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td>
                                {maintenance&&maintenance[1].bzjt !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>传动轴油封</th>
                            <td>
                                {maintenance&&maintenance[0].cdzyf !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td>
                                {maintenance&&maintenance[1].cdzyf !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>差速器油封</th>
                            <td>
                                {maintenance&&maintenance[0].csqyf !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td>
                                {maintenance&&maintenance[1].csqyf !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td></td>
                        </tr>
                        </tbody>
                        <tbody>
                        <tr>
                            <th rowSpan="18">底盘系统</th>
                            <th>制动液</th>
                            <td>
                                {maintenance&&maintenance[0].zdy !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td>
                                {maintenance&&maintenance[1].zdy !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>制动盘</th>
                            <td>
                                {maintenance&&maintenance[0].zdp !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td>
                                {maintenance&&maintenance[1].zdp !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>制动片</th>
                            <td>
                                {maintenance&&maintenance[0].zdp !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td>
                                {maintenance&&maintenance[1].zdp !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>制动管和软管</th>
                            <td>
                                {maintenance&&maintenance[0].zdghrg !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td>
                                {maintenance&&maintenance[1].zdghrg !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>制动踏板</th>
                            <td>
                                {maintenance&&maintenance[0].zdtb !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td>
                                {maintenance&&maintenance[1].zdtb !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>转向液</th>
                            <td>
                                {maintenance&&maintenance[0].zxy !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td>
                                {maintenance&&maintenance[1].zxy !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>方向盘连杆</th>
                            <td>
                                {maintenance&&maintenance[0].fxplg !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td>
                                {maintenance&&maintenance[1].fxplg !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>转向轴胶套</th>
                            <td>
                                {maintenance&&maintenance[0].zxzjt !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td>
                                {maintenance&&maintenance[1].zxzjt !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>转向球头</th>
                            <td>
                                {maintenance&&maintenance[0].zxqt !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td>
                                {maintenance&&maintenance[1].zxqt !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>减震器</th>
                            <td>
                                {maintenance&&maintenance[0].jzq !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td>
                                {maintenance&&maintenance[1].jzq !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>弹簧座胶</th>
                            <td>
                                {maintenance&&maintenance[0].thzj !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td>
                                {maintenance&&maintenance[1].thzj !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>悬架球头</th>
                            <td>
                                {maintenance&&maintenance[0].xjqt !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td>
                                {maintenance&&maintenance[1].xjqt !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>悬架胶套</th>
                            <td>
                                {maintenance&&maintenance[0].xjjt !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td>
                                {maintenance&&maintenance[1].xjjt !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>轮胎</th>
                            <td>
                                {maintenance&&maintenance[0].lt !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td>
                                {maintenance&&maintenance[1].lt !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>轮胎换位</th>
                            <td>
                                {maintenance&&maintenance[0].lthw !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td>
                                {maintenance&&maintenance[1].lthw !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>车胎平衡</th>
                            <td>
                                {maintenance&&maintenance[0].ctph !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td>
                                {maintenance&&maintenance[1].ctph !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>四轮定位</th>
                            <td>
                                {maintenance&&maintenance[0].sldw !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td>
                                {maintenance&&maintenance[1].sldw !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>底盘螺栓扭矩</th>
                            <td>
                                {maintenance&&maintenance[0].dplsnj !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td>
                                {maintenance&&maintenance[1].dplsnj !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td></td>
                        </tr>
                        </tbody>
                        <tbody>
                        <tr>
                            <th rowSpan="4">电器</th>
                            <th>雨刮片（付）</th>
                            <td>
                                {maintenance&&maintenance[0].ygp !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td>
                                {maintenance&&maintenance[1].ygp !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>电瓶</th>
                            <td>
                                {maintenance&&maintenance[0].dp !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td>
                                {maintenance&&maintenance[1].dp !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>制冷剂</th>
                            <td>
                                {maintenance&&maintenance[0].zlj !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td>
                                {maintenance&&maintenance[1].zlj !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>车灯高度</th>
                            <td>
                                {maintenance&&maintenance[0].cdgd !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td>
                                {maintenance&&maintenance[1].cdgd !== null ?
                                    <Icon type="check-circle" />
                                    :
                                    <div />}
                            </td>
                            <td></td>
                        </tr>
                    </tbody>
                    <tbody>
                    <tr>
                        <th colSpan={2}>合计</th>
                        <td>
                            {
                                maintenance&&maintenance[0].zj !== null ?
                                    <div>{maintenance[0].zj}</div>
                                    :
                                    <div/>
                            }
                        </td>
                        <td>
                            {
                                maintenance&&maintenance[1].zj !== null ?
                                    <div>{maintenance[1].zj}</div>
                                    :
                                    <div/>
                            }
                        </td>
                        <td>{this.state.total}</td>
                    </tr>
                    </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
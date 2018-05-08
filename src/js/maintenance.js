import {Sticky, StickyContainer} from 'react-sticky';
import {Icon, List, ListView} from 'antd-mobile';
import React from 'react';
import '../css/mobile.css';
import {Link} from 'react-router-dom';

const { Item } = List;



export default class Demo extends React.Component {
    constructor(props) {
        super(props);
        const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
        const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

        const dataSource = new ListView.DataSource({
            getRowData,
            getSectionHeaderData: getSectionData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });

        this.state = {
            inputValue: '',
            dataSource,
            isLoading: true,
            carLogo: '',
            visibility: 'none',
            type: '',
            name:'',
            brandId: '',
            carDetail: ''
        };
    }


    componentWillMount() {
        fetch(`https://www.eyeauto.cn/HelloSpringBoot/listCarLogo`, {method: 'GET'})
            .then(response => response.json())
            .then(data =>{
                console.log(data),
                this.setState({carLogo: data});
            });
        console.log(this.state.carLogo);
        setTimeout(() => {
            this.setState({
                dataSource: this.genData(this.state.dataSource, this.state.carLogo),
                isLoading: false,
            });
        }, 600);
    }



    onSearch = (val) => {
        const pd = { ...this.state.carLogo };
        Object.keys(pd).forEach((item) => {
            const arr = pd[item].filter(jj => jj.logoName.toLocaleLowerCase().indexOf(val) > -1);
            if (!arr.length) {
                delete pd[item];
            } else {
                pd[item] = arr;
            }
        });
        this.setState({
            inputValue: val,
            dataSource: this.genData(this.state.dataSource, pd),
        });
    };


    genData(ds, carLogo) {
        const dataBlob = {};
        const sectionIDs = [];
        const rowIDs = [];
        Object.keys(carLogo).map((item, index) => {
            sectionIDs.push(item);
            dataBlob[item] = item;
            rowIDs[index] = [];
            carLogo[item].forEach((jj) => {
                rowIDs[index].push(jj.logoId);
                dataBlob[jj.logoId] = jj;

            });
        });
        return ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs);
    }

    handleClick(type, name, logoId, event) {
        this.setState({visibility: ''});
        this.setState({type: type});
        this.setState({name: name});
        let myFetchOption = {
            method: 'GET'
        };
        fetch(`https://www.eyeauto.cn/HelloSpringBoot/listCarByBrandId?brandId=${logoId}`, myFetchOption)
            .then(response =>response.json())
            .then(data =>{
                this.setState({carDetail: data});
            });
    }

    closeModal() {
        this.setState({visibility: 'none'});
    }
    render() {
        const {carDetail} = this.state;
        const detailCarList = carDetail.length > 0 ?
            carDetail.map((carDetailItem, index) => (
                <Link to={`/weiXin/maintenance/maintenanceDetail/${carDetailItem.cid}`} key={index} onClick={this.closeModal.bind(this)}>
                    <List.Item style={{backgroundColor: '#f4f4f6', border: '1px solid #d7d7d7'}}>
                        {carDetailItem.carName}
                    </List.Item>
                </Link>
            ))
            :
            "无";


        return (

            <div style={{ position: 'relative'}}>
                <div style={{minHeight: '205px'}}>
                    <div style={{borderBottom: '1px solid #808080', height: '43.5px',fontSize: '16px', lineHeight: '43.5px', backgroundColor: '#373b3e', paddingLeft: '10px',color: 'white'}}>热门品牌</div>
                    <div className="hotCar">
                        <div style={{width: '15%', height: '15%'}} onClick={this.handleClick.bind(this, 'A', '奥迪', 'df854e91-3d50-4363-a6d6-f4b5a5ef23fe')}>
                            <img alt="logo" src={`https://www.eyeauto.cn/logo/A/audi.jpg`}
                                 style={{width: '100%', height: '100%'}}/>
                            <p>奥迪</p>
                        </div>
                        <div style={{width: '15%', height: '15%'}}  onClick={this.handleClick.bind(this, 'B', '别克', '20a5ce25-af39-4c61-9b2c-eb0999af16ed')}>
                            <img alt="logo" src={`https://www.eyeauto.cn/logo/B/别克.jpg`}
                                 style={{width: '100%', height: '100%'}}/>
                            <p>别克</p>
                        </div>
                        <div style={{width: '15%', height: '15%'}} onClick={this.handleClick.bind(this, 'B', '奔驰', '54d10990-206b-4977-ad31-1bc49f7f4333')}>
                            <img alt="logo" src={`https://www.eyeauto.cn/logo/B/奔驰.jpg`}
                                 style={{width: '100%', height: '100%'}}/>
                            <p>奔驰</p>
                        </div>
                        <div style={{width: '15%', height: '15%'}} onClick={this.handleClick.bind(this, 'B', '宝马', 'fd79fbf7-dec8-42a1-bb27-dfcdc3bcd64d')}>
                            <img alt="logo" src={`https://www.eyeauto.cn/logo/B/宝马.jpg`}
                                 style={{width: '100%', height: '100%'}}/>
                            <p>宝马</p>
                        </div>
                        <div style={{width: '15%', height: '15%'}} onClick={this.handleClick.bind(this, 'D', '大众', '2525183a-2eb4-4921-8226-d021a2d15d6e')}>
                            <img alt="logo" src={`https://www.eyeauto.cn/logo/D/大众.jpg`}
                                 style={{width: '100%', height: '100%'}}/>
                            <p>大众</p>
                        </div>
                        <div style={{width: '15%', height: '15%'}} onClick={this.handleClick.bind(this, 'F', '福特', '2d2c01d9-37d7-45f8-94b9-a6fd193e3be3')}>
                            <img alt="logo" src={`https://www.eyeauto.cn/logo/F/福特.jpg`}
                                 style={{width: '100%', height: '100%'}}/>
                            <p>福特</p>
                        </div>
                        <div style={{width: '15%', height: '15%'}} onClick={this.handleClick.bind(this, 'B', '本田', '8cbf985a-6254-40ed-ad49-06650bf77451')}>
                            <img alt="logo" src={`https://www.eyeauto.cn/logo/B/本田.jpg`}
                                 style={{width: '100%', height: '100%'}}/>
                            <p>本田</p>
                        </div>
                        <div style={{width: '15%', height: '15%'}} onClick={this.handleClick.bind(this, 'F', '丰田', '050a100f-b5ab-41c7-8237-54d0ab4c24f1')}>
                            <img alt="logo" src={`https://www.eyeauto.cn/logo/F/丰田.jpg`}
                                 style={{width: '100%', height: '100%'}}/>
                            <p>丰田</p>
                        </div>
                        <div style={{width: '15%', height: '15%'}} onClick={this.handleClick.bind(this, 'R', '日产', '42cbceb1-4e0e-4300-9502-bcce67503397')}>
                            <img alt="logo" src={`https://www.eyeauto.cn/logo/R/日产.jpg`}
                                 style={{width: '100%', height: '100%'}}/>
                            <p>日产</p>
                        </div>
                        <div style={{width: '15%', height: '15%'}} onClick={this.handleClick.bind(this, 'S', '斯柯达', '81c4e448-e765-414c-914e-0d8db845e469')}>
                            <img alt="logo" src={`https://www.eyeauto.cn/logo/S/斯柯达.jpg`}
                                 style={{width: '100%', height: '100%'}}/>
                            <p>斯柯达</p>
                        </div>



                    </div>
                </div>
                <ListView.IndexedList
                    dataSource={this.state.dataSource}
                    className="am-list sticky-list"
                    useBodyScroll
                    renderSectionWrapper={sectionID => (
                        <StickyContainer
                            key={`s_${sectionID}_c`}
                            className="sticky-container"
                            style={{ zIndex: 0 }}
                        />
                    )}
                    renderSectionHeader={sectionData => (
                        <Sticky>
                            {({
                                  style,
                              }) => (
                                <div
                                    className="sticky"
                                    style={{
                                        ...style,
                                        backgroundColor: sectionData.charCodeAt(0) % 2 ? '#37aafa' : '#00a64e',
                                        color: 'white',
                                    }}
                                >{sectionData}</div>
                            )}
                        </Sticky>
                    )}
                    renderRow={(rowData) => {
                        return (
                            <Item className="carLogoFont" onClick={this.handleClick.bind(this, rowData.logoAlphabet, rowData.logoName, rowData.logoId)}>
                                <div style={{marginLeft: '10px', float: 'left'}}>
                                    <img alt="logo" src={`https://${rowData.logoUrl}`} style={{width: `40px`, height: '32px'}}/>
                                </div>
                                <div style={{marginLeft: '20px',marginTop: '5px', float: 'left'}}>
                                    {rowData.logoName}
                                </div>
                            </Item>
                        )

                    }}
                    delayTime={10}
                    delayActivityIndicator={<div style={{ padding: 25, textAlign: 'center' }}>rendering...</div>}
                />
                <div className="modalSelect" style={{display: `${this.state.visibility}`, zIndex: 2}}>
                    <div style={{backgroundColor: '#373b3e', color: '#FFFFFF',font: 'bold', height: '40px', lineHeight: '40px', textAlign:'center'}}>{this.state.type + ":  " + this.state.name}</div>
                        <Icon type="cross" onClick={this.closeModal.bind(this)}/>
                        {detailCarList}
                </div>
        </div>);
    }
}

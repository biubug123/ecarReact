import React from 'react'
import  {Toast}  from 'antd-mobile';


//
export default function requireAuthentication(Component) {
    // 组件有已登陆的模块 直接返回 (防止从新渲染)
    if (Component.AuthenticatedComponent) {
        console.log("组件有已登陆的模块");
        return Component.AuthenticatedComponent
    }


    // 创建验证组件
    class AuthenticatedComponent extends React.Component {

        state = {
            login: true,
        };

        componentWillMount() {


            this.checkAuth();
        }

        componentWillReceiveProps(nextProps) {
            this.checkAuth();
        }

        //路径中获取参数
        getParam(paramName) {
            let reg = new RegExp("(^|&)" + paramName + "=([^&]*)(&|$)", "i");
            let r = this.props.location.search.substr(1).match(reg);
            if (r != null) return decodeURI(r[2]);
            return null;
        }
        //获取cookie
        getCookie(name)
        {
            var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
            if(arr=document.cookie.match(reg))
                return unescape(arr[2]);
            else
                return null;
        }
        checkAuth() {
            let code = this.getParam("code");
            //从cookie中获取openId的值
            let openId = this.getCookie("openId");
            Toast.loading(code,3);
            //防止频繁查询更新openid
            if(code !== null && openId === null){
                let url="https://www.eyeauto.cn/HelloSpringBoot/weiXinPublic/getWeChatUser?code=";
                // let url ="http://localhost:8080/demo/weiXinPublic/getWeChatUser?code=";
                fetch(url+code,{
                    method: 'POST' ,// 指定是POST请求
                    'Content-Type': 'application/x-www-form-urlencoded',
                    credentials: "include" //允许cookie之间的访问  (access-origin需指定客户端域名/ip)
                })

            }

        }

        render() {
            //若已登录，放行这个组件
            if (this.state.login) {
                return <Component {...this.props}/>
            }
            return ''
        }
    }

    // 不使用 react-redux 的话直接返回
    Component.AuthenticatedComponent = AuthenticatedComponent
    return Component.AuthenticatedComponent

}
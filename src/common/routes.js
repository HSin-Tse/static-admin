import React from 'react'
import { Switch} from 'react-router-dom'
import { Route } from 'react-router'
import Container from 'container'
import Login from 'pages/login'


const routes = (
  // 以上使用 HashRouter 是为了 github 上展示方便，以上路由写法的缺陷在于加载 login 页时候会把其他页面也加载出来，
  // 项目中可使用如下写法
  <Switch>
    <Route exec path="/" component={Container} />
    <Route exec path="/login" component={Login} />
  </Switch>
)

export default routes

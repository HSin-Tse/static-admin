import React from 'react'
import { HashRouter ,Switch} from 'react-router-dom'
import { Route, Redirect } from 'react-router'
import Container from 'container'
import Login from 'pages/login'
import createHistory from 'history/createBrowserHistory'

const history = createHistory()
const location = history.location
class Greeting extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}</h1>;
    }
}

class Test1 extends React.Component {
    render() {
        return <h1>Test1, {this.props.name}</h1>;
    }
}

class Test2 extends React.Component {
    render() {
        return <h1>Test2, {this.props.name}</h1>;
    }
}
class Test11 extends React.Component {
    render() {
        return <h1>Test1111, {this.props.name}</h1>;
    }
}
const routes = (
  // 以上使用 HashRouter 是为了 github 上展示方便，以上路由写法的缺陷在于加载 login 页时候会把其他页面也加载出来，
  // 项目中可使用如下写法
  <Switch>
    <Route exec path="/" component={Container} />
    <Route exec path="/login" component={Login} />
  </Switch>
)

export default routes

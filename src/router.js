import React, { Component } from 'react';
import './App.css';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import App from './App';
import Login from './pages/login';
import Admin from './admin';
import Permission from './pages/permissions';
import BasicTable from './pages/table/basicTable'
class Router extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <HashRouter>
                <App>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route render={() =>
                            <Admin>
                                <Switch>
                                    <Route path="/permission" component={Permission} />
                                    <Route path="/table/basic" component={BasicTable} />
                                    {/* <Route component={NoMatch} /> */}
                                </Switch>
                            </Admin>
                        } />
                    </Switch>
                </App>
            </HashRouter>
        );
    }
}

export default Router;

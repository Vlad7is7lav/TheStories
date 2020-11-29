import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import LoginForm from './components/Users/login';

//HOC
import Main from './components/hoc/mainLayout';
import Auth from './components/hoc/auth';
import Admin from './components/Users/Admin/index';
import Logout from './components/Users/logout';

interface regProps {
};

interface regState {};


const Routes:React.FC<regProps> = () => {
    return (
        <BrowserRouter>
            <Main>
                <Switch>
                   
                    <Route path="/admin" component={Auth(Admin, true)} />
                    <Route path="/logout" component={Auth(Logout, true)} />
                    <Route path="/login" component={Auth(LoginForm, false)} />
                    <Route path="/" component={Auth(Home)} />
                </Switch>
            </Main>
        </BrowserRouter>
    )
}

export default Routes;
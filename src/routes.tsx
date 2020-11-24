import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import LoginForm from './components/Users/login';

//HOC
import Main from './components/hoc/mainLayout';
import Auth from './components/hoc/auth';
import Admin from './components/Users/Admin/index';

interface regProps {
};

interface regState {};


const Routes:React.FC<regProps> = () => {
    return (
        <BrowserRouter>
            <Main>
                <Switch>
                    <Route path="/admin" component={Auth(Admin)} />
                    <Route path="/login" component={Auth(LoginForm)} />
                    <Route path="/" component={Home} />
                </Switch>
            </Main>
        </BrowserRouter>
    )
}

export default Routes;
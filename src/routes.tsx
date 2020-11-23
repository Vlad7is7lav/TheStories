import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import LoginForm from './components/Users/login';

//HOC
import Main from './components/hoc/mainLayout';
import Auth from './components/hoc/auth';

interface regProps {
};

interface regState {};


const Routes:React.FC<regProps> = ({}) => {
    return (
        <BrowserRouter>
            <Main>
                <Switch>
                    <Route path="/login" component={Auth(LoginForm, false)} />
                    <Route path="/" component={Home} />
                </Switch>
            </Main>
        </BrowserRouter>
    )
}

export default Routes;
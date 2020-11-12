import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './components/Home';

//HOC
import Main from './components/hoc/mainLayout';

interface regProps {
};

interface regState {};


const Routes:React.FC<regProps> = ({}) => {
    return (
        <BrowserRouter>
            <Main>
                <Switch>
                    <Route path="/" component={Home} />
                </Switch>
            </Main>
        </BrowserRouter>
    )
}

export default Routes;
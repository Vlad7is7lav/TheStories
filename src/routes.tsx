import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './components/Home'

interface regProps {
};

interface regState {};


const Routes:React.FC<regProps> = ({}) => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Home} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;
import React, { ComponentType } from 'react';
import { Interface } from 'readline';
import Header from  '../Header';

interface WrappedProps {
};

const Main:React.FC = (props) => {
    return (
        <>
            <Header />
            <>
                {props.children}
            </>
        </>
    )
    
}

export default Main;
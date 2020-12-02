import React, { ReactChildren } from 'react';
import SideNav from 'react-simple-sidenav';
import Items from './items';
// import C1 from './items';

type C1 = {
    showNav: boolean
    onHideNav: Function
}

type C2 = Omit<C1,'auth'>

const MainSideNav:React.FC<C2> = (props):JSX.Element => {
    return (
        <SideNav
            showNav={props.showNav}
            onHideNav={props.onHideNav}
            navStyle={{
                background: '#242424',
                maxWidth: '220px'
            }}
        >
            <Items onHideNav={props.onHideNav}/>
            
        </SideNav>
        
    )
}

export default MainSideNav;
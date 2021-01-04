import React, { ReactChildren } from 'react';
import SideNav from 'react-simple-sidenav';
import Items from './items';
// import C1 from './items';

type C1 = {
    showNav: boolean
    onHideNav: Function
}

// type C2 = Omit<C1,'auth'>

// Function Component with props that come from index.tsx : showNav and onHideNav
const MainSideNav:React.FC<C1> = (props):JSX.Element => {
    return (
        <SideNav
            showNav={props.showNav}
            onHideNav={props.onHideNav}
            navStyle={{
                background: '#242424',
                maxWidth: '220px'
            }}
        >
            {/* Component that show all items for log off and log in clients */}
            <Items onHideNav={props.onHideNav}/>
            
        </SideNav>
        
    )
}

export default MainSideNav;
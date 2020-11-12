import React from 'react';
import SideNav from 'react-simple-sidenav';

type C1 = {
    showNav: boolean
    onHideNav: Function
}


const MainSideNav:React.FC<C1> = (props) => {
    return (
        <SideNav
            showNav={props.showNav}
            onHideNav={props.onHideNav}
        >
            Items
        </SideNav>
        
    )
}

export default MainSideNav;
import React from 'react';
import SideNav from 'react-simple-sidenav';
import Items from './items';


type C1 = {
    showNav: boolean
    onHideNav: Function
}

type C2 = Function


const MainSideNav:React.FC<C1> = (props) => {
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
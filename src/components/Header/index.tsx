import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import MainSideNav from './Sidenav/Sidenav'

const Header:React.FC = () => {

    const [showNav, setShowNav] = useState<boolean>(false);

    const showSidenav = () => {
        setShowNav(true);
    }

    const hideSidenav = () => {
        setShowNav(false);
    }    

    return (
        <header>
            <div className="open_nav">
                <FontAwesome 
                    name="bars"
                    onClick={()=>{showSidenav()}}
                    style={{
                        color:'blue',
                        padding: '10px',
                        cursor: 'pointer',
                        fontSize: '25px'
                    }}
                />

            </div>
            <MainSideNav 
                showNav={showNav}
                onHideNav={() => hideSidenav()}
            />
            
            <Link to="/" className="logo">
                The Story
            </Link>
        </header>
    )
}

export default Header
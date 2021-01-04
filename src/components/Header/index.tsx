import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import MainSideNav from './Sidenav/Sidenav'

const Header:React.FC = (props) => {
    
    //hooks to show and hide side panel
    const [showNav, setShowNav] = useState<boolean>(false);

    //show side panel
    const showSidenav = () => {
        setShowNav(true);
    }

    //hide side panel
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
            {/* Main component for side panel */}
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
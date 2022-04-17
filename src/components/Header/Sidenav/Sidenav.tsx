import React from "react"
import SideNav from "react-simple-sidenav"
import Items from "./items"

type C1 = {
    showNav: boolean
    onHideNav: Function
}

// Function Component with props that come from index.tsx : showNav and onHideNav
const MainSideNav: React.FC<C1> = (props): JSX.Element => {
    return (
        <SideNav
            showNav={props.showNav}
            onHideNav={props.onHideNav}
            navStyle={{
                background: "#242424",
                maxWidth: "220px",
            }}
        >
            <Items onHideNav={props.onHideNav} />
        </SideNav>
    )
}

export default MainSideNav

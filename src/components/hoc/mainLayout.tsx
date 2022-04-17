import React from "react"
import Header from "../Header"

const Main: React.FC = (props) => {
    return (
        <>
            <Header />
            <>{props.children}</>
        </>
    )
}

export default Main

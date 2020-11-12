import React, { ComponentType } from 'react';
import { Interface } from 'readline';
import Header from  '../Header';

interface WrappedProps {};

// export interface Props {
//     onChange: (value: string) => void;
//     children: JSX.Element;
//  }

//  function HOC1<WP extends {}>(WrappedComponent: ComponentType<WP>){
//     const Main:React.FC<WP> = (props) => {
//         return (
//             <>
//                 <Header />
//                 <>
//                     {props.children};
//                 </>
//             </>
//         )
        
//     }
//  }

const Main:React.FC = (props) => {
    return (
        <>
            <Header />
            <>
                {props.children};
            </>
        </>
    )
    
}

export default Main;
// export default HOC1;
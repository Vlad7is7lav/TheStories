import React, { ComponentType } from 'react';


interface WrappedProps {
};

const AdminLayout:React.FC = (props):JSX.Element => {
        
        return (
                <div className="container admin_layout">
                    {props.children}
                </div>           
        )
        
    
}
export default AdminLayout;
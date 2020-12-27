import React from 'react';


const AdminLayout:React.FC = (props):JSX.Element => {
        
        return (
                <div className="container admin_layout">
                    {props.children}
                </div>           
        )
        
    
}
export default AdminLayout;
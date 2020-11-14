import React, { ReactElement, ReactText } from 'react';
import FontAwesome from 'react-fontawesome';
import { routeSideLinks, IitemsLinks } from '../../../utils/routeSideLinks';
import {Link} from 'react-router-dom';

type C1 = {
    onHideNav: Function
}

const Items:React.FC<C1> = (props) => {

    const element = (item:IitemsLinks, i:number) => {
        return (
            <div key={i} className='navItem'>
            <Link 
              to={item.path}
              onClick={()=>{props.onHideNav()}}
              >
                <FontAwesome name={item.icon} />
                {item.text}
            </Link>
            
        </div>
        )
    }

    const showCommonLinks = () => (
        routeSideLinks.common.map((item:IitemsLinks,i:number)=> {
            return element(item,i)
        })
    )
        

    const showAdminLinks = () => (
        routeSideLinks.admin.map((item:IitemsLinks,i:number)=> {
            return element(item,i)
        })
    )

    return (
        <div>
            {showCommonLinks()}

            <div>
                <div className="nav_split">
                    Admin options
                </div>
                {showAdminLinks()}
            </div>

                
        </div>
    )
}

export default Items
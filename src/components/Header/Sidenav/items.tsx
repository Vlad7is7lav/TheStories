import React, { ReactElement, ReactText } from 'react';
import FontAwesome from 'react-fontawesome';
import { routeSideLinks, IitemsLinks } from '../../../utils/routeSideLinks';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import userEvent from '@testing-library/user-event';

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
                {/* {(props.user.auth) ? showAdminLinks() : null} */}
                {showAdminLinks()}
            </div>

                
        </div>
    )
}

interface propsAuth {
    auth: boolean
    userData: object
}

type TState = {
    userReduce: propsAuth
    storyReduce: propsAuth
}

const mapStatetoProps = function(state:TState) {
    return {
        user: state.userReduce
    }
}

export default connect(mapStatetoProps)(Items);
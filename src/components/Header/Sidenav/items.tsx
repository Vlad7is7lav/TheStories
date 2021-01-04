import React from 'react';
import FontAwesome from 'react-fontawesome';
import { routeSideLinks, IitemsLinks } from '../../../utils/routeSideLinks';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootUserReduce, RootStoryReduce } from '../../../store/reducers';

type C1 = {
    onHideNav: Function
    user: RootUserReduce
}

//Component that show all items for log off and log in clients 
const Items:React.FC<C1> = (props):JSX.Element => {
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


    //Function for optional menu links, that can see all people
    const showCommonLinks = () => (
        
        
        routeSideLinks.common.map((item:IitemsLinks,i:number)=> {
            if(props.user.auth && item.restricted) {
                
                return null
            }
            
            return element(item,i)
        })
    )
        
    //Function for Admin links, that can see only people are logged in
    const showAdminLinks = () => (
        routeSideLinks.admin.map((item:IitemsLinks,i:number)=> {
            return element(item,i)
        })
    )

    return (
        <div>
            {showCommonLinks()}

            {/* Check, if auth is true, you can get admin menu links */}
            {props.user.auth ? 
            
            <div>
                <div className="nav_split">
                    Admin options
                </div>
                {showAdminLinks()}
            </div>
            :
            null
        } 
        </div>
    )
}

type TGeneralState = {
    userReduce: RootUserReduce
    storyReduce: RootStoryReduce
}

type MapStateToPropsType = {
    user: RootUserReduce
}

const mapStatetoProps = function(state:TGeneralState):MapStateToPropsType {
    console.log(state.userReduce);

    // console.log('ee', state.storyReduce);
    
    return {
        user: state.userReduce
    }
}

// export default connect<MapStateToPropsType, {}, {}, TGeneralState>(mapStatetoProps)(Items);
export default connect(mapStatetoProps)(Items);
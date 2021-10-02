import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { logoutUser } from '../../store/actions/user_actions';
import { RouteComponentProps } from 'react-router-dom';
import { UserReduceStateType } from '../../store/reducers/TypesForUser';


type props = RouteComponentProps & {
    dispatch: Function
    user: UserReduceStateType
}

type state = {
    userReduce: UserReduceStateType
}


const Logout:React.FC<props> = (props) => {
    const logout = useSelector((state:state) => state.userReduce)
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(logoutUser())
    }
    ,[dispatch])

    useEffect(()=>{
        if (logout.auth === null){
            
            setTimeout(()=>{
                props.history.push('/')
            }, 2000)
        } 
       
    },[logout, props])

    return (
        <div className="logout_container">
            <h1>See you!</h1>
            {logout.auth}
        </div>
    )
}

export default Logout;
 
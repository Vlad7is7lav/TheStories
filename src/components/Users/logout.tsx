import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {IUserData} from '../../store/reducers/types'
import {TuserReduce} from '../../store/reducers/index';
import { logoutUser } from '../../store/actions/user_actions';
import { RouteComponentProps } from 'react-router-dom';
import { Dispatch, Action } from 'redux';


export interface Props2 extends RouteComponentProps {
    dispatch: Function
    user: propsAuth 
}

interface propsAuth {
    auth: boolean
    userData: object
}

type state = {
    userReduce: propsAuth
}


const Logout:React.FC<Props2> = (props) => {
    const logout = useSelector((state:state) => state.userReduce)
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(logoutUser())
        console.log(logout)
        // .then(()=> {
        //     console.log(logout.auth);
            
        //     setTimeout(()=>{
        //         props.history.push('/')
        //     }, 2000)
        // })
    }
    ,[dispatch])

    useEffect(()=>{
        if (logout.auth === null){
            console.log(logout.auth);
            
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
 
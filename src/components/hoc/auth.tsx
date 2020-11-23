import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators, Dispatch , Action} from 'redux';
import { History } from 'history';
import { auth } from '../../store/actions/user_actions';
import {RootState, TuserReduce} from '../../store/reducers/index'
// import {TuserReduce} from '../../store/reducers/index'
import {IUserData} from '../../store/reducers/types'

type TComposedClass = React.ComponentType<props>
type TReload = boolean

type state = {
    loading: boolean
}

interface props {
    dispatch: Function
    user: TuserReduce
    history: History
}

// type propsAuth = {
//     user: TuserReduce
//     history: History
//     dispatch: Function
// }



export default function(ComposedClass:React.ComponentType<props>, reload:TReload){
    class AuthCheck extends Component<props ,state> {
        state={
            loading: true
        }

        



        render() {
            if(this.state.loading){
                return <div>Loading...</div>
            }
            else {
                return <ComposedClass {...this.props} user={this.props.user}/>
            }
        }
    }

    function mapStateToProps(state:RootState) {
        return {
            user: state.userReduce
        }
    }

    type A = typeof AuthCheck;

    return connect(mapStateToProps)(AuthCheck)
}




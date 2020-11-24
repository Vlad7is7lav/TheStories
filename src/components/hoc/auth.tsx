import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators, Dispatch , Action} from 'redux';
import { History } from 'history';
import { auth } from '../../store/actions/user_actions';
import {RootState, TuserReduce} from '../../store/reducers/index'
import {IUserData} from '../../store/reducers/types'
import { boolean } from 'yup';

type state = {
    loading: boolean
}

interface propsAuth {
    auth: boolean
    userData: object
}

interface props {
    dispatch: Function
    user: propsAuth
    history: History
}


export default function(ComposedClass:React.ComponentType<props>, reload?:boolean){
    class AuthCheck extends Component<props ,state> {
        state={
            loading: true
        }

        componentDidMount() {
            this.props.dispatch(auth())
            .then(() => {
                let userAuth = this.props.user.auth;
                this.setState({loading: false});
                console.log(userAuth)
                if (!userAuth) {this.props.history.push('/login')}
                else {this.props.history.push('/admin')}
            })
        }

        render() {
            if(this.state.loading){
                return <div>Loading...</div>
            }
            return (
                <ComposedClass {...this.props} user={this.props.user}/>
            )
        }
    }

    type TState = {
        userReduce: propsAuth
        storyReduce: propsAuth
    }

    function mapStateToProps(state:TState):{} {
        return {
            user: state.userReduce
        }
    }

    return connect(mapStateToProps)(AuthCheck)
}




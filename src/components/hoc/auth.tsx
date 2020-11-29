import React, { Component, ReactComponentElement } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators, Dispatch , Action} from 'redux';
import { History } from 'history';
import { auth } from '../../store/actions/user_actions';
import {RootState, TuserReduce} from '../../store/reducers/index'
import {IUserData} from '../../store/reducers/types'
import { RouteComponentProps } from 'react-router-dom';

type state = {
    loading: boolean
}

interface propsAuth {
    auth: boolean
    userData: object
}

interface props extends RouteComponentProps{
    dispatch: Function
    user: propsAuth

}

interface Props2 extends RouteComponentProps {
    dispatch: Function
    user: propsAuth
}

type TComposedClass = React.ComponentType<props> | React.FunctionComponent<Props2>


export default function(ComposedClass:TComposedClass, reload?:boolean){
    class AuthCheck extends Component<props ,state> {
        state={
            loading: true
        }

        componentDidMount() {
            this.props.dispatch(auth())
            .then(() => {
                let userAuth = this.props.user.auth;
                this.setState({loading: false});

                
                if (!userAuth) {
                    if(reload) {
                        this.props.history.push('/login')
                    }
                }
                else {
                    if(reload === false) {
                        this.props.history.push('/admin')
                    }
                    
                }
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




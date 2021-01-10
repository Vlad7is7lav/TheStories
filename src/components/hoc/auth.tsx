import React, { Component } from 'react';
import {connect} from 'react-redux';
import { auth } from '../../store/actions/user_actions';
import {RootStoryReduce, RootUserReduce} from '../../store/reducers/index'
import { RouteComponentProps } from 'react-router-dom';
import { UserReduceStateType } from '../../store/reducers/TypesForUser';
import { StoryReduceStateType } from '../../store/reducers/TypesForStory';
import { Dispatch } from 'redux';

type props = RouteComponentProps & {
    dispatch: Function
    user: UserReduceStateType
}

type props2 = RouteComponentProps & {
    dispatch: Function
    story: StoryReduceStateType
}

type state = {
    loading: boolean
}

type TComposedClass = React.ComponentType<props | props2> | React.FunctionComponent<props>

export default function(ComposedClass:TComposedClass, reload?:boolean){
    class AuthCheck extends Component<props, state> {
        state={
            loading: true
        }

        componentDidMount() {
            this.props.dispatch(auth()) 
            .then(() => {
                let userAuth = this.props.user.auth;
                this.setState({loading: false});
                
                

                // if user log off but try to get page with private information, he goes to /login page
                if (!userAuth) {
                    if(reload) {
                        this.props.history.push('/login')
                    }
                }
                // if user log in
                else {
                    // and reload props that come from route is false then go to the admin page 
                    // for LoginForm component
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
    
    type TGeneralState = {
        userReduce: RootUserReduce
        storyReduce: RootStoryReduce
    }

   
   
    type MapStateToPropsType = {
        user: UserReduceStateType
    }

    function mapStateToProps(state:TGeneralState):MapStateToPropsType {
        return {
            user: state.userReduce
        }
    }

    const mapDispatchToProps = (dispatch: Dispatch)=> ({
        auth: auth,
        dispatch
      });

    return connect<MapStateToPropsType, typeof mapDispatchToProps, {} , TGeneralState>(mapStateToProps, mapDispatchToProps)(AuthCheck)
}
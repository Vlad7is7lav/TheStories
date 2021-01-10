import React, { Component } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {RootStoryReduce, RootUserReduce} from '../../store/reducers/index';
import { RouteComponentProps } from 'react-router-dom';

import {connect} from 'react-redux';
import { loginUser } from '../../store/actions/user_actions';
import { UserReduceStateType } from '../../store/reducers/TypesForUser';

// use this in Formik
interface MyFormValues {
    email: string,
    password: string
  }

type state = {
    success: boolean
    validation: boolean
}

interface props extends RouteComponentProps {
    dispatch: Function
    user: UserReduceStateType
}

class LoginForm extends Component<props, state> {

    // use this in Formik
    initialValues: MyFormValues = {email: 'vlad111@gmail.com', password: 'passvlad123'}

    state = {
        success: false,
        validation: false
    }

    //Scheme check for Formik
    LoginScheme = Yup.object().shape({
        email: Yup.string().trim().email('Invalid email').required('Email is required!'), 
        password: Yup.string().min(8,'The minimum length is 8').trim().required('Password is required!')
    })

    static getDerivedStateFromProps(props:props, state:state) {
        
        const auth = props.user.auth;
        if(auth){
            return {
                success: auth ? true : false
            }
        }
        
        return null
    }

    //call this function when we try to login and get info from server true or false
    componentDidUpdate() {
        if(this.state.success) {
            this.props.history.push('/admin')
        }
    }

    render() {
        return (
            
                <div className="container from_container">
                    <h1>
                        Welcome
                    </h1>
                    <hr/>
                    <h4>Sign in right here</h4>
                    <Formik 
                        initialValues={this.initialValues}
                        validationSchema={this.LoginScheme}
                        onSubmit={(values) => {
                            this.props.dispatch(loginUser(values))
                            .then(() => {
                                if(!this.props.user.auth){                                    
                                    this.setState({
                                        validation: true
                                    })
                                }
                                
                            })
                        }}
                    >

                        {props => (
                            <Form onSubmit={props.handleSubmit}>
                                <div className="twelve columns">
                                    <label>Email</label>
                                    <input 
                                        type="email" 
                                        name="email"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.email}
                                        placeholder="Enter your email"
                                        className="u-full-width"
                                    />   

                                    {props.errors.email && props.touched.email ? 
                                        <div className="error_label">
                                            {props.errors.email}
                                        </div>    
                                        :
                                        null
                                }
                                </div>

                                <div>
                                    <label>Password</label>
                                    <input 
                                        type="password" 
                                        name="password"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.password}
                                        placeholder="Enter your password"
                                        className="u-full-width"
                                    />   

                                    {props.errors.password && props.touched.password ? 
                                        <div className="error_label">
                                            {props.errors.password}
                                        </div>    
                                        :
                                        null
                                }
                                </div>

                                <button type="submit">
                                    Login
                                </button>
                                <br/>
                                {
                                    this.state.validation ?
                                    <div className="error_label">
                                        Error, please try again
                                    </div>
                                    :
                                    null
                                }
                            </Form>
                        )}   
                    </Formik>
                </div>
        )
    }
}

type TGeneralState= {
    userReduce: RootUserReduce
    storyReduce: RootStoryReduce
}

type MapStateToPropsType = {
    user: UserReduceStateType
}

const dispatchToProps = {
    loginUser: loginUser
  }

function mapStateToProps(state:TGeneralState):MapStateToPropsType {
    return {
        user: state.userReduce
    }
}

export default connect<MapStateToPropsType, typeof dispatchToProps, {}, TGeneralState>(mapStateToProps)(LoginForm);
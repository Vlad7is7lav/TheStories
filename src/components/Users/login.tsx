import React, { Component } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import {connect} from 'react-redux';
import { loginUser } from '../../store/actions/user_actions';

interface MyFormValues {
    email: string,
    password: string
  }

type state = {
    succes: boolean
    validation: boolean
}

type props = {
    dispatch: Function
}

class LoginForm extends Component<props, state> {

    initialValues: MyFormValues = {email: 'vlad111@gmail.com', password: 'passvlad123'}

    state = {
        succes: false,
        validation: false
    }

    LoginScheme = Yup.object().shape({
        email: Yup.string().trim().email('Invalid email').required('Email is required!'), 
        password: Yup.string().min(8,'The minimum length is 8').trim().required('Password is required!')
    })


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
                        onSubmit={values => {
                            this.props.dispatch(loginUser(values))
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
                            </Form>
                        )}

                    
                        
                    </Formik>

                </div>
        )
    }
}

function mapStateToProps(state:any) {
    return {
        user: state.userReduce
    }
}


export default connect(mapStateToProps)(LoginForm);
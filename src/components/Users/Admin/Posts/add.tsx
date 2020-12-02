import React, { ChangeEvent, Component } from 'react';
import {Link} from 'react-router-dom';
import {Formik, Form, withFormik, FormikProps, FormikHandlers} from 'formik';
import AdminLayout from '../../../hoc/adminLayout'
import {CreateFormElement} from '../Posts/addition/addition'
import {StorySchema} from '../Posts/addition/addition'
// import {ICreateFormElement} from '../Posts/addition/addition'
import {IUserData} from '../../../../store/reducers/types'
import { RouteComponentProps } from 'react-router-dom';
import {connect} from 'react-redux';

interface MyFormValues {
    name: string
    author: string
    content?: string
    pages: string
    rating: string
  }

  type state = {
    editorState: string
    editorContent: string
    success: boolean
}

interface propsAuth {
    auth: boolean
    userData: object
}

interface props extends RouteComponentProps {
    dispatch: Function
    user: propsAuth
    }

    // type props1 = FormikProps<MyFormValues> & props

class AddPost extends Component<props, state> {

    initialValues: MyFormValues = {
        name: '', 
        author: '',
        pages: '',
        rating: ''
    }

    state={
        editorState:'',
        editorContent:'',
        success: false
    }


    render() {
        return (
            <AdminLayout>
                <h4>Add a post</h4>

                <Formik
                    initialValues={this.initialValues}
                    validationSchema={StorySchema}
                    onSubmit={(values)=>{

                    }}
                
                
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit
                    })=>(
                        <Form onSubmit={handleSubmit}>

                            <CreateFormElement 
                                elData={{element: 'input', type: 'text', value: values.name}}
                                placeholder="Title of Story"
                                name="name"
                                onChange={(e: React.FormEvent<EventTarget>)=>handleChange(e)}
                                onBlur={(e: React.FormEvent<EventTarget>)=>handleBlur(e)}
                                errors={errors.name}
                                touched={touched.name}                            
                            />

                            <h4>Story info</h4>

                            <CreateFormElement 
                                elData={{element: 'input', type: 'text', value: values.author}}
                                placeholder="Author's name"
                                name="author"
                                onChange={(e: React.FormEvent<EventTarget>)=>handleChange(e)}
                                onBlur={(e: React.FormEvent<EventTarget>)=>handleBlur(e)}
                                errors={errors.author}
                                touched={touched.author}                            
                            />

                            <CreateFormElement 
                                elData={{element: 'input', type: 'text', value: values.pages}}
                                placeholder="Pages"
                                name="pages"
                                onChange={(e: React.FormEvent<EventTarget>)=>handleChange(e)}
                                onBlur={(e: React.FormEvent<EventTarget>)=>handleBlur(e)}
                                errors={errors.pages}
                                touched={touched.pages}                            
                            />  

                            <CreateFormElement 
                                elData={{element: 'select', value: values.rating}}
                                name="rating"
                                onChange={(e: React.FormEvent<EventTarget>)=>handleChange(e)}
                                onBlur={(e: React.FormEvent<EventTarget>)=>handleBlur(e)}
                                errors={errors.rating}
                                touched={touched.rating}                            
                            > 
                                <option defaultChecked>Select a rating</option>
                                <option value="1" >1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </CreateFormElement>

                            <button type="submit">
                                Add book
                            </button>


                        </Form>
                    )}

                </Formik>
            </AdminLayout>
        )
    }
}

type TState = {
    userReduce: propsAuth
    storyReduce: propsAuth
}

// const mapStatetoProps = function(state:TState) {
//     return {
//         user: state.userReduce
//     }
// }



// export default connect(mapStatetoProps)(AddPost);

export default AddPost
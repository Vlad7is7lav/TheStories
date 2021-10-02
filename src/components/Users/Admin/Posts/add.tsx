import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Formik, Form } from 'formik';
import AdminLayout from '../../../hoc/adminLayout';
import {CreateFormElement, onWordsCount} from '../Posts/addition/addition';
import {StorySchema} from '../Posts/addition/addition';
import {IStoryData, StoryReduceStateType} from '../../../../store/reducers/TypesForStory'
import { RouteComponentProps } from 'react-router-dom';

import { EditorState } from "draft-js";
import {stateToHTML} from 'draft-js-export-html';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import {addStory, clearStory} from '../../../../store/actions/story_actions';

import {connect} from 'react-redux';
import { RootStoryReduce, RootUserReduce } from '../../../../store/reducers';

interface MyFormValues {
    name: string
    author: string
    content?: string
    words: number
    // rating: string
  }

type state = {
    editorState: any
    editorContent: string
    success: boolean
    words: number
}

interface props extends RouteComponentProps {
    dispatch: Function
    user: RootUserReduce
    story: StoryReduceStateType
}


class AddPost extends Component<props, state> {

    state={
        editorState: EditorState.createEmpty(),
        editorContent:'',
        success: false,
        words: 0
    }

    initialValues: MyFormValues = {
        name: '', 
        author: '',
        words: this.state.words
    }

    

    onEditorStateChange = (editorState:any) => {
        this.setState({
            editorState,
            editorContent: stateToHTML(editorState.getCurrentContent())
        }); 
        // this.onBlurWordsCount(this.state.editorContent)
    }

    onBlurWordsCount = (content:any) => {
        let num:number = onWordsCount(content);

        this.initialValues.words = num   
        this.setState({words: num})
    }

    postStory = (values:IStoryData) => {
        values.words = onWordsCount(values.content);
        this.props.dispatch(addStory(values))
    }

    // Check if update was successed 
    componentDidUpdate(prevProps:props) {
        const hasChanged = this.props.story !== prevProps.story;
        if(hasChanged) {
            this.setState({
                success: true
            })
        }
    }

    

    // clear redux store
    componentWillUnmount() {
        this.props.dispatch(clearStory());
    }

    render() {
        return (
            <AdminLayout>
                <h4>Add a post</h4>

                <Formik
                    initialValues={this.initialValues}
                    validationSchema={StorySchema}
                    onSubmit={(values, {resetForm})=>{
                        this.postStory({
                            ...values,
                            content: this.state.editorContent
                        });
                        resetForm();
                        this.setState({
                            editorState: EditorState.createEmpty(),
                            editorContent:'',
                        })
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

                            <Editor
                                editorState={this.state.editorState}
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                onEditorStateChange={this.onEditorStateChange}
                                onChange={()=> this.onBlurWordsCount(this.state.editorContent)}
                                // onBlur={()=> this.onBlurWordsCount(this.state.editorContent)}
                            />

                            <div className="row">
                                <div className="twelve_columns">
                                    <div className="u-full-width">
                                        Words: {this.state.words}
                                    </div> 
                                </div>
                            </div>

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
                           

                            <button type="submit">
                                Add story
                            </button>

                            {
                                this.state.success ?

                                <div className="success_entry">
                                    <div>Story is added!</div>
                                    {(this.props.story != null) ? 
                                    
                                    <Link to={`/article/${this.props.story.add?.bookId}`}>
                                        Find your story here...
                                    </Link>
                                    
                                    : 
                                    'null '
                                }
                                </div>
                                : null
                            }


                        </Form>
                    )}

                </Formik>
            </AdminLayout>
        )
    }
}

type TGeneralState = {
    userReduce: RootUserReduce
    storyReduce: RootStoryReduce
}

type MapStateToPropsType = {
    story: any
    // story: StoryReduceStateType
}

const dispatchToProps = {
    addStory: addStory
  }

const mapStatetoProps = function(state:TGeneralState):MapStateToPropsType {
    return {
        story: state.storyReduce
    }
}

export default connect<MapStateToPropsType, typeof dispatchToProps, {},TGeneralState>(mapStatetoProps)(AddPost);
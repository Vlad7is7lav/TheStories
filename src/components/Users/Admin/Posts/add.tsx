import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Formik, Form } from 'formik';
import AdminLayout from '../../../hoc/adminLayout';
import {CreateFormElement} from '../Posts/addition/addition';
import {StorySchema} from '../Posts/addition/addition';
import {IStoryData, StoryReduceStateType} from '../../../../store/reducers/TypesForStory'
import { RouteComponentProps } from 'react-router-dom';

import htmlToDraft from 'html-to-draftjs';
import getText from 'html-to-draftjs';
import { EditorState } from "draft-js";
import {stateToHTML} from 'draft-js-export-html';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import {addStory, clearStory} from '../../../../store/actions/story_actions';

import {connect} from 'react-redux';
import { RootStoryReduce, RootUserReduce } from '../../../../store/reducers';
import { string } from 'yup';

interface MyFormValues {
    name: string
    author: string
    content?: string
    pages: string
    // rating: string
  }

type state = {
    editorState: any
    editorContent: string
    success: boolean
}

interface props extends RouteComponentProps {
    dispatch: Function
    user: RootUserReduce
    story: StoryReduceStateType
}


class AddPost extends Component<props, state> {

    initialValues: MyFormValues = {
        name: '', 
        author: '',
        pages: ''
    }

    state={
        editorState: EditorState.createEmpty(),
        editorContent:'',
        success: false
    }

    onWordsCount = (text:any) => {
        if (!text) return;
        let newText:any = getText(text).contentBlocks[0].getText();

        const p1 = new RegExp('/(^\s*)|(\s*$)/gi');
        const p2 = new RegExp('/[ ]{2,}/gi');
        const p3 = new RegExp('/\n /');
        
        newText = newText.replace(p1,"");
        newText = newText.replace(p2," ");
        newText = newText.replace(p3,"\n");
        
        
        let counterArray:Array<any> = newText.split(' ');
        console.log(newText, 'rr');
        for(let i=0; i < counterArray.length; i++){
            if(counterArray[i] == "" || counterArray[i].length < 2) {
                console.log(counterArray, 'tt');
                counterArray.splice(i, 1);
                i--;
            }
        }  
    }

    onEditorStateChange = (editorState:any) => {
        this.setState({
            editorState,
            editorContent: stateToHTML(editorState.getCurrentContent())
        });
        
    }

    postStory = (values:IStoryData) => {
        this.onWordsCount(values.content);
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

                            {/* <CreateFormElement 
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
                            </CreateFormElement> */}

                            

                            <button type="submit">
                                Add story
                            </button>

                            {
                                this.state.success ?

                                <div className="success_entry">
                                    <div>Story is added!</div>
                                    {(this.props.story.add != null) ? 
                                    
                                    <Link to={`/article/${this.props.story.add.bookId}`}>
                                        Find your story here...
                                    </Link>
                                    
                                    : 
                                    null
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
    story: StoryReduceStateType
}

const mapStatetoProps = function(state:TGeneralState):MapStateToPropsType {
    return {
        story: state.storyReduce
    }
}

export default connect<MapStateToPropsType, {},{},TGeneralState>(mapStatetoProps)(AddPost);
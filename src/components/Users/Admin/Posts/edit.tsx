import React, { ChangeEvent, Component } from 'react';
import {Link} from 'react-router-dom';
import {Formik, Form, withFormik, FormikProps, FormikHandlers} from 'formik';
import AdminLayout from '../../../hoc/adminLayout';
import {CreateFormElement} from '../Posts/addition/addition';
import {StorySchema} from '../Posts/addition/addition';
// import {ICreateFormElement} from '../Posts/addition/addition'
import {IStoryData, added, StoryReduceStateType} from '../../../../store/reducers/TypesForStory'
import { RouteComponentProps } from 'react-router-dom';

import htmlToDraft from 'html-to-draftjs';
import { EditorState, ContentState } from "draft-js";
import {stateToHTML} from 'draft-js-export-html';
import { Editor, EditorProps } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import {updateStory, clearStory, getStory} from '../../../../store/actions/story_actions';

import {connect} from 'react-redux';
import { RootUserReduce, RootStoryReduce } from '../../../../store/reducers';
import { UserReduceStateType } from '../../../../store/reducers/TypesForUser';

// interface MyValues {
//     _id: string
//     name: string
//     author: string
//     pages: string
//     rating: string
//   }

interface state {
    editorState: any
    editorContent: string
    success: boolean
    loading: boolean
    htmlToEdit: Omit<IStoryData, "content">
}

interface propsAuth {
    auth: boolean
    userData: object
}

interface props extends RouteComponentProps {
    dispatch: Function
    user: UserReduceStateType
    story: {
        add: IStoryData | false //if didn't get data then false
        update: {
            success: boolean
            doc: IStoryData 
        }
    }
    // story: StoryReduceStateType
    match: any  //???????????????????
}

class EditPost extends Component<props, state> {

    state: state={
        editorState: '',
        editorContent:'',
        success: false, 
        loading: true,
        htmlToEdit: {
            _id: '',
            name: '',
            author: '',
            pages: '',
            rating: ''
        }
    }

    onEditorStateChange = (editorState:any) => {
        this.setState({
            editorState
        })
    }

    onUpdateStory = (values:IStoryData) => {
        this.props.dispatch(updateStory(values))
    }

    componentDidUpdate(prevProps:props) {
        const hasChanged = this.props.story.add !== prevProps.story.add;
        const hasUpdated = this.props.story.update !== prevProps.story.update;
        const storyData = this.props.story.add

        //If hasUpdated = true, success = true and show message that data updated successfully!
        if(hasUpdated) {
            this.setState({ success: true })
        }
        console.log(storyData);
        
        // if we didn't get data ->  got to home page
        if (storyData !== false && storyData !== null) {
            const blocksFromHtml = htmlToDraft(storyData.content)
            const {contentBlocks, entityMap} = blocksFromHtml
            const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
            
            if(hasChanged) {      
                this.setState({
                    loading: false,
                    editorState: EditorState.createWithContent(contentState),
                    htmlToEdit: {
                        _id: storyData._id,
                        author: storyData.author,
                        name: storyData.name,
                        pages: storyData.pages,
                        rating: storyData.rating
                    }
                })
            }
        } else {
            this.props.history.push('/')
        }

        
    }

    componentWillUnmount() {
       this.props.dispatch(clearStory())
    }

    componentDidMount() {
        this.props.dispatch(getStory(this.props.match.params.id));
    }


    render() {
        return this.state.loading ? 
            <>Loading</>

            :

            <AdminLayout>
                <h4>Add a post</h4>

                <Formik
                    enableReinitialize={true}
                    initialValues={this.state.htmlToEdit}
                    validationSchema={StorySchema}
                    onSubmit={(values, {resetForm})=>{
                        this.onUpdateStory({
                            ...values,
                            content: stateToHTML(this.state.editorState.getCurrentContent())
                        });
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

                            <input 
                                type="hidden"
                                name="_id"
                                value="values._id" />

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
                                Add story
                            </button>

                            {
                                this.state.success ?

                                <div className="success_entry">
                                    <div>Story is updated!</div>
                                    {(this.props.story.update === null) ? null
                                    :
                                    <Link to={`/article/${this.props.story.update.doc._id}`}>
                                        Find your story here...
                                    </Link>
                                        }
                                    
                                </div>
                                : null
                            
                            
                            }


                        </Form>
                    )}

                </Formik>
            </AdminLayout>
        
    }
}

type TState = {
    userReduce: propsAuth
    storyReduce: any
}

type TGeneralState = {
    userReduce: RootUserReduce
    storyReduce: RootStoryReduce
}

type MapStateToPropsType = {
    story: any
}

const mapStatetoProps = function(state:TGeneralState):MapStateToPropsType {
    return {
        story: state.storyReduce
    }
}



export default connect(mapStatetoProps)(EditPost);
import React, {useState, useEffect } from 'react';
import { Form, Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import  { auth, updateUser } from '../../../store/actions/user_actions';
import { CreateFormElement } from './Posts/addition/addition';
import { UserReduceActionType, UserReduceStateType } from '../../../store/reducers/TypesForUser';
import { RootUserReduce, RootStoryReduce } from '../../../store/reducers';

interface IAdminValues {
    id: string
    email: string
    password?: string
    name: string
    lastname?: string
    age?: string
    country?: string
    city?: string
    favBooks?: string
}

type props  = {
    dispatch: Function
    user: UserReduceStateType
}

type TGeneralState = {
    userReduce: RootUserReduce
    storyReduce: RootStoryReduce
}

const Admin: React.FC<props> = (props) => {

    const userinfo = useSelector((state:TGeneralState) => state.userReduce);
    const dispatch = useDispatch();
    const [success, setSuccess] = useState<boolean>(false)
    
    useEffect(()=> {
        dispatch(auth());
    }, [dispatch])

    const go = (success: boolean) => {
        setSuccess(success);
        setTimeout(()=>{
            setSuccess(false)
        }, 1500)
    }

    if (userinfo.userData === null ||  userinfo.userData === false) return (<> </>)
    const userValues:IAdminValues = {
        id: userinfo.userData.id,
        email: userinfo.userData.email,
        name: userinfo.userData.name,
        lastname: userinfo.userData.lastname,
        age: userinfo.userData.age || '',
        country: userinfo.userData.country || '',
        city: userinfo.userData.city || '',
        favBooks: userinfo.userData.favBooks || ''
    }

    return (
        <div>
            <h3>My information</h3>

            <Formik
            initialValues={userValues}
            onSubmit={(values)=>{
                props.dispatch(updateUser({
                    auth: props.user.auth,
                    userData: values
                })).then((response:UserReduceActionType) => {
                    if(response.payload.success){
                        go(response.payload.success);
                    }
                })
            }}
            >
                {
                    ({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleSubmit,
                        handleBlur
                    })=>(
                        <Form onSubmit={handleSubmit}>

                            <h5>Email</h5>
                            <CreateFormElement 
                                elData={{element: 'input', type: 'text', value: values.email}}
                                name="email"
                                onChange={(e: React.FormEvent<EventTarget>)=>handleChange(e)}
                                onBlur={(e: React.FormEvent<EventTarget>)=>handleBlur(e)}
                                errors={errors.email}
                                touched={touched.email}                            
                            />

                            <h5>First name</h5>
                            <CreateFormElement 
                                elData={{element: 'input', type: 'text', value: values.name}}
                                name="name"
                                onChange={(e: React.FormEvent<EventTarget>)=>handleChange(e)}
                                onBlur={(e: React.FormEvent<EventTarget>)=>handleBlur(e)}
                                errors={errors.name}
                                touched={touched.name}                            
                            />    

                            <h5>First name</h5>
                            <CreateFormElement 
                                elData={{element: 'input', type: 'text', value: values.lastname}}
                                name="lastname"
                                onChange={(e: React.FormEvent<EventTarget>)=>handleChange(e)}
                                onBlur={(e: React.FormEvent<EventTarget>)=>handleBlur(e)}
                                errors={errors.lastname}
                                touched={touched.lastname}                            
                            />   
                            <h5>Country</h5>
                            <CreateFormElement 
                                elData={{element: 'input', type: 'text', value: values.country}}
                                name="country"
                                onChange={(e: React.FormEvent<EventTarget>)=>handleChange(e)}
                                onBlur={(e: React.FormEvent<EventTarget>)=>handleBlur(e)}
                                errors={errors.country}
                                touched={touched.country}                            
                            />
                            <h5>City</h5>
                            <CreateFormElement 
                                elData={{element: 'input', type: 'text', value: values.city}}
                                name="city"
                                onChange={(e: React.FormEvent<EventTarget>)=>handleChange(e)}
                                onBlur={(e: React.FormEvent<EventTarget>)=>handleBlur(e)}
                                errors={errors.city}
                                touched={touched.city}                            
                            />
                            <h5>Favourite books</h5>

                            <textarea 
                                rows={5}
                                cols={30}
                                id="textarea"
                                name="favBooks"
                                value = {values.favBooks}
                                onChange = {(e: React.FormEvent<EventTarget>)=>handleChange(e)}
                                onBlur = {(e: React.FormEvent<EventTarget>)=>handleChange(e)}
                            >
                                </textarea>
                       
                            <div>
                                <button type="submit">
                                    Update
                                </button>
                            </div>

                            {   success ? 
                                <div className="Success updated">
                                    <div>Updated!</div>
                                </div>
                                :
                                null
                            }

                        </Form>
                    )
                }
            
            
            
            
            </Formik>     
        </div>
    )
}




export default Admin;
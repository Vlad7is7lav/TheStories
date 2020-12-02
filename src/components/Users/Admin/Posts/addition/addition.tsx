import React from 'react';
import {Formik, Form, withFormik, FormikProps, FormikHandlers} from 'formik';
import * as Yup from 'yup'

type out = JSX.Element | null

export interface ICreateFormElement {
    elData: {
        element: string
        type?: string
        value: string
    }
    name: string | undefined
    placeholder?: string
    onChange: (e: React.FormEvent<EventTarget>) => void
    onBlur: (e: React.FormEvent<EventTarget>) => void
    errors: string | undefined
    touched: boolean | undefined
    children?: JSX.Element[]

}

export const StorySchema = Yup.object().shape({
    name: Yup.string().required('Required'), 
    author: Yup.string().required('Required'),
    pages: Yup.number().required('Required'),
    rating: Yup.number().required('Required')
})

export const CreateFormElement = (props:ICreateFormElement):any => {
    let template = null

    switch(props.elData.element) {
        case "input": 
            template = <div className="row">
                <div className="twelve_columns">
                    <input 
                        type={props.elData.type} 
                        name={props.name} 
                        value={props.elData.value}
                        placeholder={props.placeholder} 
                        onChange={(e)=>props.onChange(e)}  
                        onBlur={(e)=>props.onBlur(e)}  
                        className="u-full-width"
                        
                    />

                {props.errors && props.touched ? 
                    <div className="error_label">
                        {props.errors}
                    </div>    
                    :
                    null
                }
                </div>

            </div>
            break;

        case "select": 
            template = <div className="row">
                <div className="twelve_columns">
                    <select 
                        name={props.name}
                        onChange={(e)=>props.onChange(e)}  
                        onBlur={(e)=>props.onBlur(e)} 
                        value={props.elData.value}
                        className="u-full-width"
                    >
                        {props.children}
                    </select>

                    {props.errors && props.touched ? 
                    <div className="error_label">
                        {props.errors}
                    </div>    
                    :
                    null
                }
                    
                </div>

            </div>
        break;


        default:
            return null

    }

    return template
}
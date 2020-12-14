import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import {getStory, clearStory} from '../../store/actions/story_actions'
import {IStoryData} from '../../store/reducers/types'

interface IStoryDataWithOwner extends IStoryData {
    ownerId: {
        name: string
    }
}

interface props extends RouteComponentProps {
    dispatch: Function
    match: any
    story: {
        add: IStoryDataWithOwner | false //if didn't get data then false
        update: {
            success: boolean
            doc: IStoryData
        }
    }
}

type state = {
    storyReduce: {
        add: IStoryDataWithOwner | false
    }
}



const Article:React.FC<props> = (props) => {
    
    // const [article, setArticle] = useState()

    const article = useSelector((state:state) => state.storyReduce);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getStory(props.match.params.id));
        return ( () => {dispatch(clearStory())})
        

    }, [dispatch, props])

    const showArticle = () => {
        if(article.add) {
            const a = article.add;
            return (
                <div className="single_article_container">
                    <div className="top">
                        <h3>{a.name}</h3>
                        <div><span>Author:</span>{a.author}</div> 
                        <div><span>Rating:</span>{a.rating}</div> 
                        <div><span>Pages:</span>{a.pages}</div>
                    </div>
                    <div className="content">
                        <div 
                            className="article_content" 
                            dangerouslySetInnerHTML={{
                            __html: article.add.content}}>
                        </div>
                    </div>
                    <div>
                        <i>Reviewed by {a.ownerId.name}</i>
                    </div>
                </div>
            )
        }
    }


    
    return (
            <div className="container">
                {showArticle()}    
                <div>
                    {article.add === false ? 
                        <div>
                            The story isn't found
                        </div>   
                        :
                        null
                    } 
                </div>      
            </div>

    )
    
}

export default Article;
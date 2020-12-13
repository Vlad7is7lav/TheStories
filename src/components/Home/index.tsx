import React, { Component } from 'react';
import {connect} from 'react-redux';
import { getStories } from '../../store/actions/story_actions';
import { added, IUserData } from '../../store/reducers/types';
import { RouteComponentProps } from 'react-router-dom';
import {Link} from 'react-router-dom'

interface propsAuth {
    auth: boolean
    userData: object
}

type TState = {
    userReduce: propsAuth
    storyReduce: added 
}

type state = {

}

interface props extends RouteComponentProps {
    dispatch: Function
    story: added
}

type TRow = {
    name: string
}



class Home extends Component<props, state> {

    componentDidMount() {
        this.props.dispatch(getStories(4,0,'desc'))
    }

    loadmore = () => {
        let storyList = this.props.story.collection;
        let countToSkip = storyList.length;
        this.props.dispatch(getStories(2,countToSkip,'desc',storyList));
    }

    showArtciles = (story:added) => {
      if(story.collection) {
        const rowsArray:Array<IUserData[]> = this.rowGenerator(story.collection, 2)
        const generateArticles = this.generateRowBlocks(rowsArray, 'six')
        return generateArticles
      } else {
          return false
      }
    }

    generateRowBlocks = (rows:Array<IUserData[]>, cl: string) => (
        rows.map((row:Array<IUserData>, i:number) => (
                <div className="row" key={i}>
                    {
                        row.map((el:any) => (
                            
                            <div key={el._id} className={`${cl} columns article_block`}>{el.name}
                                <Link to={`/article/${el._id}`}>
                                    <div className="top">
                                        <h3>{el.name}</h3>
                                    </div>
                                    <div className="content">
                                       <div><span>Author:</span>{el.author}</div> 
                                       <div><span>Our rating:</span>{el.rating}</div> 
                                       <div><span>Pages:</span>{el.pages}</div> 
                                    </div>
                                </Link>
                            </div>
                            
                        ))
                    }
                </div>
            )
        )
    )

    rowGenerator = (lists:Array<IUserData>, cols:number) => {
        const rows = [...Array(Math.ceil(lists.length/cols))];
        const articlesRows = rows.map((row:any, i:number) => lists.slice(i*cols,i*cols+cols)
        )

        return articlesRows

    }

    render(){
        return (
            <div className="container">
                <div className="row articles_container">
                   {this.showArtciles(this.props.story)}
                </div>

                <div 
                    className="loadmore"
                    onClick={this.loadmore}
                >
                    LoadMore
                </div>

            </div>
        )
    }
}





function mapStateToProps (state: TState) {
    return {
        story: state.storyReduce
    }
}

export default connect(mapStateToProps)(Home);
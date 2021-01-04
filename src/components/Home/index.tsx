import React, { Component } from 'react';
import {connect} from 'react-redux';
import { getStories } from '../../store/actions/story_actions';
import { added, IStoryData, StoryReduceStateType } from '../../store/reducers/TypesForStory';
import { RouteComponentProps } from 'react-router-dom';
import {Link} from 'react-router-dom'
import { UserReduceStateType } from '../../store/reducers/TypesForUser';
import { RootUserReduce, RootStoryReduce } from '../../store/reducers';

type props = RouteComponentProps & {
    dispatch: Function
    story: RootStoryReduce
}

type tr = {
    collection: Array<IStoryData>
}

class Home extends Component<props> {

    // function to get all stories
    componentDidMount() {
        this.props.dispatch(getStories(4,0,'desc'))
    }

    // function for button loadmore, if user wants to see more
    loadmore = () => {
        let storyList = this.props.story.collection;
        let countToSkip = storyList.length;
        this.props.dispatch(getStories(2,countToSkip,'desc',storyList));
    }

    //finish function that use inside render to get generated list of aticles, stories 
    showArtciles = (story:tr) => {
      if(story.collection) {
        const rowsArray:IStoryData[][] = this.rowGenerator(story.collection, 2)
        const generateArticles = this.generateRowBlocks(rowsArray, 'six')
        return generateArticles
      } else {
          return false
      }
    }

    //function, where you can select how many rows you want to show
    //and return Array of arrays with articles (every array inside Array contain articles in amount of "cols" )
    rowGenerator = (lists:Array<IStoryData>, cols:number) => {
        const rows = [...Array(Math.ceil(lists.length/cols))];
        const articlesRows = rows.map((row:[], i:number) => lists.slice(i*cols,i*cols+cols)
        )
        return articlesRows
    }

    // 
    generateRowBlocks = (rows:Array<IStoryData[]>, cl: string) => (
        rows.map((row:Array<IStoryData>, i:number) => (
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

    

    render(){
        return (
            <div className="container">
                <div className="row articles_container">
                   {this.showArtciles(this.props.story)}
                </div>
                
                {/* if dispatch function return 0 collection, 
                it means we have problem and can't get articles from database */}
                
                {(this.props.story.collection) ?
                    <div 
                        className="loadmore"
                        onClick={this.loadmore}
                    >
                        LoadMore
                    </div>

                :
                null
                }
                {/* <div 
                    className="loadmore"
                    onClick={this.loadmore}
                >
                    LoadMore
                </div> */}

            </div>
        )
    }
}

type TGeneralState = {
    userReduce: RootUserReduce
    storyReduce: RootStoryReduce
}

type MapStateToPropsType = {
    user: UserReduceStateType
    story: RootStoryReduce
}

const dispatchToProps = {
    getStories: getStories
  }

function mapStateToProps (state: TGeneralState):MapStateToPropsType {
    return {
        story: state.storyReduce,
        user: state.userReduce
    }
}

export default connect<MapStateToPropsType, typeof dispatchToProps, {}, TGeneralState>(mapStateToProps,dispatchToProps)(Home);
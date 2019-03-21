import React from 'react';
import {connect} from 'react-redux';
import './progress.css';
import {getProgress} from '../actions/progress';
export class Progress extends React.Component{
    
    handleClick(){
        this.props.dispatch(getProgress());
    }



    render(){
    
    
    const progressGuesses = <p>You've seen {this.props.progressData.currWord} {this.props.progressData.totalTimesGuessed} time{this.props.progressData.totalTimesGuessed === 1 ? '' : 's'}</p>;
    const progressCorrect = <p>You've gotten it correct {Math.trunc(this.props.progressData.percentCorrect)}% of the time</p> 
    if(this.props.progress){
    return (
        <div className='progressContainer'>
          <button onClick={() => this.handleClick()} className='progressButton'>Check Progress</button>
          {progressGuesses}
          {progressCorrect}
        </div>
    )} else {
        return (
          <div className='progressContainer'>
            <button onClick={() => this.handleClick()} className='progressButton'>Check Progress</button>
          </div>
        )
    }
    }
}    

const mapStateToProps = state => {
    return {
        progress: state.words.progress,
        progressData: state.words.progressData
    };
};

export default connect(mapStateToProps)(Progress);

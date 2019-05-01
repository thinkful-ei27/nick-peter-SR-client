import React from 'react';
import {connect} from 'react-redux';
import './progress.css';
import {getProgress} from '../actions/progress';
export class Progress extends React.Component{
    
    handleClick(){
        this.props.dispatch(getProgress());
    }



    render(){
    let button;
    if (this.props.next) {
      button =<button onClick={() => this.handleClick()} disabled className='progressButton'>Check Progress</button>
    } else {
      button = <button onClick={() => this.handleClick()} className='progressButton'>Check Progress</button>
    }
    
    const progressGuesses = <p>You've seen {this.props.progressData.currWord} {this.props.progressData.totalTimesGuessed} time{this.props.progressData.totalTimesGuessed === 1 ? '' : 's'}</p>;
    const progressCorrect = <p>You've gotten it correct {Math.trunc(this.props.progressData.percentCorrect)}% of the time</p> 
    if(this.props.progress){
    return (
        <section className='progressContainer'>
          {button}
          {progressGuesses}
          {progressCorrect}
        </section>
    )} else {
        return (
          <section className='progressContainer'>
           {button}
          </section>
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

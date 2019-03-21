import React from 'react';
import {connect} from 'react-redux';
import './progress.css';
import {getProgress} from '../actions/progress';
export class Progress extends React.Component{
    
    handleClick(){
        this.props.dispatch(getProgress());
    }



    render(){
    
        const progressList = 
        Object.keys(this.props.progressData).map((key) => {
        let display = this.props.progressData[key];
        return (
        <li key={key}>{key}: {display}</li>
        )
        });

    if(this.props.progress){
    return (
        <div className='progressContainer'>
          <button onClick={() => this.handleClick()} className='progressButton'>Check Progress</button>
          <ul>
            {progressList}
          </ul>
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

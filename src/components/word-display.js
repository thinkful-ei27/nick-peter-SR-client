import React from 'react';

function WordDisplay (props) {
  return (
    <div className="word-container">
      <label htmlFor="wordDisplay">Portuguese Word to Learn:</label>
      <p className="word-display" name="wordDisplay">{props.word}</p>
    </div>
  )
}

export default WordDisplay

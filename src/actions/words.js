import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const WORDS_REQUEST = 'WORDS_REQUEST';
export const wordsRequest = () => ({
    type: WORDS_REQUEST
});

export const WORDS_SUCCESS = 'WORDS_SUCCESS';
export const wordsSuccess = word => ({
    type: WORDS_SUCCESS,
    word
});

export const WORDS_ANSWER_SUCCESS = 'WORDS_ANSWER_SUCCESS';
export const wordsAnswerSuccess = answer => ({
    type: WORDS_ANSWER_SUCCESS,
    answer
});

export const WORDS_ERROR = 'WORDS_ERROR';
export const wordsError = error => ({
    type: WORDS_ERROR,
    error
});

export const getWord = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;

  
  dispatch(wordsRequest());
  return (
    fetch(`${API_BASE_URL}/words`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
      }
  })
      // Reject any requests which don't return a 200 status, creating
      // errors which follow a consistent format
      .then(res => normalizeResponseErrors(res))
      .then(res => res.json())
      .then(word => dispatch(wordsSuccess(word)))
      .catch(err => {
          const message = 'Oops, something went wrong. Please try again.'
          dispatch(wordsError(err));
          return Promise.reject(
              new SubmissionError({
                  _error: message
              })
          );
      })
  );
}

export const sendAnswer = (answer) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    dispatch(wordsRequest());
    return (
        fetch(`${API_BASE_URL}/words`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({
                answer
            })
        })
            // Reject any requests which don't return a 200 status, creating
            // errors which follow a consistent format
            .then(res => normalizeResponseErrors(res))
            .then(res => res.json())
            .then(answer => dispatch(wordsAnswerSuccess(answer)))
            .catch(err => {
                const message = 'Oops, something went wrong. Please try again.'
                dispatch(wordsError(err));
                return Promise.reject(
                    new SubmissionError({
                        _error: message
                    })
                );
            })
    );
};
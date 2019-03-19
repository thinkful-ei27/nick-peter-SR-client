import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const WORDS_REQUEST = 'WORDS_REQUEST';
export const wordsRequest = () => ({
    type: WORDS_REQUEST
});

export const WORDS_SUCCESS = 'WORDS_SUCCESS';
export const wordsSuccess = words => ({
    type: WORDS_SUCCESS,
    words
});

export const WORDS_ERROR = 'WORDS_ERROR';
export const wordsError = error => ({
    type: WORDS_ERROR,
    error
});

export const sendAnswer = (userAnswer) => dispatch => {
    dispatch(wordsRequest());
    return (
        fetch(`${API_BASE_URL}/words`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userAnswer
            })
        })
            // Reject any requests which don't return a 200 status, creating
            // errors which follow a consistent format
            .then(res => normalizeResponseErrors(res))
            .then(res => res.json())
            .then(answer => dispatch(wordsSuccess(answer)))
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

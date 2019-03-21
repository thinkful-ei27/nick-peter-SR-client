import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const PROGRESS_REQUEST = 'PROGRESS_REQUEST';
export const progressRequest = () => ({
    type: PROGRESS_REQUEST
});

export const PROGRESS_SUCCESS = 'PROGRESS_SUCCESS';
export const progressSuccess = (progress) => ({
    type: PROGRESS_SUCCESS,
    progress
});

export const PROGRESS_ERROR = 'PROGRESS_ERROR';
export const progressError = (error) => ({
    type: PROGRESS_ERROR,
    error
})

export const getProgress = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;

    dispatch(progressRequest());
    return (
        fetch(`${API_BASE_URL}/progress`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(data => {
            let parsed = JSON.parse(data);
            dispatch(progressSuccess(parsed))
        })
        .catch(err => {
            console.log(err);
            const message = 'Oops, something went wrong. Please try again.';
            dispatch(progressError(err));
            return Promise.reject(
                new SubmissionError({
                    _error: message
                })
            )
        })
    )
}

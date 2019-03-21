import { WORDS_REQUEST, WORDS_SUCCESS, WORDS_ANSWER_SUCCESS, WORDS_ERROR } from '../actions/words';
import { PROGRESS_ERROR, PROGRESS_REQUEST, PROGRESS_SUCCESS } from '../actions/progress';

const initialState = {
  word: null,
  answer: null,
  error: null,
  loading: false,
  next: false,
  progress: false,
  progressData: {}
};

export default function reducer (state = initialState, action) {
  if (action.type === WORDS_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null,
      answer: null,
      next: false,
      progress: false
    });
  } else if (action.type === WORDS_SUCCESS) {
    return Object.assign({}, state, {
      word: action.word,
      loading: false,
      error: null,
      next: false,
      progress: false
    });
  } else if (action.type === WORDS_ANSWER_SUCCESS) {
    return Object.assign({}, state, {
      answer: action.answer,
      loading: false,
      error: null,
      next: true,
      progress: false
    });
  }
   else if (action.type === WORDS_ERROR) {
    return Object.assign({}, state, {
      error: action.error,
      loading: false,
      progress: false
    });
  } else if (action.type === PROGRESS_REQUEST){
    return Object.assign({}, state, {
      progress: false,
      progressData: {}
    });
  } else if (action.type === PROGRESS_SUCCESS){
    return Object.assign({}, state, {
      progress: true,
      progressData: action.progress
    });
  } else if (action.type === PROGRESS_ERROR){
    return Object.assign({}, state, {
      progress: false,
      progressData: {},
      error: action.err
    })
  }
  return state;
}
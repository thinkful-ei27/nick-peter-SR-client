import { WORDS_REQUEST, WORDS_SUCCESS, WORDS_ANSWER_SUCCESS, WORDS_ERROR } from '../actions/words';

const initialState = {
  word: null,
  answer: null,
  error: null,
  loading: false
};

export default function reducer (state = initialState, action) {
  if (action.type === WORDS_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null,
      answer: null
    });
  } else if (action.type === WORDS_SUCCESS) {
    return Object.assign({}, state, {
      word: action.word,
      loading: false,
      error: null
    });
  } else if (action.type === WORDS_ANSWER_SUCCESS) {
    return Object.assign({}, state, {
      answer: action.answer,
      loading: false,
      error: null
    });
  }
   else if (action.type === WORDS_ERROR) {
    return Object.assign({}, state, {
      error: action.error,
      loading: false
    });
  }
  return state;
}
import { WORDS_REQUEST, WORDS_SUCCESS, WORDS_ERROR } from '../actions/words';

const initialState = {
  words: null,
  error: null,
  loading: false
};

export default function reducer (state = initialState, action) {
  if (action.type === WORDS_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  } else if (action.type === WORDS_SUCCESS) {
    return Object.assign({}, state, {
      words: action.words,
      loading: false
    });
  } else if (action.type === WORDS_ERROR) {
    return Object.assign({}, state, {
      error: action.error,
      loading: false
    });
  }
  return state;
}
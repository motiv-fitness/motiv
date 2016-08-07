export default function feed(state = {}, action) {
  switch (action.type) {
    case 'DISPLAY_FEED':
      return Object.assign({}, state, {
        feedItems: action.payload
      });
    case 'DISPLAY_FEED_FAIL':
      return action.error;
    default:
      return state;
  }
}

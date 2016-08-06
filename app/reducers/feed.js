export default function feed(state = {}, action) {
  switch (action.type) {
    case 'DISPLAY_FEED':
      console.log("inside the display feed reducer *****", action)
      return Object.assign({}, state, {
        feedItems: action.payload
      });
    case 'DISPLAY_FEED_FAIL':
      return action.error;
    default:
      return state;
  }
}

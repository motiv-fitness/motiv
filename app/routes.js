import React from 'react';
import { IndexRoute, Route} from 'react-router';
import { Provider } from 'react-redux';
import App from './components/App';
import Splash from './components/Splash';
import Contact from './components/Contact';
import NotFound from './components/NotFound';
import Login from './components/Account/Login';
import Signup from './components/Account/Signup';
import EditProfile from './components/Account/EditProfile';
import Profile from './components/Account/profile/Profile';
import Forgot from './components/Account/Forgot';
import Reset from './components/Account/Reset';
import { loadProfile } from './actions/profile';

export default function getRoutes(store) {
  const isAuthenticated = () => {
    return store.getState().auth.token && store.getState().auth.user;
  };
  const ensureAuthenticated = (nextState, replace) => {
    if (!isAuthenticated()) { replace('/login'); }
  };
  const skipIfAuthenticated = (nextState, replace) => {
    if (isAuthenticated()) { replace('/profile'); }
  };
  const clearMessages = () => {
    store.dispatch({ type: 'CLEAR_MESSAGES' });
  };

  const authDispatch = (nextState, replace, dis, needID, disArg) => {
    if(isAuthenticated()) {
      if (needID) store.dispatch(dis(store.getState().auth.user.id));
      else store.dispatch(dis(disArg));
    } else {
      replace('/login');
    }
  }

  const loadUserProfile = (nextState, replace) => {
    authDispatch(nextState, replace, loadProfile, false, nextState.params.userId);
  };

  const loadMyProfile = (nextState, replace) => {
    // authDispatch(nextState, replace, loadProfile, true);
    if(isAuthenticated()) {
      let url = store.getState();
      store.dispatch(loadProfile(url.auth.user.url));
    } else {
      replace('/login');
    }
  };

  return (
    <Route path="/" component={App}>
      <IndexRoute component={Splash} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
      <Route path="/contact" component={Contact} onLeave={clearMessages}/>
      <Route path="/login" component={Login} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
      <Route path="/signup" component={Signup} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
      <Route path="/account" component={EditProfile} onEnter={ensureAuthenticated} onLeave={clearMessages}/>
      <Route path="/profile" component={Profile} onEnter={loadMyProfile} onLeave={clearMessages}/>
      <Route path="/forgot" component={Forgot} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
      <Route path='/reset/:token' component={Reset} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
      <Route path='/u/:userId' component={Profile} onEnter={ loadUserProfile } /> /
      <Route path="*" component={NotFound} onLeave={clearMessages}/>
    </Route>
  );
}

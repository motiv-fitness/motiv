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
import Exercise from './components/Regime/Exercise/Exercise';
import Diet from './components/Regime/Diet/Diet';
import Supplement from './components/Supplement/SupplementView';
import Feed from './components/Feed';
import Goal from './components/ProgressBar';
import FavResource from './components/FavResource';


import { displaySupplement } from './actions/supplements';
import { displayExercise, displayDiet } from './actions/regime';
import { loadProfile } from './actions/profile';
import { displayGoal} from './actions/goal';
import { favResource } from './actions/favresource';

import { initiateFeed, updateFeed } from './actions/feed';

export default function getRoutes(store) {
  const isAuthenticated = () => {
    return store.getState().auth.token !== undefined;
  };
  const ensureAuthenticated = (nextState, replace) => {
    if (!isAuthenticated()) { replace('/login'); }
  };
  const skipIfAuthenticated = (nextState, replace) => {
    if (isAuthenticated()) { replace('/home'); }
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
    authDispatch(nextState, replace, loadProfile, true);
  };

  const loadDiet = (nextState, replace) => {
    store.dispatch(displayDiet())
  };

  const loadExercise = (nextState, replace) => {
    authDispatch(nextState, replace, displayExercise, false);
  };

  const loadSupplement = (nextState, replace) => {
    authDispatch(nextState, replace, displaySupplement, false);
  };

  const loadFeed = (nextState, replace) => {
    authDispatch(nextState, replace, initiateFeed, true);
  };

  const loadGoal = (nextState, replace) => {
    if(isAuthenticated()) {
      store.dispatch(displayGoal());
    } else {
     replace('/login');
    }
  };

  const loadResource = (nextState, replace) => {
    if(isAuthenticated()) {
      store.dispatch(favResource()); // ? ? ?
    } else {
     replace('/login');
    }
  };
  //function to check for valid userID

  return (
    <Route path="/" component={App}>
      <IndexRoute component={Splash} onLeave={clearMessages}/>
      <Route path="/goal" component={Goal} onEnter={loadGoal} onLeave={clearMessages}/>
      <Route path="/resource" component={FavResource} onEnter={loadResource} onLeave={clearMessages}/>
      <Route path="/supplement" component={Supplement} onEnter={loadSupplement} onLeave={clearMessages}/>
      <Route path="/exercise" component={Exercise} onEnter={loadExercise} onLeave={clearMessages} />
      <Route path="/diet" component={Diet} onEnter={loadDiet} onLeave={clearMessages} />
      <Route path="/contact" component={Contact} onLeave={clearMessages}/>
      <Route path="/login" component={Login} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
      <Route path="/signup" component={Signup} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
      <Route path="/account" component={EditProfile} onEnter={ensureAuthenticated} onLeave={clearMessages}/>
      <Route path="/profile" component={Profile} onEnter={loadMyProfile} onLeave={clearMessages}/>
      <Route path="/forgot" component={Forgot} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
      <Route path='/reset/:token' component={Reset} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
      <Route path='/home' component={Feed} onEnter={loadFeed} onLeave={clearMessages}/>
      <Route path='/u/:userId' component={Profile} onEnter={ loadUserProfile } /> /
      <Route path="*" component={NotFound} onLeave={clearMessages}/>
    </Route>
  );
}

import React from 'react';
import firebase from 'react-native-firebase';
import { Scene, Router, Stack, Actions, ActionConst } from 'react-native-router-flux';
import Signin from './containers/auth/Signin';
import Signup from './containers/auth/Signup';
import PostCreate from './containers/post/PostCreate';
import PostEdit from './containers/post/PostEdit';
import PostList from './containers/post/PostList';
import requireAuth from './containers/auth/requireAuth';
import requireNotAuth from './containers/auth/requireNotAuth';

const RouterComponent = () => (
  <Router sceneStyle={{ paddingTop: 65, backgroundColor: '#edecec' }} navigationBarStyle={styles.navigationBarStyle} titleStyle={{ color: '#4d4d4d' }}>
    <Scene key="root">
        <Scene key="signin" component={requireNotAuth(Signin)} title="Please Sign in" type={ActionConst.RESET}/>
        <Scene key="signup" component={requireNotAuth(Signup)} title="Please Sign up" type={ActionConst.RESET}/>
        <Scene key="postList" component={requireAuth(PostList)} title="Attendees" leftTitle="Sign out" onLeft={() => { firebase.auth().signOut(); Actions.signin(); }} onRight={() => Actions.postCreate()} rightTitle="Create New" type={ActionConst.RESET} />
        <Scene key="postCreate" component={requireAuth(PostCreate)} title="First-Time Attendee" />
        <Scene key="postEdit" component={requireAuth(PostEdit)} title="Personal Details" />
    </Scene>
  </Router>
);

const styles = {
  navigationBarStyle: {
    backgroundColor: '#fff',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
};

export default RouterComponent;

import React, {
  Component,
  StyleSheet,
  Navigator,
  Text,
  BackAndroid,
  Platform,
  TouchableOpacity,
  View
} from 'react-native';
import {connect, Provider} from 'react-redux';

import {init} from './../../netWorkAdapter/messageAdapter';
import AioComp from './../AioComp/AioComp';
import TopicList from './../TopicListComp/TopicListComp';
import Login from "../LoginComp/LoginComp";
import store from './../../store';

function getInitRoute(loginSuccess:boolean = false) {
  if (loginSuccess) {
    return {
      title: '企业IM',
      name : 'index',
      data : 'messageTab'
    }
  } else {
    return {
      title: '用户登录',
      name : 'login'
    }
  }

}

class NavBar extends Component {

  handleWillFocus = (route) => {
    this.setState({title: route.title});
  };

  constructor(props) {
    super(props);
    this.state = {
      title: '企业IM',
    };
  }

  immediatelyRefresh() {
    //谜之回调           
  }

  render() {
    var title = this.props.title || "企业IM";
    var nav = this.props.navigator.getCurrentRoutes();
    var leftBtn = nav.length > 1 ? (
      <TouchableOpacity
        onPress={this.props.onBack}
        style={styles.navBarLeftButton}>
        <Text
          style={[styles.navBarText,styles.navBarButtonText]}>
          {"<返回"}
        </Text>
      </TouchableOpacity>)
      : <View style={styles.navBarLeftButton}/>;
    return (
      <View style={styles.navBar}>
        {leftBtn}
        <View style={styles.navBarTitle}>
          <Text style={[styles.navBarText,styles.navBarTitleText]}>{title}</Text>
        </View>
        <View style={styles.navBarRightButton}/>
      </View>
    );
  }
}

class IMApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '企业IM',
    };
  }


  render() {
    var initRoute = getInitRoute(store.getState().login.state === 'success');
    return (
      <Provider store={store}>
        <Navigator
          ref={(navigator) => {this._navigator = navigator;}}
          initialRoute={initRoute}
          renderScene={this.renderScene}
          onWillFocus={this._willFocus}
          navigationBar={
          <NavBar
            onBack={this.onBack}
            title={this.state.title}/>
        }
        />
      </Provider>
    );
  }

  renderScene = (route:object, navigator) => {
    switch (route.name) {
      case 'login':
      {
        return <Login style={styles.scene} navigator={navigator}/>
      }
      case 'index':
      {
        return <TopicList style={styles.scene} navigator={navigator}/>
      }
      case 'Aio':
      {
        return <AioComp style={styles.scene} navigator={navigator} userId={route.fromUserId} route={route}/>
      }
    }
  };

  componentWillMount() {
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this.onBack);
    }
  }

  unsub:undefined;

  componentDidMount() {
    //TODO 这里也许有更好的写法
    unsub = store.subscribe(()=> {
      let nav = this._navigator;
      let routers = nav.getCurrentRoutes();
      if (routers[0].name == 'login' && store.getState().login.loginState === 'success') {
        let route = getInitRoute(true);
        nav.immediatelyResetRouteStack([route]);
        this.setState({title: route.title});
      }
    });
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackAndroid.removeEventListener('hardwareBackPress', this.onBack);
    }

    unsub && unsub();
  }

  _willFocus = (route)=> {
    this.setState({title: route.title});
  };

  onBack = () => {
    const nav = this._navigator;
    const routers = nav.getCurrentRoutes();
    if (routers.length > 1) {
      nav.pop();
      return true;
    }
    return false;
  };
}

var styles = StyleSheet.create({
  navBar           : {
    position       : 'absolute',
    backgroundColor: 'white',
    flexDirection  : "row",
    height         : 45,
    top            : 0,
    left           : 0,
    right          : 0
  },
  navBarText       : {
    fontSize: 18,
  },
  navBarTitle      : {
    flex      : 1,
    alignSelf : 'center',
    alignItems: 'center',
  },
  navBarTitleText  : {
    justifyContent: 'center'
  },
  navBarLeftButton : {
    flexDirection: 'row',
    alignItems   : 'flex-start',
    height       : 45,
    width        : 150,
    paddingLeft  : 9,
  },
  navBarRightButton: {
    height: 45,
    width : 150,
  },
  navBarButtonText : {
    color         : '#5890FF',
    flex          : 1,
    justifyContent: 'center',
    alignSelf     : 'center'
  },
  scene            : {
    flex     : 1,
    marginTop: 45,
  },
});

TopicListComp = connect(state=>state)(IMApp);


module.exports = IMApp;
init();
import React, {
  Component,
  StyleSheet,
  ListView,
  Text,
  TouchableHighlight,
  View,
  Image
} from 'react-native';

import Mock from 'mockjs';

class MessageBobbleComp extends Component {

  static defaultProps = {
    sent: false,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.messageView,this.props.sent?styles.horizontallyInverted:styles.empty]}>
        <Image
          style={[styles.avanta,this.props.sent?styles.horizontallyInverted:styles.empty]}
          source={require('./../../common/img/avanta.png')}/>
        <Image
          style={[styles.arrow,this.props.sent?styles.selfArrow:styles.empty]}
          source={this.props.sent?require('./img/arrow-send.png'):require('./img/arrow.png')}
        />
        <Text style={styles.nick}>{this.props.sent ? "" : "123123"}</Text>
        <View style={styles.contentWarp}>
          <View style={[styles.content,this.props.sent?styles.selfContent:styles.empty]}>
            <Text
              style={[styles.contentText,this.props.sent?styles.selfContentText:styles.empty]}>
              { Mock.Random.cparagraph(1, 4)}</Text>
          </View>
        </View>
        <View style={{flex:0}}/>
      </View>
    );
  }
}
let horizontallyInvertedObj = {
  transform: [
    {scaleX: -1},
  ],
}

var styles = StyleSheet.create({
  messageView         : {
    flex         : 1,
    flexDirection: "row",
    marginTop    : 10,
    marginBottom : 10,
    paddingLeft  : 10,
    paddingRight : 20,
  },
  avanta              : {
    height      : 40,
    width       : 40,
    // alignItems  : 'center',
    // alignSelf   : 'center',
    marginRight : 10,
    borderRadius: 9999
  },
  arrow               : {
    position: 'absolute',
    top     : 21,
    left    : 54.5,
    height  : 18,
    width   : 18,
  },
  selfArrow           : {
    top: -1,
  },
  nick                : {
    position: 'absolute',
    fontSize: 14,
    flex    : 1,
    color   : '#000000'
  },
  contentWarp         : {
    flexDirection: 'column',
    alignItems   : 'flex-start',
    flex         : 1,
  },
  content             : {
    marginTop      : 22,
    borderRadius   : 12,
    padding        : 12,
    backgroundColor: 'rgba(255,255,255,1)',
    flex           : 1,
    // maxWidth       : 100
  },
  selfContent         : {
    marginTop      : 0,
    backgroundColor: '#12b7f5',
  },
  contentText         : {
    fontSize: 15,
    color   : '#000',
    // backgroundColor: 'rgba(255,255,255,1)',
    flex    : 1,

  },
  selfContentText     : {
    color: '#fff',
    ...horizontallyInvertedObj,// backgroundColor: '#12b7f5',

  },
  horizontallyInverted: {
    ...horizontallyInvertedObj,
  },
  empty               : {},
});


module.exports = MessageBobbleComp;
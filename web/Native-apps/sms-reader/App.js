import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SmsListener from 'react-native-android-sms-listener'



export default class App extends React.Component {
  state={
    message:""
  }
  componentDidMount()
  {
    let self=this;
    console.log("hai");
    SmsListener.addListener(message => {
      console.info(message)
      self.setState({
        message
      })
    })
  }
  render() {
    let {message}=this.state;
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>{message?message:"listening...."}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

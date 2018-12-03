import React, { Component } from 'react'
import {
    StyleSheet, Text, View, Image,
    TouchableWithoutFeedback, StatusBar,
    TextInput, SafeAreaView, Keyboard, TouchableOpacity,
    KeyboardAvoidingView 
} from 'react-native'
import { createStackNavigator } from 'react-navigation'; 


class HomeScreen extends Component {
    constructor(props){
        super(props);
        this.state= {
          username:'',
          password:''
              }
           }
  
           componentDidMount(){
            this._loadInitialState().done();
          }
          _loadInitialState = async ()=> {
            var value = await AsyncStorage.getItem('username');
            if (value !== null){
             this.props.navigation.navigate('Details');
            }
          }

    render() {
        return (
            <SafeAreaView style={styles.container}>
               <StatusBar barStyle="light-content" />
                <KeyboardAvoidingView behavior='padding' style={styles.container}>
                    <TouchableWithoutFeedback style={styles.container} 

                            onPress={Keyboard.dismiss}>

                        <View style={styles.logoContainer}>

                            <View style={styles.logoContainer}>

                                <Image style={styles.logo}

                                    source={require('./app/img/icon.png')}>

                                </Image>

                                <Text style={styles.title}></Text>

                            </View>

                            <View style={styles.infoContainer}>

                                <TextInput style={styles.input}
                                underlineColorAndroid='transparent'
                                    placeholder="الرقم الجامعي"
                                    placeholderTextColor='rgba(255,255,255,0.8)'
                                    autoCapitalize='false'
                                    returnKeyType='next'
                                    autoCorrect={false}
                                    onChangeText={(username)=>this.setState({username})}
                                    onSubmitEditing={()=> this.refs.txtPassword.focus()}

                                />

                                <TextInput style={styles.input} 
                                    underlineColorAndroid='transparent'
                                    placeholder="كلمة المرور"
                                    placeholderTextColor='rgba(255,255,255,0.8)'
                                    returnKeyType='go'
                                    onChangeText={(password)=>this.setState({password})}
                                    secureTextEntry
                                    autoCorrect={false}
                                    ref={"txtPassword"}

                                />

                                <TouchableOpacity style={styles.buttonContainer} 
                                                  onPress={this.login} >

                                    <Text style={styles.buttonText}>دخول</Text>

                                </TouchableOpacity>

                            </View>

                        </View>

                    </TouchableWithoutFeedback>

                </KeyboardAvoidingView>

            </SafeAreaView>

        )

    }
    Login = () =>{
        fetch('http://10.1.1.99/api/Users/LogintUser?username='+this.state.username+'&password='+this.state.password, {
            method: 'POST',
          })
          .then((response)=> response.json())
          .then((res)=>{
            if(res.Message == "An error has occurred."){
              alert("Login failed please try again..");
            }else{
              this.props.navigation.navigate('Details');
            }
            console.log(res)
    })
    .done();
    }

}

class DetailsScreen extends React.Component {
    render() {
      return (
        
           <Text style={styles.container}>hello</Text>
      );
    }
  }  
  const RootApp = createStackNavigator(
    {
      Home: {
        screen: HomeScreen,
        navigationOptions: () => ({
            header:null
          }),
    
      },
      Details: {
        screen: DetailsScreen,
       
    
      },
      
    },
    {
      initialRouteName: 'Home',
    } 
      
    );
    
  //default class     
  export default class App extends React.Component {
    render() {
      return <RootApp />;
    }
  }     

const styles = StyleSheet.create({

    container: {

        flex: 1,

        backgroundColor: 'rgb(32, 50, 70)',

//flexDirection: 'column',

    },

    logoContainer: {

        alignItems: 'center',
        marginTop:30,
        

        flex: 1

    },

    logo: {

        width: 150,

        height: 150,

    },

    title: {

        color: '#f7c744',

        fontSize: 21,

        textAlign: 'center',

        marginTop: 5,

        opacity: 0.9

    },

    infoContainer: {

        position: 'absolute',

        left: 0,

        right: 0,

        bottom: 0,

        height:270,

        padding: 20,

        //backgroundColor: 'red'

    },

    input: {

        height: 40,

        backgroundColor: 'rgba(255,255,255,0.2)',

        color: '#FFF',

        marginBottom: 20,

        paddingHorizontal: 10

    },

    buttonContainer: {

        backgroundColor: '#f7c744',

        paddingVertical: 15

    },

    buttonText: {

        textAlign: 'center',

        color :'rgb(32, 53, 70)',

        fontWeight: 'bold',

        fontSize: 18

    }

})
























/*import React , {Component} from'react';
import{
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    KeyboardAvoidingView,
    
} from'react-native';
import { createStackNavigator } from 'react-navigation'; 

class HomeScreen extends React.Component{

    constructor(props){
      super(props);
      this.state= {
        username:'',
        password:''
            }
         }
         componentDidMount(){
           this._loadInitialState().done();
         }
         _loadInitialState = async ()=> {
           var value = await AsyncStorage.getItem('user');
           if (value !== null){
            this.props.navigation.navigate('Details');
           }
         }
        render(){
        return(
            <ImageBackground 
                        source={require('./app/img/logo.jpg')}
                        style ={styles.container}>
                         <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <View>
                    <View style={styles.content}>
                        <View style={styles.inputContainer}>
                            <TextInput underlineColorAndroid='transparent'
                            onChangeText={(username)=>this.setState({username})}
                            style={styles.input}
                            
                            placeholder="الر الجامعي"></TextInput>
                          
                            <TextInput secureTextEntry={true}
                            underlineColorAndroid='transparent'
                            onChangeText={(password)=>this.setState({password})}
                            style={styles.input} 
                            placeholder="كلمة المرور"></TextInput>
                            <View>
                            <TouchableOpacity onPress={this.Login} style={styles.button}>
                                <Text style={styles.buttonText}>دخول</Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                    
                    </View>
                </View>
                </KeyboardAvoidingView>
            </ImageBackground>
            
        );
        }
    }
    class DetailsScreen extends React.Component {
        render() {
          return (
            <ImageBackground 
            source={require('./app/img/bge.jpg')}
            style = {styles.container}>
               
              </ImageBackground>
          );
        }
      }  
      const RootApp = createStackNavigator(
        {
          Home: {
            screen: HomeScreen,
            navigationOptions: () => ({
              header:null
            }),
        
          },
          Details: {
            screen: DetailsScreen,
            navigationOptions: () => ({
              title: 'Back',
            }),
        
          },
          
        },
        {
          initialRouteName: 'Home',
        } 
          
        );
        
      //default class     
      export default class App extends React.Component {
        render() {
          return <RootApp />;
        }
      }     
      //CSS Style
      const styles = StyleSheet.create({
        container:{
            flex:1,
            width:'100%',
            height:'100%',
            justifyContent:'center',
            alignSelf:'stretch'
      
        },
        container1: {
          flex: 1,
      },
        content:{
            alignItems:'center',
            marginTop:160,
        },
        logo:{
            color:'white',
            fontSize:40,
            fontStyle:'italic',
            fontWeight:'bold',
            textShadowColor:'#252525',
            textShadowOffset:{width:2,height:2},
            textShadowRadius:20,
            marginBottom:15,
        },
        inputContainer:{
          margin : 40,
          marginBottom:10,
          padding:20,
          paddingBottom:10,
          alignSelf:'stretch',
          backgroundColor:'rgba(255,255,255,0.2)',
        },
        input:{
          fontSize:16,
          height:40,
          padding:10,
          marginBottom:10,
          backgroundColor:'rgba(255,255,255,1)',
      
        },
        button:{
         marginTop:30,
         padding:10,
         alignSelf:'stretch',
         borderWidth:1,
        borderColor:'#fff',
        backgroundColor:'rgba(255,255,255,0.6)'
       },
       buttonText:
       {
        color:'brown',
         fontSize:16,
           fontWeight:'bold',
           textAlign:'center',
       },
       header: {
         backgroundColor: '#E91E63',
         alignItems: 'center',
         justifyContent:'center',
         borderBottomWidth: 10,
         borderBottomColor: '#ddd'
      },
      headerText: {
         color: 'white',
         fontSize: 18,
         padding: 20
      },
      scrollContainer: {
        flex: 1,
        marginBottom: 100
      },
      footer: {
         position: 'absolute',
         bottom: 0,
         left: 0,
         right: 0,
         zIndex: 10
      },
      textInput: {
         alignSelf: 'stretch',
         color: '#fff',
         padding: 20,
         backgroundColor: '#252525',
         borderTopWidth:2,
         borderTopColor: '#ededed'
      },
      addButton: {
         position: 'absolute',
         zIndex: 11,
         left: 20,
         bottom: 90,
         backgroundColor: '#E91E63',
         width: 70,
         height: 70,
         borderRadius: 35,
         alignItems: 'center',
         justifyContent: 'center',
         elevation: 8
      },
      addButtonText: {
         color: '#fff',
         fontSize: 24
      }
      
      
        
      })
      */
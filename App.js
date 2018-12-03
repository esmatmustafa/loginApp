
import * as React from 'react';
import{
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    Button,
    Image,
    AsyncStorage,
    ScrollView,
    KeyboardAvoidingView
} from'react-native';
import { createStackNavigator } from 'react-navigation'; 
import { DangerZone } from 'expo';
import { Constants } from 'expo';
import DetailsScreen from './DetailsScreen.js'

class HomeScreen extends React.Component{

    constructor(props){
      super(props);
      this.state= {
        username:'',
        password:'',
        dm: null,
        initial: null,
            }
         }
         componentDidMount() {
            DangerZone.DeviceMotion.addListener(motion => {
              this.setState(oldState => ({ 
                dm: motion,
                initial: oldState.initial ? oldState.initial : motion,
              }));
            });
            //DangerZone.DeviceMotion.setUpdateInterval(16);
          }
          componentWillUnmount() {
            DangerZone.DeviceMotion.removeAllListeners();
          }
         
        render(){
            let initial_angle = 0;
                if (this.state.initial && this.state.initial.rotation && this.state.initial.rotation.alpha) {
                initial_angle = this.state.initial.rotation.alpha;
                }
                let angle = 0;
                if (this.state.dm && this.state.dm.rotation && this.state.dm.rotation.alpha) {
                angle = this.state.dm.rotation.alpha;
                }
                angle -= initial_angle;
        return(
            <KeyboardAvoidingView behavior='padding' style={styles.container}>

            <ImageBackground 
                        source={require('./app/img/background.jpg')}
                        style ={styles.container}>
                <View>
                <View style={styles.container1}>
                <Image
                        source={require('./app/img/logo2.png')}
                        style={{
                            height:150,
                            width: 150,
                            transform: [{ rotate: angle + 'rad' }],
                        }}
                    />
                </View>
                    <View style={styles.content}>
                   
                        <View style={styles.inputContainer}>
                            <TextInput underlineColorAndroid='transparent' autoCapitalize='false'
                            onChangeText={(username)=>this.setState({username})}
                            style={styles.input} 
                            onSubmitEditing={()=> this.refs.txtPassword.focus()}
                            placeholder="الرقم الجامعي"></TextInput>
                          
                            <TextInput secureTextEntry={true}
                            underlineColorAndroid='transparent'
                            onChangeText={(password)=>this.setState({password})}
                            style={styles.input} 
                            ref={"txtPassword"}
                            placeholder="كلمة المرور"></TextInput>
                            <View style={{marginTop:15}}>
                            <Button 
                              title="تسجيل دخول"
                              onPress={() => this.props.navigation.navigate('Details')}
                              color='#6D214F'
                            />
                            </View>
                        </View>
                    
                    </View>
                    </View>
                </ImageBackground>
            </KeyboardAvoidingView>
        );
        }
        
      Login = () =>{
          alert.alert("تم تسجيل الدخول")
      }
  
}
 
/*class DetailsScreen extends React.Component {
  render() {
    return (
      <ImageBackground 
      source={require('./app/img/background.jpg')}
      style = {styles.container2}>
          <View style={{ alignItems: 'center',}}>
                <Text style = {{fontSize:25 ,marginTop:40}}>صفحة الطالب</Text>
          </View>
          <View style={{padding:10}}>
                <Text style = {{fontSize:18 ,marginTop:20}}>البيانات الاساسية :</Text>
            </View>
            <View style={{padding:10, paddingLeft:20}}>
                <Text style = {{fontSize:18 ,marginTop:20 }}>الرقم الجامعي</Text>
                <Text style = {{fontSize:18 ,marginTop:10}}>الكلية</Text>
                <Text style = {{fontSize:18 ,marginTop:10}}>القسم</Text>
                <Text style = {{fontSize:18 ,marginTop:10}}>الرصيد</Text>
                <Text style = {{fontSize:18 ,marginTop:10}}>المستوى الدراسي </Text>
                <Text style = {{fontSize:18 ,marginTop:10}}>المعدل التراكمي</Text>


            
          </View>
          <View  style={styles.inputContainer1}>
          <Button 
                 title="تسجيل خروج"
                 onPress={() => this.props.navigation.navigate('Home')}
                 color='#6D214F'
                />
            </View>
            
        </ImageBackground>
    );
  }
}
*/
class NextScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        noteArray: [],
        noteText: '',
    };
}
render() {
    let notes = this.state.noteArray.map((val, key)=>{
        return <Note key={key} keyval={key} val={val}
                deleteMethod={()=>this.deleteNote(key)}/>
    });
    return (
        <View style={styles.container1}>
            <View style={styles.header}>
                <Text style={styles.headerText}> My Task </Text>
            </View>
            <ScrollView style={styles.scrollContainer}>
                {notes}
            </ScrollView>
            <View style={styles.footer}>
                <TextInput 
                    style={styles.textInput}
                    placeholder='Write Task ..'
                    onChangeText={(noteText)=> this.setState({noteText})}
                    value={this.state.noteText}
                    placeholderTextColor='white'
                    underlineColorAndroid='transparent'>
                </TextInput>
            </View>
            <TouchableOpacity onPress={ this.addNote.bind(this) } style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}
addNote(){
    if(this.state.noteText){
        var d = new Date();
        this.state.noteArray.push({
            'date':d.getFullYear()+"/"+(d.getMonth()+1) + "/"+ d.getDate(),
            'note': this.state.noteText
        });
        this.setState({ noteArray: this.state.noteArray });
        this.setState({noteText:''});
    }
}
deleteNote(key){
    this.state.noteArray.splice(key, 1);
    this.setState({noteArray: this.state.noteArray});
}

}


// Route Class

const RootStack = createStackNavigator(
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
        header:null
      }),
  
    },
    Next:{
      screen:NextScreen,
      navigationOptions: () => ({
        title: 'Back',
      }),
    }
  },
  {
    initialRouteName: 'Home',
  } 
    
  );
  
//default class

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

//CSS Style
const styles = StyleSheet.create({
  container:{
      flex:1,
      width:'100%',
      height:'50%',
      justifyContent:'center',
      alignSelf:'stretch',

  },
  container1: {  
    paddingTop: Constants.statusBarHeight,
          alignItems:'center',

},
container2:{
    flex: 1,
    width:'100%',
    height:'50%',
    alignSelf:'stretch',

},
  content:{
      alignItems:'center',
     
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
    alignSelf:'stretch',
    marginRight:15,
    marginTop:40,
    marginLeft:15,

  },

  inputContainer1:{
  marginTop:220,
  padding:30,
  },
  input:{
    fontSize:16,
    height:40,
    padding:10,
    marginBottom:10,
    backgroundColor:'rgba(255,255,255,1)',
    paddingHorizontal: 10,
    borderRadius:15,
    borderWidth: 1,
    borderColor: '#fff'


  },
  button:{
    backgroundColor: '#f7c744',

        paddingVertical: 15
 },
 buttonText:
 {
    textAlign: 'center',

    color :'rgb(32, 53, 70)',

    fontWeight: 'bold',

    fontSize: 18
 },
 buttonText1:
 {
    textAlign: 'center',

    color :'#f7c744',

    fontWeight: 'bold',

    fontSize: 18
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

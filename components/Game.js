import React, { Component } from 'react'
import { View, ImageBackground, TextInput, StyleSheet,TouchableOpacity,Text, Modal,FlatList, Image } from 'react-native'

function GuessNumber(){
    var digits = "123456789".split(''),
        first = randomMaker(digits).pop();
    return parseInt( first + randomMaker(digits).join('').substring(0,3), 10);
}

function randomMaker(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i),
     x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function getResult(secret, guess) {
   var bulls = 0;
   var cows = 0;
   var numbers = new Array(10);
   for (var i=0; i<10; i++){
     numbers[i] = 0;
   }
   for (var i = 0; i<secret.length; i++) {
     var s = secret.charCodeAt(i) - 48;
     var g = guess.charCodeAt(i) - 48;
     if (s == g) bulls++;
     else {
       if (numbers[s] < 0) cows++;
       if (numbers[g] > 0) cows++;
       numbers[s] ++;
       numbers[g] --;
     }
   }
   if(bulls != 4){
      return bulls + " - " + cows ;
   }else return "You Win !!!"
}

function hasRepeatingdigits(N) {return (/([0-9]).*?\1/).test(N)} 

let RandomNumber = GuessNumber()
let info
var dataInfo = []

class Game extends Component {
      constructor(props) {
        super(props)
        this.state = {
          number: '',
          info:'',
          randomNum:'',
          count:'',
        }

        this.randomNum = RandomNumber
      }

      NewGame=()=>{
         let num2 = GuessNumber()
         this.randomNum=num2
         console.log(this.randomNum)
      }

      Guess = (number) => {
          let num = this.randomNum
          var GuessedNumber = this.state.number
          if(GuessedNumber.length >4){
               alert("Your number length is bigger than 4 digits please try again")
            }else{     
               if (hasRepeatingdigits(GuessedNumber) == true){
                  alert("Your number contains duplicate digits. Please try again")
               }else{
                  if((GuessedNumber+'').indexOf('0') > -1){
                     alert("Your number contains 0. Please try again without 0")
                  }else{
                     if(GuessedNumber.length < 4){
                        alert("Your number length is: "+GuessedNumber.length+ " digits and must be 4 digits")}
                        else{
                           info = getResult(num.toString(),GuessedNumber.toString())
                           dataInfo.push(info)
                             for(let i=0 ; i<dataInfo.length;i++){
                                console.log("Times: "+(i+1))
                              }
                              for(let i=0;i<dataInfo.length;i++){
                                   console.log(dataInfo[i])
                               }
                        }
                  }
               }
            }
      }

      GameResultcount(){
        return <Text style={{color:'black',justifyContent:'center',alignItems:'center',fontSize:30}}> {dataInfo.length}</Text>
      }

      GameResult(){
         var infoRus
         for(var i=0;i<dataInfo.length;i++){
            infoRus = dataInfo[i]
         }
         return <Text style={{color:'black',justifyContent:'center',alignItems:'center',fontSize:30}}>{infoRus}</Text> 
      }

   render() {
        return (
         <View style = {styles.container}>
         <ImageBackground source={require('../assets/backImage.png')} style={styles.image}>
            
                <TouchableOpacity
                                    style={styles.ButtonNewGame}
                                    onPress={this.NewGame}
                                    underlayColor='white'>
                                    <Text style={styles.newGameText}>New Game</Text>
                  </TouchableOpacity>
                <View style={styles.resultView}>
                 <View style={styles.modal}>
                            <Image
                                 style={{ width: '50%', height: '100%', resizeMode: 'stretch' }}
                                 source={require('../assets/CounterImage.jpg')}
                               />
                        <this.GameResultcount/>
                  </View>
                  <View style={styles.modal2}>
                       <Image
                                 style={{ width: '20%', height: '100%', resizeMode: 'stretch' }}
                                 source={require('../assets/bulls.jpg')}
                               />
                         <this.GameResult/>
                         <Image
                                 style={{ width: '20%', height: '100%', resizeMode: 'stretch' }}
                                 source={require('../assets/cow.jpg')}
                               />
                  </View>
                 </View>
            <View style={styles.center}>
                 <View style={styles.input}>
                     <TextInput
                     placeholder = "Enter a number..."
                     keyboardType={'numeric'}
                     placeholderTextColor = "#9a73ef"
                     autoCapitalize = "none"
                     onChangeText = {number =>this.setState({number})}/>
                 </View>
            </View>
                <View style={styles.modal3}>
                            <Image
                                 style={{ width: 1, height: 1, resizeMode: 'stretch' }}
                                 source={require('../assets/CounterImage.jpg')}
                               />
                        <Text style={{fontSize:10,alignItems:'center'}}>{this.setState.number}</Text>
                  </View>
                  <TouchableOpacity
                           style={styles.GuessView}
                           onPress={this.Guess}
                           underlayColor='white'>
                           <Text style={styles.Guesstext}>Click to Guess</Text>                
                  </TouchableOpacity>
        </ImageBackground>
        </View>
         )
      }
}
export default Game

const styles = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection: 'column',
   },
   image:{
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover",
   },
   input: {
      margin: 15,
      height: 50,
      width:300,
      borderColor: 'orange',
      backgroundColor:'white',
      borderWidth: 4,
      alignItems:'center',
      borderRadius: 100/2,
      justifyContent: 'center',
      shadowRadius:20,
      bottom:'20%'
   },
   ButtonNewGame:{
      width: '20%', 
      height: '10%', 
      borderColor:'yellow',
      borderWidth:1,
      backgroundColor: '#FF9800', 
      justifyContent: 'center', 
      alignItems: 'center',
      position: 'absolute',
      top:"14%",
      borderRadius: 100/2,
      padding:1
   },
   newGameText:{
      color: '#fff',
      fontSize:13,
   },
   GuessView: {
      width: '100%', 
      height: 50, 
      backgroundColor: 'green', 
      borderColor:'white',
      borderWidth:1,
      justifyContent: 'center', 
      alignItems: 'center',
      position: 'absolute',
      bottom: '37%',
      borderRadius: 100/2,
      borderColor:'white',
      
   },
   NewGameView:{
      width: '100%', 
      height: 50, 
      backgroundColor: '#FF9800', 
      justifyContent: 'center', 
      alignItems: 'center',
      position: 'absolute',
      bottom: 0
   },
   Guesstext:{
      color: '#fff',
      fontSize:22
   },
   modal:{
      textAlign:'center',
      flexDirection:'row',
      borderColor:'red',
      borderWidth:2,
      justifyContent:'space-between',
      width: '20%',
      height: 50,
      backgroundColor:'white',
      borderRadius: 44/2,
      padding:8,
   },
   imageCount:{
      width:10
   },
   modal2:{
      textAlign:'center',
      flexDirection:'row',
      borderColor:'red',
      borderWidth:3,
      justifyContent:'space-between',
      width: '55%',
      height: 50,
      backgroundColor:'white',
      borderRadius: 44/2,
      padding:8,
   },
   modal3:{
      textAlign:'center',
      flexDirection:'row',
      borderColor:'orange',
      borderWidth: 4,
      justifyContent:'space-between',
      width: '30%',
      height: 20,
      padding:10,
      backgroundColor:'white',
      borderRadius: 44/2,     
      position: 'absolute',
      bottom: '44%',
   },
   center:{
      alignItems: 'center'
 },
 resultView:{
   flexDirection: 'row',
   justifyContent:'space-between',
   alignItems:'stretch',
   bottom:'5%'
 }
})
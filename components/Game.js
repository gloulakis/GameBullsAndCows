import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet,Button } from 'react-native'

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

function getHint(secret, guess) {
    let bulls = 0;
    let cows = 0;
    let counter=0;
    var numbers = new Array(10);
    for (var i=0; i<10; i++){
      numbers[i] = 0;
    }
       for (var i = 0; i<secret.length; i++) {
          var s = secret.charCodeAt(i) - 48;
          var g = guess.charCodeAt(i) - 48;
          console.log(s,g)
          if (s == g) bulls++;
          else {
            if (numbers[s] < 0) cows++;
            if (numbers[g] > 0) cows++;
            numbers[s] ++;
            numbers[g] --; 
            }
        }

      if (bulls == 4){
        return "You Win -> " + "Bulls: "+ bulls + " --- " + "Bulls: " + cows;
      }else{
        return  "Bulls: "+ bulls + " --- " + "Bulls: " + cows;
      }
}

function getNumber(Mynum){
  var number = Mynum
  return number
}
let RandomNumber = GuessNumber()

class Game extends Component {
    
      constructor(props) {
        super(props)
        this.state = {
          lastRefresh: Date(Date.now()).toString(),
          number: '',
          result:'',
          randomNum:''
        }
        this.randomNum = RandomNumber
        this.refreshScreen = this.refreshScreen.bind(this)
      }

      refreshScreen() {
          this.setState({ lastRefresh: Date(Date.now()).toString() })
      }

      NewGame=()=>{
         let num2 = GuessNumber()
         this.randomNum=num2
         console.log(this.randomNum)
      }

      Guess = (number) => {
          let num = this.randomNum
          var GuessedNumber = this.state.number
          var info = getHint(num.toString(),GuessedNumber.toString())
          console.log(info)
      }

   render() {
        return (
            <View style = {styles.container}>
               <Button onPress={this.NewGame} title="New Game" />
               <TextInput style = {styles.input}
                  placeholder = "Guess the number"
                  keyboardType={'numeric'}
                  placeholderTextColor = "#9a73ef"
                  autoCapitalize = "none"
                  onChangeText = {number =>this.setState({number})}/>
               
               <Button onPress={this.Guess} title="Click to Guess" />
            </View>
         )
       }
}
export default Game

const styles = StyleSheet.create({
   container: {
      paddingTop: 23
   },
   input: {
      margin: 15,
      height: 40,
      width:200,
      borderColor: '#7a42f4',
      borderWidth: 1
   },
   submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      height: 40,
   },
   submitButtonText:{
      color: 'white'
   }
})
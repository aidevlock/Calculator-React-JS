import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Dimensions} from 'react-native';


export default function App() {

    const [ lastNumber, setLastNumber ] = useState();
    const [ currentNumber, setCurrentNumber ] = useState('');
    const operators = [ "C", "DEL", "%", "/", 7, 8, 9, "*", 4, 5, 6, "-", 1, 2, 3, "+", "+/-", 0, ".", "=" ];


       const styles = StyleSheet.create({
      main: {
        flex: 1,
        display: 'flex',
      },
      name: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
      },
      resultContainer: {
        flex: 2,
        maxWidth: '100%',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
      },

      textContainer: {
        minHeight: 105,
        justifyContent: "flex-end"
      },
    
      textHistory: {

        fontSize: 50,
        paddingRight: 15,
        alignSelf: "flex-end",
      },
    
      textResult: {
        
        fontSize: 70,
        paddingRight: 15,
        alignSelf: "flex-end",
     
      },
    
      operatorContainer: {       
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 20,
        justifyContent: 'center',
        lignItems: 'flex-end',
        backgroundColor: "black"
      },
      
      operators: {
        flex: 1,
        minHeight: Dimensions.get('window').height/10,
        minWidth: Dimensions.get('window').width/5,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        margin: 2,
        backgroundColor: "blue"
      }, 
      
      operatorsText: {
        color: "white",
        fontSize: 24,
      }
    });
    

    function handleButtonPress(buttonPressed){
      if(buttonPressed == "+" || buttonPressed == "-" || buttonPressed == "*" || buttonPressed == "/"){
        
        if(currentNumber.toString().indexOf("+") == -1 && currentNumber.toString().indexOf("-") == -1 && currentNumber.toString().indexOf("*") == -1 && currentNumber.toString().indexOf("/") == -1){
          setCurrentNumber(currentNumber + " " + buttonPressed + " ");
          return;
        }else{
          const newNumberCurrent = currentNumber.toString().substring(0, currentNumber.length - 3);
          setCurrentNumber('');
          setCurrentNumber(newNumberCurrent + " " + buttonPressed + " ");
          return;
        }
      }

      switch(buttonPressed){
        case 'C':
          setLastNumber('');
          setCurrentNumber('');
        return;
        case 'DEL':
          setCurrentNumber(currentNumber.slice(0, -1));
        return;
        case '=':
          setLastNumber(currentNumber + "=");
          calculate()
        return;
        case '+/-':
          var change = currentNumber * -1;
          isNaN(change) ? Alert.alert("Invalid Format") : setCurrentNumber(change);
        return;
        case '%':
          var change = currentNumber / 100;
          isNaN(change) ? Alert.alert("Invalid Format") : setCurrentNumber(change);
        return;
      }

     setCurrentNumber(currentNumber + buttonPressed);
    }

    function calculate(){

     const splitNumbers = currentNumber.toString().split(" ");
     const firstNumber = parseFloat(splitNumbers[0]);
     const secondNumber = parseFloat(splitNumbers[2]);
     const operation = splitNumbers[1];

      if(!isNaN(secondNumber)){
        switch(operation){
          case '+':
            var result = firstNumber + secondNumber;
            setCurrentNumber(result);
          return;
          case '-':
            var result = firstNumber - secondNumber;
            setCurrentNumber(result);
          return;
          case '*':
            var result = firstNumber * secondNumber;
            setCurrentNumber(result);
          return;
          case '/':
            var result = firstNumber / secondNumber;
            setCurrentNumber(result);
          return;
          default: 
            setLastNumber('');
            setCurrentNumber('');
          return;
        }
      }else{
        Alert.alert("Invalid format");
      }
    }

  return (
      
    <View style={styles.main}>
      <Text style= {styles.name}>John Patrick Lachama</Text>
      <View style={styles.resultContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.textHistory}>
            {lastNumber}
          </Text>
          <Text style={styles.textResult}>
            {currentNumber}
          </Text>

        </View>
      </View>
    
      <View style={styles.operatorContainer}>
        
          {
            operators.map((char) => (
               (char) === 'C' ?
                <TouchableOpacity
                  key={char} 
                  style={[styles.operators]}
                  onPress={() => handleButtonPress(char)}
                >
                  <Text style={styles.operatorsText}>{char}</Text>
                </TouchableOpacity>
              :
                <TouchableOpacity 
                  key={char} 
                  style={[styles.operators, {
                    backgroundColor: typeof(char) === 'number'  || (char) === 'DEL'  || (char) === '%' || (char) === '+/-' || (char) === '.'  
                  
                  }]}
                  onPress={() => handleButtonPress(char)}
                >
                  <Text style={styles.operatorsText}>{char}</Text>
                </TouchableOpacity>

            ))
          }

      </View>
    </View>
    );
}
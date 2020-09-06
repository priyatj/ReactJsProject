import React, { Component, Fragment } from "react";
import {
  StyleSheet,
  View,
  Button,
  Input,
  Text,
  Alert,
  ScrollView,
  TextInput,
  SafeAreaView,
  FlatList,
  TouchableHighlight,
  Image,
} from "react-native";
import { Table, Row, Rows, Col } from "react-native-table-component";
import DropDownPicker from 'react-native-dropdown-picker';
import { TabViewAnimated, TabViewPage, TabBarTop } from 'react-native-tab-view';


var jwtToken;

class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myArray: "",
      tableHead1: "NAME",
      tableHead2: "RATING",
      tableData: "",
      defaultDropdown: "1",
      show:false,
      numberOfElements:"",
      name: "",
      rating:"",
      showAddFilms: false,
      showLogin: true,
      widthArr: [40, 100, 80, 100, 120, 140, 160, 180, 200],
      index: 0,
    routes: [
      { key: '1', title: 'First' },
      { key: '2', title: 'Second' },
    ],
    };
  }

  handleSubmit = () => {
    var name;
    var rating;

      try {
        fetch("http://10.165.0.158:8080/api/v1/films", {
          method: "POST",
          body: JSON.stringify({
            name: this.state.name,
            rating: this.state.rating,
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + jwtToken,
          },
        }).then((resp) => {
          setTimeout(function () {
            if (resp.status == 200) {
              alert(
                "Movie is successfully added to table"
              );
            } else {
              alert(
                "Your request is unsucessful due to errorcode: " +
                resp.status +
                " and message: " +
                resp.statusText
              );
            }
          }, 0);
        });
        this.setState({
          name: '',
          rating: ''
        });
      } catch (e) {
        console.log(e);
        console.log("--------------------------------");
      }
   // }
    
  };

  handleLogin = () => {

      try {
        fetch("http://10.165.0.158:8080/api/v1/login", {
          method: "POST",
          body: JSON.stringify({
            username: this.state.username,
          }),
          header: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + jwtToken,
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            jwtToken = data.token;
            alert("You are successfully logged in!");
            this.setState({
              username: '',showAddFilms:true, showLogin: false
            });
          });
          
      } catch (e) {
        console.log(e);
        console.log("--------------------------------");
      }
 
    
  };

  getDataUsingGet = () => {
    var tableHead1 = "Name";
    var tableHead2 = "Rating";
    var nameArray = [];
    var ratingArray = [];
    var tableData = [];

    try{
    fetch("http://10.165.0.158:8080/api/v1/films", {
      method: "GET",
      header: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        res.forEach((details) => {
          //alert(JSON.stringify(res));

          nameArray.push(details.name);
          ratingArray.push(details.rating);
        });
        this.setState({
          tableHead1: this.state.tableHead1,
          tableHead2: this.state.tableHead2,
          nameArray: nameArray,
          ratingArray: ratingArray,
          show: true,
          numberOfElements: nameArray.length + ratingArray.length
        });
      });
    } catch (e) {
      console.log(e);
      console.log("--------------------------------");
    }

  };

  updateFilms = () => {

      try {
        fetch("http://10.165.0.158:8080/api/v1/films", {
          method: "PUT",
          body: JSON.stringify({
            name: this.state.name,
            rating: this.state.rating,
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + jwtToken,
          },
        }).then((resp) => {
          setTimeout(function () {
            if (resp.status == 200) {
              alert(
               "Movie with a new rating is added to table"
              );
           //   console.log(resp);
            } else {
              alert(
                "Your request is unsucessful due to errorcode: " +
                resp.status +
                " and message: " +
                resp.statusText
              );
            }
          }, 0);
        });
      } catch (e) {
        console.log(e);
        console.log("--------------------------------");
      }

    this.setState({
      name: '',
      rating: ''
    })
  };
  

  render() {

    return (
      <SafeAreaView style={{ backgroundColor: 'powderblue', width: '100%',
      height: "100%",borderWidth: 3}}>
        <View>
      
          
        <Text style={styles.header}> </Text>
        <Text style={styles.headerText}>Movie Bazar! :) </Text>
          <ScrollView>
          { this.state.showLogin &&
            <View>
          <Image 
              source={{
                width: 200,
                height: 200, 
                uri:
                  "https://www.wallpaperup.com/uploads/wallpapers/2015/12/12/859126/5b431ce5733d1553d3b7bf0efc11412e-700.jpg",
              }}
            />
            <Text style={styles.text}>Priy:</Text>
            <Text style={styles.text}>Username:</Text>
            <TextInput style={styles.TextInput}
              placeholder="Enter your username here!"
              onChangeText={(username) => this.setState({ username })}
              value={this.state.username}
            />
            <View>
              <Button style={styles.button}
                width="50" height="50"
                color="#737373"
                title="Login"
                name="username"
                onPress={this.handleLogin}
              />

            </View>
            </View>}
          
          {
              this.state.showAddFilms &&
              <View>
            <Text style={styles.text}>Movie name:</Text>
            <TextInput style={styles.TextInput}
              placeholder="Enter movie name here!"
              onChangeText={(name) => this.setState({ name })}
              value={this.state.name}
            />

            <Text style={styles.text}>Rating:</Text>
            <TextInput style={styles.TextInput}
              placeholder="Enter rating here!"
              onChangeText={(rating) => this.setState({ rating })}
              value={this.state.rating}
              maxLength={1}
            />
           
              <Button style={styles.button}
                color="#737373"
                title="Submit"
                onPress={this.handleSubmit}
              />
               <Button style={styles.button} 
                title="Update"
                color="#737373"
                onPress={this.updateFilms}
              />
           </View>}
              <Button style={styles.button}
                title="Display Films"
                color="#737373"
                onPress={this.getDataUsingGet}
              />
         
            {
              this.state.show &&
            <Table style={styles.tableContainer}>
              <View style={styles.rowView} data={this.state.tableHead1}>
                <View style={styles.columnView}>
                  <Text style={styles.text}>Movie name</Text>
                  <Col style={styles.text} data={this.state.nameArray} />
                </View>
                <View style={styles.rowView} data={this.state.tableHead2}>
                  <View style={styles.columnView}>
                    <Text style={styles.text}>Rating</Text>
                    
                    <Col
                      style={styles.text}
                      data={this.state.ratingArray}
                    />
               
                  </View>
                </View>
            
              </View>
            </Table>}

          </ScrollView>
      
        </View>
       
      </SafeAreaView>
   
    );
  }
}


const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    padding: 16,
    paddingTop: 30,
    backgroundColor: "dodgerblue",
  },
  header_footer_style: {
    width: '100%',
    height: 45,
    backgroundColor: '#606070',
  },
  tableContainer: {
    flex: 1,
    padding: 16,
    paddingTop: 10,
   
    alignItems: "center",
  
  },
  headerText:{
    fontFamily: "Cochin", fontSize: 30,
    fontWeight: "bold", alignItems: "center", justifyContent: "center", padding: 16,
  },
  button:{
    paddingTop: 10, margin: 10,
  },
  header: { height: 50, backgroundColor: "#537791" , paddingTop: 10, },
  footer: { height: 50, backgroundColor: "#537791" , paddingBottom: 10, },

  TextInput: {
    height: 40, borderColor: 'gray', borderWidth: 1, 
  },
  text: {
    margin: 6, paddingTop: 5, fontSize: 20
  },
  form: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
backgroundColor: 'powderblue',
    flexDirection: "column",
    paddingTop: 10,
    width: "100%",
    height: "40%",
  },

  rowView: {
    flexDirection: "row",
    
    
  },
  columnView: {
    flexDirection: "column",
    borderColor: 'gray', borderWidth: 1,  
    
  },

  dataWrapper: { marginTop: -1 },
  row: {
    height: 60,
    justifyContent: "center",
    flexDirection: "column",
    margin: 10,
    backgroundColor: "powderblue",paddingTop: 10,
  },
  div: { justifyContent: "center", paddingTop: 10, },
});
export default SettingsScreen;
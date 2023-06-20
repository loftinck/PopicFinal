import { View, Text } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RequestScreen from "./RequestScreen";
import SuggestionScreen from "./SuggestionScreen";
import FriendsListScreen from "./FriendsListScreen";

const topTab = createMaterialTopTabNavigator();

function FriendsTab() {
  return (
    <topTab.Navigator
        screenOptions={ {
          // activeTintColor: "red",
          inactiveTintColor: "grey",
          // backgroundColor: 'red',
          // tabBarShowLabel: false,
          // tabBarShowIcon: false,

          tabBarIndicatorStyle: {backgroundColor: '#C9DCBD', height: '100%', borderRadius: 30, borderColor: 'green', borderWidth: 2},

          // tabBarShowIndicator: false,
          // tabBarGap: 100,
          tabBarStyle: {
            // backgroundActiveColor: 'green'
            borderRadius: 30,
            borderWidth: 2,
            borderColor: 'transparent',
            margin: 10,
            activeTintColor: 'red',
          }
          // backgroundColor: 'red'
          // borderRadius: 100,
    }
    }
    // screenOptions={{
    //   // borderRadius: 100 
    // }} 
    // options={ {
    //   borderRadius: 100, 
    // }
  
    // }
    >
      <topTab.Screen name="Suggestions" component={SuggestionScreen} />
      <topTab.Screen name="Demandes" component={RequestScreen} />
        <topTab.Screen name="Liste d'amis" component={FriendsListScreen} />
    </topTab.Navigator>
  );
}

// function FriendsScreen() {
//     return (
//         <View>
//             <Text>You don't have any friends yet</Text>
//         </View>
//     );
// }

export default FriendsTab;
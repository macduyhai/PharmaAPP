import React from "react";
import { DeviceEventEmitter, Alert, View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Avatar, Badge, Icon, withBadge } from "react-native-elements";

import Category from "./screens/Category";
import Categories from "./screens/Categories";
import Cart from "./screens/Cart";
import Orders from "./screens/Orders";
import Settings from "./screens/Settings";
// import { router } from "json-server";

const Tab = createBottomTabNavigator();

const StackCategory = createStackNavigator();
const StackCart = createStackNavigator();
const StackOrders = createStackNavigator();
const StackSettings = createStackNavigator();

function IconWithBadge({ iconName, badgeCount, color, size }) {
  return (
    <View style={{ width: 24, height: 24, margin: 5 }}>
      <Ionicons name={iconName} size={size} color={color} />
      {badgeCount > 0 && (
        <View
          style={{
            // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
            position: "absolute",
            right: -6,
            top: -3,
            backgroundColor: "red",
            borderRadius: 6,
            width: 12,
            height: 12,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>
            {badgeCount}
          </Text>
        </View>
      )}
    </View>
  );
}
function CartIconWithBadge(props) {
  // You should pass down the badgeCount in some other ways like React Context API, Redux, MobX or event emitters.
  return <IconWithBadge {...props} badgeCount={3} />;
}

function CategoryStackNavigator({ navigation }) {
  return (
    <StackCategory.Navigator initialRouteName="Categories">
      <StackCategory.Screen
        name="Categories"
        component={Categories}
        options={{ title: "Home" }}
      />
      <StackCategory.Screen
        name="Category"
        component={Category}
        options={({ route }) => ({ title: route.params.categoryName })}
      />
    </StackCategory.Navigator>
  );
}
function CartStackNavigator({ navigation }) {
  return (
    <StackCart.Navigator initialRouteName="Cart">
      <StackCart.Screen
        name="Cart"
        component={Cart}
        // options={{ title: "Cart" }}
        options={({ route }) => ({ title: "Cart" })}
      />
    </StackCart.Navigator>
  );
}

function OrdersStackNavigator({ navigation }) {
  return (
    <StackOrders.Navigator initialRouteName="Orders">
      <StackOrders.Screen
        name="Orders"
        component={Orders}
        options={{ title: "Orders" }}
      />
    </StackOrders.Navigator>
  );
}
function SettingsStackNavigator({ navigation }) {
  return (
    <StackSettings.Navigator initialRouteName="Settings">
      <StackSettings.Screen
        name="Settings"
        component={Settings}
        options={{ title: "Settings" }}
      />
    </StackSettings.Navigator>
  );
}

function AppStackNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "ios-home" : "ios-home";
            // Alert.alert("home");
          } else if (route.name === "Settings") {
            iconName = focused ? "ios-list-box" : "ios-list";
          } else if (route.name === "Cart") {
            // iconName = focused ? "ios-cart" : "ios-cart";
            return (
              <CartIconWithBadge
                iconName={focused ? "ios-cart" : "ios-cart"}
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Orders") {
            iconName = focused ? "ios-albums" : "ios-albums";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Home" component={CategoryStackNavigator} />
      <Tab.Screen name="Cart" component={CartStackNavigator} />
      <Tab.Screen name="Orders" component={OrdersStackNavigator} />
      <Tab.Screen name="Settings" component={SettingsStackNavigator} />
    </Tab.Navigator>
  );
}

export default AppStackNavigator;

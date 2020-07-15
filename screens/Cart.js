import React, { Component } from "react";
// import { View } from "react-native";
import Header from "../components/Header";
import ItemsContainer from "../components/ItemsContainer";
import Discounts from "../components/Discounts";
import TotalComp from "../components/TotalComponent";
import Orders from "./Orders";
import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation } from "@react-navigation/native";
// import icons
import Icon from "react-native-vector-icons/Ionicons";
import {
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";

//--------------------------------

var { width } = Dimensions.get("window");
var status = false;
export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataCart: [],
      totalItem: 0,
      totalMoney: 0,
    };
  }

  componentDidMount() {
    // Alert.alert("componentDidMount");
    AsyncStorage.getItem("cart")
      .then((cart) => {
        if (cart !== null) {
          // We have data!!
          const cartitem = JSON.parse(cart);
          this.setState({ dataCart: cartitem });
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={{ height: 20 }} />

        <View style={{ height: 10 }} />

        <View style={{ flex: 1 }}>
          <ScrollView>
            {this.state.dataCart.map((item, i) => {
              if (status == false && i < this.state.dataCart.length) {
                this.state.totalItem = this.state.totalItem + item.quantity;
                this.state.totalMoney =
                  this.state.totalMoney + parseInt(item.price, 10);
              }
              return (
                <View
                  style={{
                    width: width - 20,
                    margin: 10,
                    backgroundColor: "transparent",
                    flexDirection: "row",
                    borderBottomWidth: 2,
                    borderColor: "#cccccc",
                    paddingBottom: 10,
                  }}
                >
                  <Image
                    resizeMode={"contain"}
                    style={{ width: width / 4, height: width / 4 }}
                    source={{
                      uri: item.product.images[0].url,
                    }}
                  />
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: "trangraysparent",
                      padding: 10,
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                        {item.product.name}
                      </Text>
                      <Text>Sản phẩm mới</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "bold",
                          color: "#f19e32",
                          fontSize: 15,
                        }}
                      >
                        {item.price * item.quantity}K
                      </Text>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <TouchableOpacity
                          onPress={() => this.onChangeQuan(i, false)}
                        >
                          <Icon
                            name="ios-remove-circle"
                            size={35}
                            color={"#f19e32"}
                          />
                        </TouchableOpacity>
                        <Text
                          style={{
                            paddingHorizontal: 8,
                            fontWeight: "bold",
                            fontSize: 18,
                          }}
                        >
                          {item.quantity}
                        </Text>
                        <TouchableOpacity
                          onPress={() => this.onChangeQuan(i, true)}
                        >
                          <Icon
                            name="ios-add-circle"
                            size={35}
                            color={"#f19e32"}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
          <View style={{ height: 20 }} />

          <TotalComp
            count={this.state.totalItem}
            money={this.state.totalMoney}
          />

          <TouchableOpacity
            style={{
              backgroundColor: "#f19e32",
              width: width - 40,
              alignItems: "center",
              padding: 10,
              borderRadius: 5,
              margin: 20,
            }}
            onPress={() => {
              this.removeItemValue("cart");
              status = false;
              this.setState({ totalItem: 0 });
              this.setState({ totalMoney: 0 });
              this.setState({ dataCart: [] });
              // navigation.navigate("Orders");
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "white",
              }}
            >
              Thanh Toán
            </Text>
          </TouchableOpacity>

          <View style={{ height: 20 }} />
        </View>
      </View>
    );
  }
  async removeItemValue(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (exception) {
      return false;
    }
  }
  onChangeQuan(i, type) {
    status = true;
    const dataCar = this.state.dataCart;
    let cantd = dataCar[i].quantity;

    if (type) {
      cantd = cantd + 1;
      dataCar[i].quantity = cantd;
      this.setState({ dataCart: dataCar });
      this.setState({ totalItem: this.state.totalItem + 1 });
      this.setState({
        totalMoney: this.state.totalMoney + parseInt(dataCar[i].price, 10),
      });
    } else if (type == false && cantd >= 2) {
      cantd = cantd - 1;
      dataCar[i].quantity = cantd;
      this.setState({ dataCart: dataCar });
      this.setState({ totalItem: this.state.totalItem - 1 });
      this.setState({
        totalMoney: this.state.totalMoney - parseInt(dataCar[i].price, 10),
      });
    } else if (type == false && cantd == 1) {
      this.setState({
        totalMoney: this.state.totalMoney - parseInt(dataCar[i].price, 10),
      });
      dataCar.splice(i, 1);
      this.setState({ dataCart: dataCar });
      this.setState({ totalItem: this.state.totalItem - 1 });
    }
  }
}

// import React, { Component } from "react";
// import { Text } from "react-native";
// import { ListItem } from "react-native-elements";

// export default class CartScreen extends Component {
//   static navigationOption = { title: "Cart" };
//   render() {
//     return <Text>Cart</Text>;
//   }
// }

// import React, { Component } from "react";
// import { View } from "react-native";
// import Header from "../components/Header";
// import ItemsContainer from "../components/ItemsContainer";
// import Discounts from "../components/Discounts";
// import Footer from "../components/Footer";

// export const CartContext = React.createContext();

// export class Cart extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       cartItems: [],
//     };
//     this.addtoCart = this.addtoCart.bind(this);
//   }
//   addtoCart(product) {
//     this.setState({
//       cartItems: this.state.cartItems.concat(product),
//     });
//   }
//   render() {
//     return (
//       <CartContext.Provider
//         value={
//           {
//             // cartItems=this.state.cartItems,
//             // addtoCart=this.addtoCart
//           }
//         }
//       >
//         {this.props.children}
//       </CartContext.Provider>
//       // <View style={{ flex: 1 }}>
//       //   {/* <Header /> */}
//       //   <ItemsContainer />
//       //   <Discounts />
//       //   <Footer />
//       // </View>
//     );
//   }
// }

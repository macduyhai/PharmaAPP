import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import ProductListItem from "../components/ProductListItem";
import { FlatList } from "react-native-gesture-handler";
import axios from "axios";

// const onAddToCartClick = (props) => {
//   const oldproduct = localStorage.getItem("products")
//     ? localStorage.getItem("products")
//     : "[]";
//   const arrayproduct = JSON.parse(oldproduct);
//   let productsString = data.products;

//   if (productsString) {
//     products = JSON.parse(productsString);
//   }

//   localStorage.setItem("products", JSON.stringify(arrayproduct));
// };

export default class Category extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("categoryName"),
      categoryID: navigation.getParam("categoryID"),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      products: [
        // {
        //   id: 1,
        //   images: [
        //     {
        //       url:
        //         "http://www.hungvietpharma.vn/wp-content/uploads/2020/03/n%E1%BA%A5m-tr%C3%B9ng-th%E1%BA%A3o-600x600.jpg",
        //     },
        //   ],
        //   name: "Nấm trùng thảo Linh Chi Gold",
        //   price: "500.000 VND",
        // },
        // {
        //   id: 2,
        //   images: [
        //     {
        //       url:
        //         "http://www.hungvietpharma.vn/wp-content/uploads/2020/02/7f3b347292a46afa33b5-600x600.jpg",
        //     },
        //   ],
        //   name: "Tinh dầu tràm Bảo Linh",
        //   price: "400.000 VND",
        // },
      ],
    };
  }

  componentDidMount() {
    axios
      // .get("https://4e184da24ee5.ngrok.io/products")
      .get("/products")
      .then((res) => {
        this.setState({
          products: res.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  onAddToCartClick = () => {
    const itemcart = {
      // food: "product",
      // quantity: 1,
      // price: product.price,
      food: "Mitom",
      quantity: 1,
      price: 500,
    };
    return AsyncStorage.getItem("cart")
      .then((datacart) => {
        if (datacart !== null) {
          // We have data!!
          const cart = JSON.parse(datacart);
          cart.push(itemcart);
          AsyncStorage.setItem("cart", JSON.stringify(cart));
        } else {
          const cart = [];
          cart.push(itemcart);
          AsyncStorage.setItem("cart", JSON.stringify(cart));
        }
        alert("Add Cart");
      })
      .catch((err) => {
        alert(err);
      });
  };
  render() {
    return (
      <FlatList
        data={this.state.products}
        contentContainerStyle={styles.container}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.wrapper}>
            <ProductListItem product={item} onAddToCartClick />
          </View>
        )}
        keyExtractor={(item) => "${item.id}"}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingTop: 16,
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 8,
  },
});

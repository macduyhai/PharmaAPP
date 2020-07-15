import React from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";
import MedicineImage from "../assets/medicine.png";
import AsyncStorage from "@react-native-community/async-storage";

export default function ProductListItem(props) {
  const { product } = props;
  onAddToCartClick = () => {
    const itemcart = {
      product: product,
      quantity: 1,
      price: product.price,
      image:
        "http://www.hungvietpharma.vn/wp-content/uploads/2020/02/7f3b347292a46afa33b5-600x600.jpg",
    };
    AsyncStorage.getItem("cart")
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
  return (
    <View style={styles.shadown}>
      <View style={styles.container}>
        <Image style={styles.img} source={{ uri: product.images[0].url }} />
        <View style={styles.infor}>
          <Text style={styles.name}>{product.name}</Text>
          <View style={styles.priceRow}>
            {/* <Text style={styles.price}> {formatPrice(product.price)}</Text> */}
            <Text style={styles.price}> {product.price}</Text>
            <TouchableOpacity onPress={this.onAddToCartClick.bind(this)}>
              <Text style={styles.cartText}> Mua +1</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>

    // <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
    //   <View style={styles.container}>
    //     <Text style={styles.title}> {category.name}</Text>
    //     <Image style={styles.categoryImage} source={MedicineImage} />
    //   </View>
    // </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cartText: {
    textTransform: "uppercase",
    fontSize: 16,
    color: "#2f95dc",
  },
  shadown: {
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 0 },
  },
  container: {
    marginBottom: 20,
    borderRadius: 4,
    backgroundColor: "#FFF",
    overflow: "hidden",
  },
  infor: {
    padding: 8,
  },
  img: {
    height: 150,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  name: {
    fontSize: 16,
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontSize: 16,
    color: "#888",
    flex: 1,
  },
  categoryImage: {
    width: 64,
    height: 64,
  },
  title: {
    textTransform: "uppercase",
    marginBottom: 8,
    fontWeight: "700",
  },
});

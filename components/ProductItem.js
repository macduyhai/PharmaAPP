import React from "react";
import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
//ProductItem.js
const { location } = this.props;
function addProductToCart() {
  const oldproduct = localStorage.getItem("products")
    ? localStorage.getItem("products")
    : "[]";
  const arrayproduct = JSON.parse(oldproduct);
  let productsString = data.products;
  let products = location.state;

  arrayproduct.push(products);
  if (productsString) {
    products = JSON.parse(productsString);
  }

  localStorage.setItem("products", JSON.stringify(arrayproduct));
}

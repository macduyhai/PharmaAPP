import React from "react";
import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Sanphamkhac from "../assets/medicine.png";
import Duocpham from "../assets/duoc-pham.png";
import Mypham from "../assets/my-pham.png";
import Thietbiyte from "../assets/thiet-bi-te.png";
import Thucphamcssk from "../assets/thuc-pham-cssk.png";

import { formatPrice } from "../utils/Number";

export default function CategoryListItem(props) {
  const { onPress, category, product } = props;

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.title}> {category.name}</Text>
        <Image style={styles.categoryImage} source={Sanphamkhac} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 16,
    borderRadius: 4,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    marginBottom: 16,
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

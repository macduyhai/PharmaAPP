import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Item from "./Item";

// const TotalComponent = (props) => {
function TotalComponent(props) {
  const { containerStyle, goodsStyle, totalStyle } = styles;
  const { count, money } = props;
  // const { products } = this.state;
  return (
    <View style={containerStyle}>
      <View style={goodsStyle}>
        <Icon name="ios-cart" size={20} style={{ marginRight: 8 }} />
        <Text> {count}</Text>
        <Text> sản phẩm</Text>
      </View>

      <View style={totalStyle}>
        <Text>Tổng - </Text>
        <Text>{money}</Text>
        <Text> K</Text>
      </View>
    </View>
  );
}

const styles = {
  containerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 8,
  },
  goodsStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 32,
  },
};

export default TotalComponent;

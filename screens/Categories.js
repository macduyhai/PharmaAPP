import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import axios from "axios";

import CategoryListItem from "../components/CategoryListItem";

export default class Categories extends React.Component {
  static navigationOptions = {
    headerTitle: "Meal Categories",
  };

  constructor(props) {
    super(props);
    this.state = {
      categories: [
        // { id: 1, name: "Dược phẩm" },
        // { id: 2, name: "Thực phẩm chăm sóc sức khỏe " },
        // { id: 3, name: "Mỹ phẩm " },
        // { id: 4, name: "Thiết bị y tế" },
        // { id: 5, name: "Sản phẩm khác" },
      ],
    };
  }

  componentDidMount() {
    axios
      // .get("https://4e184da24ee5.ngrok.io/categories")
      .get("/categories")
      .then((res) => {
        this.setState({
          categories: res.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { navigation } = this.props;
    const { categories } = this.state;
    return (
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <CategoryListItem
            category={item}
            onPress={() =>
              navigation.navigate("Category", {
                categoryName: item.name,
                categoryID: item.category,
              })
            }
          />
        )}
        keyExtractor={(item) => `${item.key}`}
        contentContainerStyle={styles.container}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
});

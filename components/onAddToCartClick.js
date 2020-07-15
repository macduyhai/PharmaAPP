const AddToCartButton = (product) => {
  const itemcart = {
    food: product,
    quantity: 1,
    price: product.price,
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

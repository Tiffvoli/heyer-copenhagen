import GoCart from './cart/cart';

var cart;
var moneyFormat = Shopify.currencyFormat;

window.addEventListener('DOMContentLoaded', (event) => {
  cart = new GoCart({
    cartMode: 'drawer',
    addToCart: '.js-add-to-cart',
    cartTrigger: '.js-cart-trigger',
    moneyFormat: moneyFormat,
  });
});

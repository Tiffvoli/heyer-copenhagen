import GoCart from './cart/cart';

var cart;

window.addEventListener('DOMContentLoaded', (event) => {
  cart = new GoCart({
    cartMode: 'drawer',
    cartTrigger: '.js-cart-trigger',
    cartCount: '.js-cart-counter',
    addToCart: '.js-cart-add-to-cart',
    moneyFormat: Shopify.currencyFormat,
  });
});

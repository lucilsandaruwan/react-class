import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductList from 'product_list.json';
import SearchBox from 'components/global/SearchBox';


@connect(state => ({
  counter: state.app.get('counter'),
}))
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    };
    this.productClickHandler = this.productClickHandler.bind(this);
    this.updateCartItemsFromLocalStorage = this.updateCartItemsFromLocalStorage.bind(this);
    this.getProducts = this.getProducts.bind(this);
  }

  componentDidMount() {
    this.updateCartItemsFromLocalStorage();
    window.addEventListener('storage', this.updateCartItemsFromLocalStorage);
    this.getProducts();
  }

  getCartItems() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }

  addToCart(product) {
    const cart = this.getCartItems();
    if (!this.isInCart(product.name)) {
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      this.setState({cartItems: cart});
    }
  }

  isInCart(productName) {
    const cart = this.state.cartItems; 
    return cart.find(product => product.name == productName); 
  }

  getProducts(q='table') {
    console.log(q);
    fetch('/products_list/?q=' + q).then((response) => {
      return response.json();
    })
    .then((responseJson) => {
      console.log(this.state.products);
      this.setState({ products: responseJson.mods.listItems });
      
    })
    .catch((error) => {
      console.error(error);
    });
  }

  updateCartItemsFromLocalStorage() {
    this.setState({cartItems: this.getCartItems()});
  }

  productClickHandler(e, product) {
    e.preventDefault();
    this.addToCart(product);
  }

  render() {
    return (
      <div className='Home'>
        <SearchBox getProducts={ this.getProducts }/>
        {
          this.state.products.map((product, idx) => {
          return (<a key={ idx } className='productItem' href={ product.productUrl } onClick={ (e) => { this.productClickHandler(e, product, 123, 111); } }>
            <div className="productWrapper">
            <div className='productImage'> <img src={ product.image } /> </div>
            <div className='productDescription'> 
              <p>{product.name}</p>
              <p> {product.price} </p>
              <p> {product.brandName} </p>
              { this.isInCart(product.name) ? <p>added to cart</p> : null }
              
            </div>
            
            </div>
          </a>);
          })
        }
      </div>
    );
  }
}

import React, { Component } from 'react';
import { connect } from 'react-redux';


@connect(state => ({
  counter: state.app.get('counter'),
}))
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      cartItems: this.getCartItems()
    };
    this.productClickHandler = this.productClickHandler.bind(this);
  }

  componentDidMount() {
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
    return cart.find(product => {
      return product.name == productName;
    }); 
  }

  getProducts() {
    return fetch('assets/product_list.json')
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({ products: json });
      });
  }

  productClickHandler(e, product) {
    e.preventDefault();
    this.addToCart(product);
  }

  render() {
    return (
      <div className='Home'>
        {
          this.state.products.map((product, idx) => {
          return (<a key={ idx } className='productItem' href={ product.productUrl } onClick={ (e) => { this.productClickHandler(e, product, 123, 111); } }>
            <div className="productWrapper">
            <div className='productImage'> <img src={ product.image } /> </div>
            <div className='productDescription'> 
              <p>{product.name}</p>
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

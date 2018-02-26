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
    if (cart.indexOf(product.name) === -1) {
      cart.push(product.name);
      localStorage.setItem('cart', JSON.stringify(cart));
    }
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
            <img className='productImage' src={ product.image } />
            {product.name}
          </a>);
          })
        }
      </div>
    );
  }
}

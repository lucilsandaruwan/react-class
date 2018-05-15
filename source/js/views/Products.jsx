import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProducts } from 'actions/products';

@connect(state => ({
  error: state.products.get('error'),
  loading: state.products.get('loading'),
  products: state.products.get('products'),
}))
export default class Products extends Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool,
    products: PropTypes.object,
    // from react-redux connect
    dispatch: PropTypes.func,
  }

  componentWillMount() {
    const {
      dispatch,
      products,
    } = this.props;
    if (!products) {
      dispatch(getProducts());
    }
  }
  
  renderProducts() {
    const {
      products,
    } = this.props;
    return products.mods.listItems.map(product => {
      return (
        <a key={ product.sku } className='productItem' href={ product.productUrl } onClick={ (e) => { this.productClickHandler(e, product, 123, 111); } }>
            <div className="productWrapper">
            <div className='productImage'> <img src={ product.image } /> </div>
            <div className='productDescription'> 
              <p>{product.name}</p>
            </div>
            </div>
          </a>
      );
    });
  }

  render() {
    const {
      loading,
      error,
      products,
    } = this.props;

    return (
      <div className='Products'>
        <h1>Products</h1>
        { loading && <div>Loading products...</div> }
        { error && error.toString() }
        <div className='Products-list'>
          { products && this.renderProducts() }
        </div>
      </div>
    );
  }
}

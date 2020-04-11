import React from 'react';
import graphQLFetch from './graphQLFetch.js';

export default class ProductImage extends React.Component {
  constructor() {
    super();
    this.state = { product: {} };
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query product($id: Int!) {
      product(id: $id) {
        id category name price image
      }
    }`;

    const {
      match: {
        params: { id },
      },
    } = this.props;

    const data = await graphQLFetch(query, { id });
    if (data) {
      this.setState({ product: data ? data.product : {} });
    } else this.setState({ product: null });
  }

  render() {
    const { product } = this.state;
    return (
      <div>
        <h3>
          Image for :
          { product.name }
        </h3>
        <img src={product.image} alt={product.name} height="300px" width="300px" />
      </div>
    );
  }
}

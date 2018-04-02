import React, { Component } from 'react'
import axios from 'axios'
import Product from './Product'
import ProductForm from './ProductForm'
import update from 'immutability-helper'
class ProductContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
      editingProductId: null
    }
    this.handleProductUpVote = this.handleProductUpVote.bind(this);
  }
  handleUpVote() {
		this.props.onVote(this.props.id);
	}
  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/products.json')
    .then(response => {
      console.log(response)
      this.setState({products: response.data})
    })
    .catch(error => console.log(error))
  }
  handleProductUpVote = (productId) => {
		const nextProducts = this.state.products.map((product) => {
			if (product.id === productId) {
				return Object.assign({}, product, {
					votes: product.votes + 1,
				});
			} else {
				return product;
			}
		});
		this.setState({
			products: nextProducts,
		});
	}
  addNewProduct = () => {
    axios.post('http://localhost:3001/api/v1/products', {product: {id: 0, title: '', description: ''}})
    .then(response => {
      console.log(response)
      const products = update(this.state.products, { $splice: [[0,0,response.data]]})
      this.setState({products: products, editingProductId: response.data.id})
    })
    .catch(error => console.log(error))
  }
  updateProduct = (product) => {
    const productIndex = this.state.products.findIndex(x => x.id === product.id)
    const products = update(this.state.products, {[productIndex]: {$set: product}})
    this.setState({products: products})
  }
  render() {
    return (
      <div>
        <div>
          <button className="newProductButton" onClick={this.addNewProduct}>New Product </button>
        </div>
        {this.state.products.map((product) => {
          if(this.state.editingProductId === product.id){
            return(<ProductForm product={product} key={product.id} updateProduct={this.updateProduct} />)
          } else {
            return (<Product product={product} key={product.id}/>)
          }
        })}
      </div>
    );
  }
}

export default ProductContainer

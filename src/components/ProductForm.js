import React, {Component} from 'react'
import axios from 'axios'
class ProductForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.product.title,
      description: this.props.product.description
    }
  }
  handleInput = (e) => {this.setState({[e.target.name]: e.target.value})}
  handleBlur = () => {
    const product = {title: this.state.title, description: this.state.description}
    axios.put(
      `http://localhost:3001/api/vi/products/${this.props.product.id}`,
      {product: product}
    )
    .then(response => {
      console.log(response)
      this.props.updateProduct(response.data)
    })
    .catch(error => console.log(error))
  }
  render(){
    return (
      <div className="tile">
        <form onBlur={this.handleBlur}>
          <input className='input' type="text" name="title" placeholder='Enter a title' value={this.state.title} onChange={this.handleInput}/>
          <textarea className='input' name="description" placeholder='Describe Product' value={this.state.description} onChange={this.handleInput}></textarea>
        </form>
      </div>
    );
  }
}

export default ProductForm

import React from 'react'

const Product = ({product}) =>
  <div className="tile" key={product.id}>
  <div className='header'>
    <button onClick={this.handleUpVote}> upvote
    </button>
    </div>
    <h4>{product.title} id: {product.id}    votes: {product.votes}</h4>
    <p>{product.description}</p>
  </div>
export default Product

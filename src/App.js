import React, { Component } from 'react'
import './App.css'
import ProductContainer from './components/ProductContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Proyect Board</h1>
        </div>
        <ProductContainer />
      </div>
    );
  }
}

export default App

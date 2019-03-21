import React, { Component } from 'react'

export default class weatherpic extends Component {
  render() {
    if(this.props.temperature > 200) {
    return (
      <div>
      <img src="sun.jpg" width={100} height={100}></img>
      </div>
    )
    }
    else {
      return (
        <div> 
          <img src="cloud.jpg" width={100} height={100}></img>
        </div>
      )
    }
  }
  }


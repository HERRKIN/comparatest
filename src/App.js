import React from 'react'
import Home from './Home'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      filter:{
        OR:[]
      },
      sortBy:null
    }
  }
  componentWillReceiveProps (nextProps) {
    this.setState({...nextProps.location.state})
  }

  render () {
    const {props} = this
    return (
      <Home
        {...this.state}
        />
    )
  }
}
export default App;

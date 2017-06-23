import React from 'react'
import Home from './Home'
export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      filter:{
        OR:[]
      }
    }
  }
  filterChange(element, checked){
    // console.log({element,checked})
    // const filters = this.state.filter.OR
    // const filter = {[element.__typename.toLowerCase()]:{name:element.name}}
    // let newFilters = [];
    //
    // // newFilters = filters.map()
    //
    // reduce((prev,cur, idx, arr) => {
    //
    //   return [...prev, cur];
    // })


    // let idx = null;
    // const found = filters.filter((item, index) => {
    //   if(item.name === filter.name){
    //     idx = index;
    //     return true;
    //   }
    // })
    //
    // if(found.length === 0){
    //   newFilters = [...filters,filter]
    // } else {
    //   console.log(idx)
    // }



    // this.setState({filter: { OR: newFilters}}, () =>{
    //   console.log('state',this.state)
    // })
  }

  render () {
    return (
      <Home {...this.state} filterChange={this.filterChange.bind(this)}/>
    )
  }

}

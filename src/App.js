import React from 'react'
import Home from './Home'
export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      filter:{
        OR:[]
      },
      sortBy:null
    }
  }
  filterChange(element, checked){
    const filters = this.state.filter.OR

    console.log({element,checked})
    const elementType = element.__typename.toLowerCase()
    let filter = null
    switch(elementType){
      case "company":
        filter = {[elementType]:{name:element.name}}
        break
      case "deductible":
        filter = {[elementType]:element.value}
        break
      case "price":
        console.log('PRICE NOT HANDLED')
        break
      default:
        console.log('NOT HANDLED', elementType)


    }

    let newFilters = [];
    newFilters = [...newFilters, filter]
    console.log({filter})
    // newFilters = filters.map()

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



    this.setState({filter: { OR: newFilters}}, () =>{
      console.log('state',this.state)
    })
  }
  sortChange(event, key, payload){
    this.setState({sortBy:payload})
  }
  render () {
    return (
      <Home {...this.state} filterChange={this.filterChange.bind(this)} sortChange={this.sortChange.bind(this)}/>
    )
  }

}

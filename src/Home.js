
import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { gql, graphql } from 'react-apollo';
import styles from './Modules.css';
import OfferList from './OfferList'
import Filters from './Filters'
import { withRouter } from 'react-router-dom'

@withRouter
@graphql(gql`query ($filter: OfferFilter $orderBy:OfferOrderBy ) {
  allOffers (filter: $filter orderBy:$orderBy){
    price
    deductible
    id
    company {
      name
      id
      imageUrl
    }
  }
}`,{
  options: (ownProps) => ({
    variables: {
      filter: ownProps.filter, // ownProps are the props that are added from the parent component
      orderBy:ownProps.sortBy
    }
  })
})
class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillReceiveProps (nextProps) {
    console.log({nextProps})
    let {companies, deductibles} = this.state
    const {data} = nextProps
    if(!companies && data.allOffers){
      const {allOffers} = data
       companies = allOffers.reduce((prev, cur, array) => {
        const company = {name:cur.company.name}
        if(!prev.find((elem)=>elem.name === company.name)){
          return [...prev, cur.company]
        }else{
          return prev
        }

      }, [])
    }

    if(!deductibles && data.allOffers){
      deductibles = data.allOffers && data.allOffers.reduce((prev, cur) => {
        if(!prev.includes(cur.deductible))
        return [...prev, cur.deductible]
        else
        return prev

      }, [])
      .sort((a,b) => a>b)
    }

    const state = {companies, deductibles}
    this.setState({...state})


  }

  filterChange(element, checked){
    console.log({element}, checked)
    const {history} = this.props;
    const filters = this.props.filter.OR
    const elemType = element.__typename.toLowerCase()
    let newFilters = []
    let filter = {}
    switch (elemType) {
      case 'company':
        filter = {[elemType] : {name:element.name}}
        if( filters.length > 0 ){
          console.log('incompany')
          newFilters = filters.reduce((prev, cur) => {
            console.log(typeof cur[elemType])
            if(typeof cur[elemType] === 'undefined'){
              return [...prev, cur]
            }

            if(cur[elemType].name === element.name ){
              if(checked===true){
                return  [...prev, cur]
              } else{
                return prev
              }
            } else {
              return [...prev,cur]
            }
          },[])

          if(checked && newFilters.length === filters.length){
            newFilters = [...newFilters, filter]
          }

        } else {
          newFilters = [{...filter}]
        }

        break;
      case 'deductible':

        filter = {[elemType] : element.value}
        if( filters.length > 0 ){
          
          newFilters = filters.reduce((prev, cur) => {

            if(typeof cur[elemType] === 'undefined'){

              return [...prev,cur]
            }

            if(cur[elemType] === element.value ){
              if(checked === true){
                return  [...prev, cur]
              } else{
                return [...prev]
              }
            } else {
              return [...prev,cur]
            }
          },[])

          if(checked && newFilters.length === filters.length){
            newFilters = [...newFilters, filter]
          }

        } else {
          newFilters = [{...filter}]
        }
        break;
      default:

    }
    console.log({newFilters})
    history.replace({pathName:'/'},{filter:{OR:[...newFilters]}})
  }


  resetFilter(event, key, payload){
    const {history} = this.props;
    history.replace({pathName:'/'},{filter:{OR:[]}})
  }
  sortChange(event, key, payload){
    const {history} = this.props;
    history.replace({pathName:'/'},{sortBy:payload})
  }

  render() {
    const {data, filter} = this.props
    const {companies, deductibles} = this.state
    // console.log(this.state,'state', data.loading)
    return (
      <div className="App row">
        <div className={`${styles.filters} col-xs-4 start-xs `}>
          {(deductibles && companies) && (<Filters
            filters={filter}
            companies={companies}
            prices={this.props.prices}
            deductibles={deductibles}
            filterChange={this.filterChange.bind(this)}
            resetFilter={this.resetFilter.bind(this)}
          />)}

        </div>
        <div className={`${styles.filters} col-xs-8  `}>
          <Paper className={`row `}>
            <div className="start-xs col-xs-6">
              <h3>{this.props.data.allOffers && `${this.props.data.allOffers.length} results`}</h3>
            </div>
            <div className=" col-xs-6">
                <SelectField
                  floatingLabelText="Sort By"
                  value={this.props.sortBy}
                  onChange={this.sortChange.bind(this)}
                  >
                  <MenuItem value={'deductible_ASC'} primaryText="deductible_ASC" />
                  <MenuItem value={'deductible_DESC'} primaryText="deductible_DESC" />
                  <MenuItem value={'price_ASC'} primaryText="price_ASC" />
                  <MenuItem value={'price_DESC'} primaryText="price_DESC" />
                </SelectField>
            </div>
        </Paper>
          <div className={`row col-xs-12`}>
            <OfferList {...this.props.data} />
          </div>

        </div>
      </div>
    )
  }
}

export default Home;

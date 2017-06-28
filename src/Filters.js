import React, {Component} from 'react';
// import { gql, graphql } from 'react-apollo';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import Slider from 'material-ui/Slider';
import RaisedButton from 'material-ui/RaisedButton';

import styles from './Modules.css'

class Filters extends Component {

  render() {
    const {companies, deductibles, filters} = this.props

    let filteredCompanies, filteredDeductibles
    filteredCompanies = filters && filters.OR.filter(elem => elem['company'] !==undefined)
    .reduce((prev, cur) => {
      return [...prev,{...cur['company']}]
    },[])
    filteredDeductibles = filters && filters.OR.filter(elem => elem['deductible']!==undefined)
    .reduce((prev, cur) => {
      return [...prev,cur['deductible']]
    },[])
    
    const companyFilter = companies && companies.map( (company, index) =>{
      const checked = typeof filteredCompanies.find(elem => elem.name === company.name) !== 'undefined'
      return (
      <Checkbox
        key={'comp'+index}
        checked={checked}
        label={company.name}
        onCheck={(e,isInputChecked) => this.props.filterChange(company,isInputChecked)}
      />)
    })

    // const maxPrice = offers && offers.reduce((prev,cur) => {
    //   return (cur.price > prev) && cur.price
    // }, 0)

    const deductiblesFilter = deductibles.map(deductible => (<div
      className={`${styles.deductible}`}
      key={'ded'+deductible}
      >
      <Checkbox
        checked={filteredDeductibles.includes(deductible)}
        style={{width:10}}
        labelPosition="left"
        label={deductible}
        onCheck={(e,isInputChecked) => this.props.filterChange({value:deductible, __typename:'Deductible'},isInputChecked)}
      />
    </div>))

    return (
          <Paper style={{padding:5}} className='row'>
            <div className='row col-xs-12'>
              <h2 >Filters</h2>
            </div>
            <div className='row col-xs-12'>
              <span><b>Companies</b></span>
              {companyFilter}
            </div>
            <div style={{marginTop:20}} className={`${styles.width100}`}>
              <span><b>Prices</b></span>
              <div className="col-xs-12">
                <Slider
                  min={100}
                  max={1000}
                  step={100}
                  defaultValue={400}
                />
              </div>
            </div>
            <div style={{marginTop:20}} >
              <span><b>Deductibles</b></span>
              <div className="col-xs-12">
                {deductiblesFilter}
              </div>
            </div>
            <div className='row col-xs-12 center-xs'>
              <RaisedButton label="Reset filters" primary={true} onTouchTap={this.props.resetFilter}/>
            </div>
          </Paper>
    )
  }
}

export default Filters;

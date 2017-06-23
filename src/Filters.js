import React, {Component} from 'react';
// import { gql, graphql } from 'react-apollo';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import Slider from 'material-ui/Slider';
import styles from './Modules.css'

class Filters extends Component {

  render() {
    const {companies,offers} = this.props
    const companyFilter = companies &&
    companies.map( (company, index) => (
      <Checkbox key={index}
        label={company.name}
        onCheck={(e,isInputChecked) => this.props.filterChange(company,isInputChecked)}
      />)
    )

    const maxPrice = offers && offers.reduce((prev,cur) => {
      return (cur.price > prev) && cur.price
    }, 0)

    const deductibles = offers && offers.reduce((prev, cur) => {
      if(!prev.includes(cur.deductible))
        return [...prev, cur.deductible]
      else
        return prev

    }, []).sort((a,b) => a>b)
    .map(deductible => (<div className={`${styles.deductible}`}>
      <Checkbox
        style={{width:10}}
        labelPosition="left"
        key={deductible}
        label={deductible} />
    </div>))

    console.log({deductibles})
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
                {deductibles}
              </div>
            </div>
          </Paper>
    )
  }
}

export default Filters;

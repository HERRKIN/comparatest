import React, {Component} from 'react';
import Paper from 'material-ui/Paper';

// import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import { gql, graphql } from 'react-apollo';
import styles from './Modules.css';
import OfferList from './OfferList'

import Filters from './Filters'


@graphql(gql`query ($filter: OfferFilter) {
  allOffers (filter: $filter){
    price
    deductible
    id
    company {
      name
      id
      imageUrl
    }
  }
  allCompanies {
      name
    }
}`,{
  options: (ownProps) => ({
    variables: {
      filter: ownProps.filter // ownProps are the props that are added from the parent component
    }
  })
}
)
class Home extends Component {

  render() {

    return (
      <div className="App row">
        <div className={`${styles.filters} col-xs-4 start-xs `}>
          <Filters
            companies={this.props.data.allCompanies}
            offers={this.props.data.allOffers}
            filterChange={this.props.filterChange}
          />
        </div>
        <div className={`${styles.filters} col-xs-8  `}>
          <Paper className={`row `}>
            <div className="start-xs col-xs-6">
              <h3>{this.props.data.allOffers && `${this.props.data.allOffers.length} results`}</h3>
            </div>
            <div className="end-xs col-xs-6">
              <h3>{this.props.data.allOffers && `${this.props.data.allOffers.length} results`}</h3>
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

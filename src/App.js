import React, {Component} from 'react';
// import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import { gql, graphql } from 'react-apollo';
import styles from './Modules.css';
import OfferList from './OfferList'

import {Card} from 'material-ui/Card';

// import Filters from './Filters';
// import Results from './Results';
//styles
// import './App.less';
// import './App.scss';
// import './App.styl';

@graphql(gql`query {
  allOffers {
    price
    deductible
    id
    company {
      name
      id
      imageUrl
    }
  }
}`)
class App extends Component {

  render() {
    console.log(this.props)
    // const offers = !this.props.data.loading &&
    //   this.props.data.allOffers.map(offer => <h1 key={offer.id}>{offer.company.name}</h1>)
    console.log(this.props.data.loading ? 'loading' : this.props.data.allOffers)
    return (
      <div className="App row">
        <div className={`${styles.filters} col-xs-4 start-xs `}>
          {/* {this.props.data.loading ? <h1>loading</h1> : offers} */}
          <Card>

            <h1> here goes the filters</h1>
          </Card>
        </div>
        <div className={` col-xs-8  `}>
          <div className={`row col-xs-12`}> <h1>
            here goes the sort
          </h1>
        </div>
          <div className={`row col-xs-12`}>
            <OfferList {...this.props.data} />
          </div>

        </div>
      </div>
    )
  }
}

export default App;

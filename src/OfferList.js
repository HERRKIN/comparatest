import React from 'react';
import Paper from 'material-ui/Paper';
const offerStyle ={
  padding:5
}
const Offer = ({offer}) => (
  <div style={offerStyle} className="row col-xs-12">
    <Paper className="row col-xs-12" key={offer.id} >
      <div  className="row col-xs-12">
      <div style={{padding:5}}  className=" col-xs-4 center-xs">
        <img className="col-xs-12" src={offer.company.imageUrl} />
        <h4>{offer.company.name}</h4>
      </div>
      <div className="col-xs-8">
          <h2 >Price:{offer.price}</h2>
          <h2 className="row">Deductible:{offer.deductible}</h2>
      </div>
    </div>

    </Paper>
  </div>
)

const OfferList = ({allOffers, loading}) => {

 const renderOffers = () => (!allOffers || allOffers.length === 0 ) ?
   (<h1 key='noresult'> No Results </h1>) :
   allOffers.map(item => (
     <Offer key={item.id} offer={item}/>
   ))

  return loading ? (<h1>loading</h1>) :
  (<div style={{paddingTop:20}} className='row col-xs-12'>
    {renderOffers()}
  </div>)

}


export default OfferList

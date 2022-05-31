import React from 'react'
import './bids.css'

import { Link } from 'react-router-dom'

const Bids = ({ title, nfts, loadingState, buyNft }) => {
  console.log(nfts)
  if (loadingState === 'loaded' && !nfts.length)
    return (
      <div>
        <div className="bids section__padding">
          <div className="bids-container">
            <div className="bids-container-text">
              <h1>Il n'y a pas de NFT publié pour le moment </h1>
            </div>
          </div>
        </div>
      </div>
    )
  return (
    <div className="bids section__padding">
      <div className="bids-container">
        <div className="bids-container-text">
          <h1>{title}</h1>
        </div>
        <div className="bids-container-card">
          <div className="row">
            {nfts.map((nft, i) => (
              <div className="col-md-3">
                <div className="bids-card">
                  <div className="bids-card-top">
                    &nbsp;
                    <img src={nft.image} alt="" className="image_nft" />
                    <p className="bids-title"> The Creator : {nft.seller}</p>
                    <Link to={`/post/123`}>
                      <p className="bids-title">{nft.name}</p>
                    </Link>
                  </div>

                  <div className="bids-card-bottom">
                    <p>{nft.description}</p>
                    <p>
                      {nft.price} <span>ETH</span>
                    </p>

                    {/* <p>
                      {' '}
                      <AiFillHeart /> 66
                    </p> */}
                    <p>
                      <div className="load-more">
                        <button onClick={() => buyNft(nft)}>Buy</button>
                      </div>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <div className="load-more">
        <button>Load More</button>
      </div> */}
    </div>
  )
}

export default Bids

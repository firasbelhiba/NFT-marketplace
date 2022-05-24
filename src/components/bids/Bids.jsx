import React from 'react'
import './bids.css'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

import { Link } from 'react-router-dom'

const Bids = ({ title, nfts, loadingState, buyNft }) => {
  console.log(nfts)
  if (loadingState === 'loaded' && !nfts.length)
    return <h1>No items in the market place </h1>
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
                    <img src={nft.image} alt="" className="image_nft" />
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

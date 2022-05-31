import React, { useState, useEffect } from 'react'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'

import './MyItems.css'

import { nftAddress, nftMarketAddress } from '../../config'
import { Link } from 'react-router-dom'

// // importing abis
import NFT from '../../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../../artifacts/contracts/NFTMarket.sol/NFTMarket.json'
import axios from 'axios'

const MyItems = () => {
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('notLoaded')

  useEffect(() => {
    loadNfts()
  }, [])

  async function loadNfts() {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const marketContract = new ethers.Contract(
      nftMarketAddress,
      Market.abi,
      signer,
    )

    const tokenContract = new ethers.Contract(nftAddress, NFT.abi, provider)

    const data = await marketContract.fetchMyNFTs()

    const items = await Promise.all(
      data.map(async (item) => {
        const tokenUri = await tokenContract.tokenURI(item.tokenId)
        const meta = await axios.get(tokenUri)
        let price = ethers.utils.formatUnits(item.price.toString(), 'ether')
        let theItem = {
          price,
          tokenId: item.tokenId.toNumber(),
          seller: item.seller,
          owner: item.owner,
          image: meta.data.image,
        }
        return theItem
      }),
    )
    setNfts(items)
    setLoadingState('loaded')
  }

  if (loadingState === 'loaded' && !nfts.length)
    return (
      <div>
        <div className="bids section__padding">
          <div className="bids-container">
            <div className="bids-container-text">
              <h1>
                Aucun NFT possédé, vous pouvez aller à la page d'accueil et
                acheter
              </h1>
            </div>
          </div>
        </div>
      </div>
    )
  return (
    <div className="bids section__padding">
      <div className="bids-container">
        <div className="bids-container-text">
          <h1>My Items</h1>
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
                        <button>Buy</button>
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

export default MyItems

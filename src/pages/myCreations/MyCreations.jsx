import React, { useState, useEffect } from 'react'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'

import './MyCreations.css'

import { nftAddress, nftMarketAddress } from '../../config'

// // importing abis
import NFT from '../../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../../artifacts/contracts/NFTMarket.sol/NFTMarket.json'
import axios from 'axios'
import { Link } from 'react-router-dom'

const MyCreations = () => {
  const [nfts, setNfts] = useState([])
  const [sold, setSold] = useState([])

  const [loadingState, setLoadingState] = useState('not-loaded')

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
    const data = await marketContract.fetchItemsCreated()

    const items = await Promise.all(
      data.map(async (item) => {
        console.log(item)
        const tokenUri = await tokenContract.tokenURI(item.tokenId)
        const meta = await axios.get(tokenUri)
        let price = ethers.utils.formatUnits(item.price.toString(), 'ether')
        let newItem = {
          price,
          tokenId: item.tokenId.toNumber(),
          seller: item.seller,
          owner: item.owner,
          image: meta.data.image,
        }
        return newItem
      }),
    )
    const soldItems = items.filter((item) => item.sold)
    setSold(soldItems)
    setNfts(items)
    setLoadingState('loaded')
  }

  if (loadingState === 'loaded' && !nfts.length)
    return <h1 className="py-10 px-20 text-3xl">No assets created</h1>
  return (
    <div className="row">
      {nfts.map((nft, i) => (
        <div key={i} className="column">
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
        </div>
      ))}
    </div>
  )
}

export default MyCreations

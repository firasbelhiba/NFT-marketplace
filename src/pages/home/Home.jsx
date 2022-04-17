import React from 'react'
import { Bids, Header } from '../../components'

import { ethers, providers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'

import { nftAddress, nftMarketAddress } from '../../config'

// // importing abis
import NFT from '../../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../../artifacts/contracts/NFTMarket.sol/NFTMarket.json'

const Home = () => {
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')

  useEffect(() => {
    loadNfts()
  }, [])

  async function loadNfts() {
    const provider = new ethers.providers.JsonRpcProvider()
    const tokenContract = new ethers.Contract(nftAddress, NFT.abi, provider)
    const marketContract = new ethers.Contract(
      nftMarketAddress,
      Market.abi,
      provider,
    )
    const data = await marketContract.fetchMarketItems()

    const items = await Promise.all(
      data.map(async (item) => {
        const tokenUri = await tokenContract.tokenURI(item.tokenId)

        const meta = await axios.get(tokenUri)

        let price = ethers.utils.formatUnits(item.price.toString(), 'ether')

        let itemToDisplay = {
          price,
          tokenId: item.tokenId.toNumber(),
          seller: item.seller,
          owner: item.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        }

        return itemToDisplay
      }),
    )
    setNfts(items)
    setLoadingState('loaded')
  }

  async function buyNft(nft) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(nftMarketAddress, Market.abi, signer)

    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
    const transaction = await contract.createMarketSale(
      nftAddress,
      nft.tokenId,
      { value: price },
    )

    await transaction.wait()
    loadNfts()
  }

  return (
    <div>
      <Header />
      <Bids loadingState={loadingState} nfts={nfts} title="Hot Bids" />
    </div>
  )
}

export default Home

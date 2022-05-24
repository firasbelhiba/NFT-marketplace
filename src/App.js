import './App.css'
import { Navbar, Footer } from './components'
import { Home, Profile, Item, Create, Login, Register } from './pages'
import { Routes, Route } from 'react-router-dom'
import MyItems from './pages/myitems/MyItems'
import MyCreations from './pages/myCreations/MyCreations'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":item/:id" element={<Item />} />
        <Route path="/myitems" element={<MyItems />} />
        <Route path="/mycreations" element={<MyCreations />} />
        <Route path="/create" element={<Create />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
      {/* {nfts.map((nft, i) => (
        <div key={nft.tokenId} className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
          <div className="card__item four">
            <div className="card_body space-y-10">
              <div className="creators space-x-10">
                <div className="avatars space-x-3">
                  <a href="Profile.html">
                    <img
                      src={nft.image}
                      alt="Avatar"
                      className="avatar avatar-sm"
                    />
                  </a>
                  <a href="Profile.html">
                    <p className="avatars_name txt_xs">@mickel_fenn</p>
                  </a>
                </div>
                <div className="avatars space-x-3">
                  <a href="Profile.html">
                    <img
                      src="assets/img/avatars/avatar_2.png"
                      alt="Avatar"
                      className="avatar avatar-sm"
                    />
                  </a>
                  <a href="Profile.html">
                    <p className="avatars_name txt_xs">@danil_pannini</p>
                  </a>
                </div>
              </div>
              <div className="card_head">
                <a href="Item-details.html">
                  <img
                    src={nft.image}
                    alt="item
                     img"
                  />
                </a>
                <a href="#" className="likes space-x-3">
                  <i className="ri-heart-3-fill" />
                  <span className="txt_sm">1.2k</span>
                </a>
              </div>
              <h6 className="card_title">
                <a className="color_black" href="Item-details.html">
                  {nft.name}
                </a>
              </h6>
              <div className="card_footer d-block space-y-10">
                <div className="card_footer justify-content-between">
                  <div className="creators">
                    <p className="txt_sm">{nft.description}</p>
                  </div>
                  <a href="#" className>
                    <p className="txt_sm">
                      Price:{' '}
                      <span className="color_green txt_sm">
                        {nft.price} ETH
                      </span>
                    </p>
                  </a>
                </div>
                <div className="hr" />
                <div
                  className="d-flex
                   align-items-center
                   space-x-10
                   justify-content-between"
                >
                  <div
                    className="d-flex align-items-center
                     space-x-5"
                  >
                    <i className="ri-history-line" />
                    <a
                      href="#"
                      data-toggle="modal"
                      data-target="#popup_history"
                    >
                      <p
                        className="color_text txt_sm
                         view_history"
                        style={{ width: 'auto' }}
                      >
                        View History
                      </p>
                    </a>
                  </div>
                  <a
                    className="btn btn-sm btn-primary"
                    onClick={() => buyNft(nft)}
                    data-toggle="modal"
                    data-target="#popup_bid"
                  >
                    Buy NFT
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))} */}
    </div>
  )
}

export default App

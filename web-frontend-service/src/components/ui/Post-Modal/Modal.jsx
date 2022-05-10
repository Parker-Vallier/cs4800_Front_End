import React, {useState, useEffect} from "react";

import "./modal.css";

const POST_STORAGE_KEY = 'nftApp.posts'
const LOCAL_STORAGE_KEY = 'nftApp.nfts'

const Modal = ({id, setShowModal }) => {

  const [posts, setPosts] = useState([]);
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem(POST_STORAGE_KEY))
    if(storedPosts) setPosts(storedPosts)
    const storedNfts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedNfts) setNfts(storedNfts)
  }, [])

  useEffect(() => {
    localStorage.setItem(POST_STORAGE_KEY, JSON.stringify(posts))
  }, [posts])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nfts))
  }, [nfts])

  function helpMintNFT(){
    const newNft = posts.find(post => post.id === id)
    const newPosts = posts.filter(post => post.id !== id)

    setNfts([...nfts, newNft]);
    setPosts(newPosts);
  }

  return (
    <>
      <div className="modal__wrapper">
        <div className="single__modal">
          <span className="close__modal">
            <i class="ri-close-line" onClick={() => setShowModal(false)}></i>
          </span>
          <h6 className="text-center text-light">Mint NFT</h6>
          <p className="text-center text-light">
            Are you sure you want to post this NFT?
          </p>
          <button className="mint__nft-btn" onClick={helpMintNFT} >Mint NFT</button>
        </div>
      </div>
    </>
  );
};

export default Modal;

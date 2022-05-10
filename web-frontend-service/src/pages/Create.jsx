import React, { useState, useRef, useEffect } from "react";

import { Container, Row, Col } from "reactstrap";
import CommonSection from "../components/ui/Common-section/CommonSection";
import PostCard from "../components/ui/Post-card/PostCard";
import img from "../assets/images/img-01.jpg";
import avatar from "../assets/images/ava-01.png";

import "../styles/create-item.css";

import { v4 as uuidv4 } from 'uuid'

const LOCAL_STORAGE_KEY = 'nftApp.posts'
const LOGIN_KEY = 'nftApps.username'

const item = {
  id: "01",
  title: "Guard",
  desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam adipisci cupiditate officia, nostrum et deleniti vero corrupti facilis minima laborum nesciunt nulla error natus saepe illum quasi ratione suscipit tempore dolores. Recusandae, similique modi voluptates dolore repellat eum earum sint.",
  imgUrl: img,
  creator: "Trista Francis",
  creatorImg: avatar,
  currentBid: 7.89,
};

const Create = () => {

  const fileRef = useRef()
  const priceRef = useRef()
  const minBidRef = useRef()
  const startDateRef = useRef()
  const endDateRef = useRef()
  const titleRef = useRef()
  const descRef = useRef()


  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState('N/A');

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedPosts) setPosts(storedPosts)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posts))
  }, [posts])


  function handleAddPost(e) {

    const tempUser = localStorage.getItem(LOGIN_KEY)
    console.log(tempUser)
    setUsername(tempUser)
    console.log(username)

    const newItem = {
      id: uuidv4(),
      title: titleRef.current.value,
      desc: descRef.current.value,
      imgUrl: fileRef.current.value,
      creator: username,
      creatorImg: img,
      currentBid: priceRef.current.value

    }
    
    setPosts(prevPost => {
      return [...prevPost, newItem]
    })
    
    
      fileRef.current.value = null
      priceRef.current.value = null
      minBidRef.current.value = null
      startDateRef.current.value = null
      endDateRef.current.value = null
      titleRef.current.value = null
      descRef.current.value = null
    
  }

  return (
    <>
      <CommonSection title="Create Item" />

      <section>
        <Container>
          <Row>
            <Col lg="3" md="4" sm="6">
              <h5 className="mb-4 text-light">Preview Item</h5>
              <PostCard item={item} />

              <div className=" mt-3 d-flex align-items-center justify-content-between">
                <button
                  className="bid__btn d-flex align-items-center gap-1"
                  onClick={handleAddPost}
                >
                  Submit Post
                </button>
              </div>
            </Col>

            <Col lg="9" md="8" sm="6">
              <div className="create__item">
                <form>
                  <div className="form__input">
                    <label htmlFor="">Upload File</label>
                    <input ref={fileRef} type="file" className="upload__input" />
                  </div>

                  <div className="form__input">
                    <label htmlFor="">Price</label>
                    <input
                      ref={priceRef}
                      type="number"
                      placeholder="Enter price for one item (DESO)"
                    />
                  </div>

                  <div className="form__input">
                    <label htmlFor="">Minimum Bid</label>
                    <input ref={minBidRef} type="number" placeholder="Enter minimum bid" />
                  </div>

                  <div className=" d-flex align-items-center gap-4">
                    <div className="form__input w-50">
                      <label htmlFor="">Starting Date</label>
                      <input ref={startDateRef} type="date" />
                    </div>

                    <div className="form__input w-50">
                      <label htmlFor="">Expiration Date</label>
                      <input ref={endDateRef} type="date" />
                    </div>
                  </div>

                  <div className="form__input">
                    <label htmlFor="">Title</label>
                    <input ref={titleRef} type="text" placeholder="Enter title" />
                  </div>

                  <div className="form__input">
                    <label htmlFor="">Description</label>
                    <textarea
                      ref={descRef}
                      name=""
                      id=""
                      rows="7"
                      placeholder="Enter description"
                      className="w-100"
                    ></textarea>
                  </div>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Create;

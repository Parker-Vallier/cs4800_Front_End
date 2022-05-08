import React, { useEffect, useState } from "react";

import CommonSection from "../components/ui/Common-section/CommonSection";

import PostCard from "../components/ui/Post-card/PostCard";

import { POSTS__DATA } from "../assets/data/data";

import { Container, Row, Col } from "reactstrap";

import "../styles/market.css";

const LOCAL_STORAGE_KEY = 'nftApp.posts'

const Market = () => {
  
  const [posts, setPosts] = useState(POSTS__DATA);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedPosts) setPosts(storedPosts)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posts))
  }, [posts])


  return (
    <>
      <CommonSection title={"Listings"} />

      <section>
        <Container>
          <Row>
            {posts?.map((item) => (
              <Col lg="3" md="4" sm="6" className="mb-4" key={item.id}>
                <PostCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Market;

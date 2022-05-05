import React, { useEffect, useState } from "react";

import CommonSection from "../components/ui/Common-section/CommonSection";

import PostCard from "../components/ui/Post-card/PostCard";

import { POSTS__DATA } from "../assets/data/data";

import { Container, Row, Col } from "reactstrap";

import "../styles/market.css";

const Market = () => {
  const [posts, setPosts] = useState(POSTS__DATA);

  useEffect(() => {
    // This runs once on startup, put fetch for nfts here
    const loadNfts = async () => {
      const url = ''
      const response = await fetch(url)
      setPosts( [...response])
      
    }
    loadNfts();
  }, [])


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

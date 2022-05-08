import React, { useEffect, useState } from "react";

import CommonSection from "../components/ui/Common-section/CommonSection";

import NftCard from "../components/ui/Nft-card/NftCard";

// import { NFT__DATA } from "../assets/data/data";

import { Container, Row, Col } from "reactstrap";

import "../styles/market.css";

const LOCAL_STORAGE_KEY = 'nftApp.nfts'

const Market = () => {
  const [nfts, setNfts] = useState([]);
 
  useEffect(() => {
    const storedNfts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedNfts) setNfts(storedNfts)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nfts))
  }, [nfts])


  return (
    <>
      <CommonSection title={"MarketPlace"} />

      <section>
        <Container>
          <Row>
            {nfts?.map((item) => (
              <Col lg="3" md="4" sm="6" className="mb-4" key={item.id}>
                <NftCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Market;

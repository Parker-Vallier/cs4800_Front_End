//import React from "react";

import CommonSection from "../components/ui/Common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";

import "../styles/wallet.css";

import { useEffect, useMemo, useState } from "react";

import { UserContext } from "./utils/useUserContext";

import { 
  Listing
} from "./components";

import protocol from "./utils/api/deso";
const textStyle = { 
  color: "#fff"
}
const Wallet = () => {
  const [auth, setAuth] = useState({});
  const [service, setService] = useState(null);
  const [nanoBalance, setNanoBalance] = useState(0);

  const handleLogin = async () => {
    const data = await service.identity.login("4");
    console.log(data);
    setAuth(data);
  }

  const handleLogout = async () => {
    await service.identity.logout(auth.key);
    setAuth({});
  }

  const onUpdateProfile = async () => {
    const payload = {
      "UpdaterPublicKeyBase58Check": auth.key,
      "MinFeeRateNanosPerKB": 10000,
      "NewUsername": "dericiscool",
      "NewDescription": "dank meemsmememems",
      "NewStakeMultipleBasisPoints": 12500
    }

    try {
      const response = await service.social.updateProfile(payload);
      console.log(response);
      alert("sucessfully updated profile");
    } catch(error) {
      console.error(error);
      alert(error.message);
    }

  }

  const getNanoBalance = async () => {
    try {
      const response = await service.user.getBalance();
      setNanoBalance(response.ConfirmedBalanceNanos);
    } catch(error) {
      console.error(error);
    }
  }

  useEffect(() => {

    setService(protocol);

    const login_key = localStorage.getItem("login_key");
    const login_user = localStorage.getItem("login_user");

    if (login_key && login_user) {
      setAuth({
        key: login_key,
        user: JSON.parse(login_user)
      });
    }
  }, []);

  useEffect(() => {
    getNanoBalance();
  }, [auth])

  const value = useMemo(() => {
    return {
      service,
      credentials: auth
    };
  }, [service, auth]);

  return (
    <>
      <CommonSection title="Connect Wallet" />
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <div className="w-50 m-auto">
                <h3 className="text-light">Connect your wallet</h3>
                <p>
                  Thank you for choosing NFTbay! You may begin by linking one (or many)
                  of your wallets to our database. Simply choose a wallet you're associated with
                  and you may begin bidding or listing whatever your heart desires!
                </p>
              </div>
            </Col>

            <UserContext.Provider value={value}>
              <div style={textStyle} className="Wallet">
                {auth?.key ?
                  <div>
                    <div>{auth.key}</div>
                    <div>network: {auth.user.network}</div>
                    <div>balance: {nanoBalance}</div>
                    <button onClick={handleLogout}>logout</button>
                    <button onClick={onUpdateProfile}>update profile</button>
                    <hr />
                    <Listing/>
                  </div>
                  :
                  <div>
                    <button onClick={handleLogin}>login</button>
                  </div>
                }
              </div>
            </UserContext.Provider>
          </Row>
        </Container>
      </section>
    </>
    
  );
};

export default Wallet;

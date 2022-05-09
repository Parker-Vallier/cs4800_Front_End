import React, { useRef } from "react";

import CommonSection from "../components/ui/Common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";

const Contact = () => {
  const nameRef = useRef("");
  const emailRef = useRef("");
  const subjectRef = useRef("");
  const messageRef = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <CommonSection title="Contact" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" className="m-auto text-center">
              <h2>Start a Ticket!</h2>
              <p>
              For support, please enter all the information below to begin
              a support ticket and we will get back to you as soon as possible.
              We apologize for the inconvenience and appreciate your patience as 
              we make every effort to continue serving our customers. Send us your 
              questions or concerns by starting a new case and we will give you the help you need.
              </p>
              <div className="contact mt-4">
                <form onSubmit={handleSubmit}>
                  <div className="form__input">
                    <input
                      type="text"
                      placeholder="Enter your name"
                      ref={nameRef}
                    />
                  </div>
                  <div className="form__input">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      ref={emailRef}
                    />
                  </div>
                  <div className="form__input">
                    <input
                      type="text"
                      placeholder="Enter subject"
                      ref={subjectRef}
                    />
                  </div>
                  <div className="form__input">
                    <textarea
                      rows="7"
                      placeholder="Write message"
                      ref={messageRef}
                    ></textarea>
                  </div>

                  <button
                    className="send__btn"
                    style={{
                      border: "none",
                      padding: "7px 25px",
                      borderRadius: "5px",
                      marginTop: "20px",
                    }}
                  >
                    Send a Message
                  </button>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Contact;

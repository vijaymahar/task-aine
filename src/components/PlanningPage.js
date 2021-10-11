import React from "react";
import { RiArrowLeftSFill } from "react-icons/ri";
import { Container, Row, Col } from "react-bootstrap";
const PlanningPage = () => {
  return (
    <>
      <Row>
        <Col className="mt-4 ms-5 fw-bold text-black-50 d-flex align-items-center">
          <RiArrowLeftSFill style={{ fontSize: "20px", marginTop: "2px" }} />
          <span>Videos</span>
        </Col>
      </Row>
      <Container id="field_contaier">
        <Row id="input_capsul">
          <input type="text" id="inputElm" placeholder="insert URL here" />
        </Row>
        <Row>
          <Col md={12} className="text-center my-3 fw-bold text-muted">
            or
          </Col>
          <Col className="g-0">
            <div className="upload_btn">
              <span>upload</span>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PlanningPage;

import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import LanguageIcon from '@material-ui/icons/Language';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import { Row, Col } from 'react-flexbox-grid';
import './Footer.css';

const Footer = () => {
    const [show, setShow] = useState(false);

    const showHandler = () => {
        setShow(!show);
    }

    return (
        <div className="footer">
            <div className="footer-copyright"  onClick={showHandler}>
                © Copyright 2020 Appname All Rights Reserved
                <div style={{ marginTop: "20px" }}>
                {show ? <Button style={{ backgroundColor: "lightblue", color: "black" }}>HIDE</Button> : <Button style={{ backgroundColor: "black", color: "lightblue" }}>CONTACT US</Button>}
                </div>
            </div>
            <div className={show ? "contact-list" : "contact-list-hidden"}>
                <Row className="contact-list-item">
                    <Col xs={1} sm={1}><LanguageIcon /></Col>
                    <Col xs={11} sm={11} style={{ paddingLeft: "15px" }}><a style={{ color: "lightblue", textDecoration: "none" }}href="http://localhost:3000/">Website</a></Col>
                </Row>
                <Row className="contact-list-item">
                    <Col xs={1} sm={1}><LocationOnIcon /></Col>
                    <Col xs={11} sm={11} style={{ paddingLeft: "15px" }}>Address</Col>
                </Row>
                <Row className="contact-list-item">
                    <Col xs={1} sm={1} md={1} lg={1}><PhoneIcon /></Col>
                    <Col xs={11} sm={11} md={11} lg={11} style={{ paddingLeft: "15px" }}>Main: +91 9999999999</Col>
                </Row>
                <Row className="contact-list-item">
                    <Col xs={1} sm={1} md={1} lg={1}><EmailIcon /></Col>
                    <Col xs={11} sm={11} md={11} lg={11} style={{ paddingLeft: "15px" }}>youremail@mail.com</Col>
                </Row>
            </div>
        </div>
    )
}

export default Footer;
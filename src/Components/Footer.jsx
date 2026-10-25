import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { HashLink } from "react-router-hash-link";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <Container fluid className="site-footer__container">
        <Row className="site-footer__main">
          <Col md={5} className="site-footer__brand-column">
            <HashLink to="/" className="site-footer__brand" aria-label="Shiloh Creative home">
              <span>shiloh</span>
              <small>creative</small>
            </HashLink>
            <p className="site-footer__tagline">
              Thoughtful websites for businesses ready to grow.
            </p>
          </Col>

          <Col md={3} sm={6} className="site-footer__links-column">
            <h2>Explore</h2>
            <nav aria-label="Footer navigation">
              <HashLink to="/#latest">Projects</HashLink>
              <HashLink to="/#service">Services</HashLink>
              <HashLink to="/#process">Process</HashLink>
            </nav>
          </Col>

          <Col md={4} sm={6} className="site-footer__contact-column">
            <h2>Have a project in mind?</h2>
            <p>Let&apos;s make something meaningful together.</p>
            <HashLink to="/#contact" className="site-footer__contact-link">
              Get in touch <span aria-hidden="true">↗</span>
            </HashLink>
          </Col>
        </Row>

        <div className="site-footer__bottom">
          <span>© {new Date().getFullYear()} Shiloh Creative. All rights reserved.</span>
          <HashLink to="/" className="site-footer__back-to-top">
            Back to top ↑
          </HashLink>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

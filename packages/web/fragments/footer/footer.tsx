import Link from 'next/link'
import React from 'react'
import { Col, Container, Nav, Row } from 'react-bootstrap'

import styles from "../../styles/footer.module.scss"

function AppFooter() {
  return (
    <footer className={styles.footer}>
      <Container>
        <Row>
          <Col xs={6} md={4}>
            <Link href="/"><a className="h2 text-decoration-none text-dark">Daily <ruby>ワトリ<rp>(</rp><rt>Watori</rt><rp>)</rp></ruby></a></Link>

            <div className="my-3">
              <strong>Legals</strong>
              <Nav className="flex-column">
                <Link href="/legal/privacy-policy" passHref><Nav.Link>Privacy Policy</Nav.Link></Link>
                <Link href="/legal/terms-of-service" passHref><Nav.Link>Terms of Service</Nav.Link></Link>
              </Nav>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default AppFooter

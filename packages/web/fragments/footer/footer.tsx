import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'
import { Col, Container, Nav, Row } from 'react-bootstrap'
import { TwitterFollowButton } from 'react-twitter-embed'

import styles from "../../styles/footer.module.scss"

function AppFooter() {
  return (<>
    <footer className={styles.footer}>
      <Container>
        <Row>
          <Col xs={10} md={3}>
            <Link href="/"><a className="h2 text-decoration-none text-dark">Daily <ruby>ワトリ<rp>(</rp><rt>Watori</rt><rp>)</rp></ruby></a></Link>
            <p className='small'>Daily Fan Posts of World Trigger contents to bless your timeline.</p>

            <div className="my-3 mt-4">
              <Nav className="flex-column">
                <Nav.Link href="https://twitter.com/daily_watori" target="_blank" rel="noopener"><FontAwesomeIcon icon={faTwitter} size="lg" /> daily_watori</Nav.Link>
                <Nav.Link href="https://github.com/direbus/daily-watori" target="_blank" rel="noopener"><FontAwesomeIcon icon={faGithub} size="lg" /> direbus/daily-watori</Nav.Link>
              </Nav>
            </div>

          </Col>

          <Col xs={6} md={3}>
            <div className="my-3">
              <strong>Marmod</strong>
              <Nav className="flex-column">
                <Nav.Link href="https://twitter.com/heychez14" target="_blank" rel="noopener"><FontAwesomeIcon icon={faTwitter} size="lg" /> heychez14</Nav.Link>
              </Nav>
            </div>
            <div className="my-3">
              <strong>Core Dev</strong>
              <Nav className="flex-column">
                <Nav.Link href="https://github.com/chez14" target="_blank" rel="noopener"><FontAwesomeIcon icon={faGithub} size="lg" /> chez14</Nav.Link>
                <Nav.Link href="https://github.com/namchee" target="_blank" rel="noopener"><FontAwesomeIcon icon={faGithub} size="lg" /> namchee</Nav.Link>
              </Nav>
            </div>
          </Col>

          <Col xs={6} md={3}>
            <div className="my-3">
              <strong>World Trigger Resources</strong>
              <Nav className="flex-column">
                <Nav.Link href="https://www.toei-anim.co.jp/tv/wt/wt01/" target="_blank" rel="noopener">Toei Page</Nav.Link>
                <Nav.Link href="https://worldtrigger.info/index.php" target="_blank" rel="noopener">World Trigger Info</Nav.Link>
                <Nav.Link href="https://worldtrigger.fandom.com/wiki/Main_Page" target="_blank" rel="noopener">World Trigger Wikia</Nav.Link>
                <Nav.Link href="https://en.wikipedia.org/wiki/World_Trigger" target="_blank" rel="noopener">Wikipedia</Nav.Link>
              </Nav>
            </div>
          </Col>
          <Col xs={6} md={3}>
            <div className="my-3">
              <strong>Daily Watori Resources</strong>
              <Nav className="flex-column">
                <Link href="/legal/privacy-policy" passHref><Nav.Link>Privacy Policy</Nav.Link></Link>
                <Link href="/legal/terms-of-service" passHref><Nav.Link>Terms of Service</Nav.Link></Link>
              </Nav>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
    <footer className={styles.footerSub}>
      <Container>
        <Row>
          <Col xs={12} md={6}>
            <p className='my-2 small fw-bold'>&copy;2021-{(new Date()).getFullYear()} Daily Watori Team.</p>
          </Col>
          <Col xs={12} md={6}>
            <p className='my-2 small text-md-end'><strong>{process.env.BUILD_VER}</strong> Built on {process.env.BUILD_GIT_HASH} at {process.env.BUILD_DATE}.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  </>
  )
}

export default AppFooter

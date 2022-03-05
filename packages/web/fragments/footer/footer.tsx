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
          <Col xs={6} md={3}>
            <Link href="/"><a className="h2 text-decoration-none text-dark">Daily <ruby>ワトリ<rp>(</rp><rt>Watori</rt><rp>)</rp></ruby></a></Link>
            <p className='small'>Daily Fan Posts of World Trigger contents to bless your timeline.</p>

            <div className="my-3 mt-4">
              <Nav className="flex-column">
                <Nav.Link href="https://twitter.com/daily_watori"><FontAwesomeIcon icon={faTwitter} size="lg" /> daily_watori</Nav.Link>
                <Nav.Link href="https://github.com/direbus/daily-watori"><FontAwesomeIcon icon={faGithub} size="lg" /> direbus/daily-watori</Nav.Link>
              </Nav>
            </div>

          </Col>

          <Col xs={6} md={3}>
            <div className="my-3">
              <strong>Marmod</strong>
              <Nav className="flex-column">
                <Nav.Link href="https://twitter.com/heychez14"><FontAwesomeIcon icon={faTwitter} size="lg" /> heychez14</Nav.Link>
              </Nav>
            </div>
            <div className="my-3">
              <strong>Core Dev</strong>
              <Nav className="flex-column">
                <Nav.Link href="https://github.com/chez14"><FontAwesomeIcon icon={faGithub} size="lg" /> chez14</Nav.Link>
                <Nav.Link href="https://github.com/namchee"><FontAwesomeIcon icon={faGithub} size="lg" /> namchee</Nav.Link>
              </Nav>
            </div>
          </Col>

          <Col xs={6} md={3}>
            <div className="my-3">
              <strong>World Trigger Resources</strong>
              <Nav className="flex-column">
                <Nav.Link href="https://www.toei-anim.co.jp/tv/wt/wt01/">Toei Page</Nav.Link>
                <Nav.Link href="https://worldtrigger.info/index.php">World Trigger Info</Nav.Link>
                <Nav.Link href="https://worldtrigger.fandom.com/wiki/Main_Page">World Trigger Wikia</Nav.Link>
                <Nav.Link href="https://en.wikipedia.org/wiki/World_Trigger">Wikipedia</Nav.Link>
              </Nav>
            </div>
          </Col>
          <Col xs={6} md={3}>
            <div className="my-3">
              <strong>Daily Watori Legals</strong>
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
        <p className='m-0 small fw-bold'>&copy;2021-{(new Date()).getFullYear()} Daily Watori Team; Built on #commit-hash# at #time#.</p>
      </Container>
    </footer>
  </>
  )
}

export default AppFooter

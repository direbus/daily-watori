import { faDiscord, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NextSeo } from 'next-seo'
import React from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'

function AuthLogin() {
  return (
    <>
      <NextSeo title='Marmod Login' />

      <main>
        <Container>
          <Row style={{minHeight: "60vh"}} className="align-items-center">
            <Col xs={12} md={4}>
              <Card>
                <Card.Body>
                  <h3>Marmod</h3>
                  <p className="lead">Mod-only Panel Access. You need to be a mod to get this privilege.</p>
                  <p>If you're not a mod, we'll post something weird with your account information &gt;:(</p>

                  <div className="d-grid gap-2">
                    <Button size="lg" href="/connect?intent=login&provider=google"><FontAwesomeIcon icon={faGoogle} /> Login with Google</Button>
                    <Button size="lg" href="/connect?intent=login&provider=twitter"><FontAwesomeIcon icon={faTwitter} /> Login with Twitter</Button>
                    <Button size="lg" href="/connect?intent=login&provider=discord"><FontAwesomeIcon icon={faDiscord} /> Login with Discord</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  )
}

export default AuthLogin

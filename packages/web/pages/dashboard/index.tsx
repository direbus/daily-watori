import { faRectangleList } from '@fortawesome/free-regular-svg-icons';
import { faAdd, faBoltLightning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { NextSeo } from 'next-seo';
import React from 'react';
import { Button, ButtonGroup, Card, Col, Container, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import RapidReviewModal from '../../fragments/dashboard/reviewer-modal';
import styles from '../../styles/dashboard.module.scss';


function DashboardIndex() {
  return (
    <>
      <NextSeo title="Dashboard" />

      <main>
        <Container>
          <section className={styles.section}>
            <h1>Dashboard</h1>
            <Row className={classNames('align-items-stretch', styles.sectionCardStatusser)}>
              <Col xs={4} md={3}>
                <Card>
                  <Card.Body>
                    <Card.Title>Pending Post Review</Card.Title>
                    <p className="display-3 card-stats">0</p>
                    <div className="d-flex align-items-end">
                      <p className='mb-0 flex-grow-1'>
                        <a href="">See all posts →</a>
                      </p>
                      <div className="d-block">
                        <OverlayTrigger overlay={<Tooltip>Rapid Review Mode</Tooltip>}>
                          <Button><FontAwesomeIcon icon={faBoltLightning} /></Button>
                        </OverlayTrigger>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={4} md={3}>
                <Card>
                  <Card.Body>
                    <Card.Title>Pending Artist Review</Card.Title>
                    <p className="display-3 card-stats">0</p>
                    <p className='mb-0'><a href="">See all posts →</a></p>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={4} md={3}>
                <Card>
                  <Card.Body>
                    <Card.Title>Appv. Post In Queue</Card.Title>
                    <p className="display-3 card-stats">0</p>
                    <p className='mb-0'><a href="">See all posts →</a></p>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={4} md={3}>
                <Card>
                  <Card.Body>
                    <Card.Title>Last Publish</Card.Title>
                    <p className="h2 card-stats">
                      {(new Date()).toLocaleTimeString()} <br />
                      {(new Date()).toLocaleDateString()}
                    </p>
                    <p className='mb-0'><a href="">See all posts →</a></p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </section>


          <section className={styles.section}>
            <h2>Posts</h2>
            <div className='bg-dark p-5 text-white'>Graphic of Fetched Post, Approved vs Rejected</div>
          </section>
          
          <section className={styles.section}>
            <h2>Post Moderation Rate</h2>
            <div className='bg-dark p-5 text-white'>Graphic of Fetched Post</div>
          </section>

        </Container>
      </main>
    </>
  )
}

export default DashboardIndex

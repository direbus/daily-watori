import classNames from 'classnames';
import React from 'react';
import { Button, Col, Modal, ModalBody, ModalHeader, Row } from 'react-bootstrap';
import { TwitterTweetEmbed } from "react-twitter-embed";
import FetchedTweetPropertiesLabel from '../../components/fetched-tweet-properties';
import styles from "./reviewer-modal.module.scss";



const gamepadIcons = {
  accept: "/assets/ps4-cross.png",
  reject: "/assets/ps4-circle.png",
  close: "/assets/ps4-triangle.png",
}

function RapidReviewModal() {
  return (
    <Modal size='xl' centered show>
      <ModalHeader closeButton>
        Pending Post Reviewer: Rapid Mode
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col xs={12} md={8}>
            <div className={styles.sectionPreview}>
              <div className={styles.sectionZoomer}>
                <TwitterTweetEmbed tweetId={'933354946111705097'} options={{ dnt: true, conversation: false, theme: "dark" }} />
              </div>
              <div className={classNames('text-center', styles.sectionAdditionalInfo)}>
                <p className='text-white small text-uppercase'><b>23</b> tweets to go</p>
                <Button size="lg" variant="light" className="me-4"><img className={styles.hintShortcut} src={gamepadIcons.reject} /> Reject</Button>
                <Button size="lg" variant="light"><img className={styles.hintShortcut} src={gamepadIcons.accept} /> Accept</Button>
              </div>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <FetchedTweetPropertiesLabel title='Fetched on'>{(new Date()).toString()}</FetchedTweetPropertiesLabel>
            <FetchedTweetPropertiesLabel title='Tweet ID'>933354946111705097</FetchedTweetPropertiesLabel>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  )
}

export default RapidReviewModal

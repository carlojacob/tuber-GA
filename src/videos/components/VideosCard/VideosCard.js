import React from 'react'
import { Link } from 'react-router-dom'
import { Card, ListGroup, ListGroupItem, Col } from 'react-bootstrap'

import './VideosCard.scss'

const convertUrlToThumb = url => {
  return `https://img.youtube.com/vi/${url.split('embed/')[1]}/maxresdefault.jpg`
}

const VideosCard = ({ video }) => (
  <Col className="video-col">
    <Link to={`/videos/${video._id}`} className="video-link">
      <Card className="video-wrapper">
        <Card.Img className="video-img" variant="top" src={!video.url
          ? 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'
          : convertUrlToThumb(video.url)
        }
        />
        <Card.Body className="video-details video-title-dims">
          <Card.Title className="video-title">{video.title} {!video.url ? <span><br /><i>{'Haha!'}</i></span> : ''}</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush video-card-body">
          <ListGroupItem className="video-details video-artist-dims">Artist: {video.artist}</ListGroupItem>
          <ListGroupItem className="video-details video-album-dims">Album: {video.album}</ListGroupItem>
        </ListGroup>
        <Card.Body className="video-details video-description-dims">
          <Card.Text>Description: {video.description}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  </Col>
)

export default VideosCard

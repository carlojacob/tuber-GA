import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router'
import { Alert } from 'react-bootstrap'

import { createVideo } from '../../api'

import VideoForm from '../VideoForm/VideoForm'

class VideoCreate extends Component {
  constructor () {
    super()

    this.state = {
      artist: '',
      title: '',
      album: '',
      description: '',
      url: '',
      createdVideoId: null
    }
  }

  handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }
    this.setState(updatedField)
  }

  handleSubmit = event => {
    event.preventDefault()

    const { artist, title, album, description, url } = this.state

    if ((artist.length === 0 &&
    title.length === 0 &&
    album.length === 0 &&
    description.length === 0) ||
    url.length === 0) {
      return this.setState({ message: 'You must enter a URL and at least one other field.' })
    }

    createVideo(this.props.user, this.state)
      .then(response => this.setState({ createdVideoId: response.data.video._id }))
      .catch(console.error)
  }

  render () {
    const { artist, title, album, description, url, message, createdVideoId } = this.state

    if (createdVideoId) {
      return <Redirect to={`/videos/${createdVideoId}`} />
    }

    const { handleChange, handleSubmit } = this

    return (
      <Fragment>
        {message && <Alert dismissible variant="danger">{message}</Alert>}
        <VideoForm
          video={{ artist, title, album, description, url }}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </Fragment>
    )
  }
}

export default VideoCreate

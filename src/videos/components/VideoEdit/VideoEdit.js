import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router'
import { Alert } from 'react-bootstrap'

import { getVideo, updateVideo } from '../../api'

import VideoForm from '../VideoForm/VideoForm'

class VideoEdit extends Component {
  constructor () {
    super()

    this.state = {
      video: null,
      message: null,
      shouldRedirect: false,
      redirectMessage: '',
      redirectPath: '',
      editedVideo: false
    }
  }

  handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }
    this.setState({ video: { ...this.state.video, ...updatedField } })
  }

  handleSubmit = event => {
    event.preventDefault()

    const { artist, title, album, description, url } = this.state.video

    if ((artist.length === 0 &&
    title.length === 0 &&
    album.length === 0 &&
    description.length === 0) ||
    url.length === 0) {
      return this.setState({ message: 'You must enter a URL and at least one other field.' })
    }

    updateVideo(this.props, this.state.video)
      .then(response => this.setState({
        editedVideo: true,
        shouldRedirect: true,
        redirectPath: `/videos/${this.props.match.params.id}`
      }))
      .catch(error => console.error(error))
  }

  componentDidMount () {
    getVideo(this.props)
      .then(response => this.setState({ video:
        {
          artist: response.data.video.artist,
          title: response.data.video.title,
          album: response.data.video.album,
          description: response.data.video.description,
          url: response.data.video.url
        }
      }))
      .catch(error => {
        this.setState({
          shouldRedirect: true,
          redirectMessage: 'Video not Fount',
          redirectPath: '/videos'
        })
        console.error(error)
      })
  }

  render () {
    const { handleChange, handleSubmit } = this
    const { video, message, shouldRedirect, redirectPath, redirectMessage, editedVideo } = this.state

    if (shouldRedirect) {
      return <Redirect to={{
        pathname: redirectPath,
        state: { message: redirectMessage }
      }} />
    }

    if (!video) {
      return <p>Loading...</p>
    }

    if (editedVideo) {
      return <Redirect to={`/rvideos/${video.id}`} />
    }

    return (
      <Fragment>
        {message && <Alert dismissible variant="danger">{message}</Alert>}
        <VideoForm
          video={video}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </Fragment>
    )
  }
}

export default VideoEdit

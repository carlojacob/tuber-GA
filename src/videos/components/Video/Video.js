import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'

import { getVideo } from '../../api'

import './Video.scss'

class Video extends Component {
  constructor () {
    super()

    this.state = {
      video: null,
      shouldRedirect: false,
      redirectMessage: '',
      redirectPath: ''
    }
  }

  // deleteVideo = id => {
  //
  // }

  componentDidMount () {
    console.log(this.props)
    getVideo(this.props)
      .then(response => this.setState({ video: response.data.video }))
      .catch(console.error)
  }

  render () {
    const { video, shouldRedirect, redirectPath, redirectMessage } = this.state

    if (shouldRedirect) {
      return <Redirect to={{
        pathname: redirectPath,
        state: { message: redirectMessage }
      }} />
    }

    if (!video) {
      return <p>Loading...</p>
    }

    const { artist, title, album, description } = video

    return (
      <Fragment>
        <div className="centered-video">
          <iframe className="full-video-dims" src="https://www.youtube.com/embed/tgbNymZ7vqY">
          </iframe>
          <button onClick={() => this.deleteVideo(this.props.match.params.id)}>Delete</button>
          <Link to={`/videos/${this.props.match.params.id}/edit`}>
            <button>Edit</button>
          </Link>
        </div>
        <div>
          <p className="video-show video-head">Artist:</p>
          <p className="video-show video-text">{artist}</p>
        </div>
        <div>
          <p className="video-show video-head">Title:</p>
          <p className="video-show video-text">{title}</p>
        </div>
        <div>
          <p className="video-show video-head">Album:</p>
          <p className="video-show video-text">{album}</p>
        </div>
        <div>
          <p className="video-show video-head">Description:</p>
          <p className="video-show video-text">{description}</p>
        </div>
      </Fragment>
    )
  }
}

export default Video

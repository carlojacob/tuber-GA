import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'

import { getVideo, deleteVideo } from '../../api'
import convertUrl from '../../convertUrl'

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

  delVideo = props => {
    deleteVideo(props)
      .then(response => this.setState({
        shouldRedirect: true,
        redirectMessage: 'Successfully deleted video',
        redirectPath: '/videos'
      }))
      .catch(error => {
        this.setState({
          shouldRedirect: true,
          redirectMessage: 'Video could not be deleted. Please try again.',
          redirectPath: `/videos/${this.props.match.params.id}`
        })
        console.error(error)
      })
  }

  componentDidMount () {
    getVideo(this.props)
      .then(response => this.setState({ video: response.data.video }))
      .then(() => this.setState({ video: {
        ...this.state.video,
        url: convertUrl(this.state.video.url)
      }
      }))
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

    const { artist, title, album, description, url } = video

    return (
      <Fragment>
        <div className="centered-video">
          {!url
            ? <div>
              <iframe className="full-video-dims" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1">
              </iframe>
              <p>Cannot load video, but you just got Rick-rolled</p>
            </div>
            : <iframe className="full-video-dims" src={url}>
            </iframe>
          }
          <button onClick={() => this.delVideo(this.props)}>Delete</button>
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

import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'

import { getVideo, deleteVideo } from '../../api'
import convertUrl from '../../convertUrl'
import messages from '../../messages'

import './Video.scss'

class Video extends Component {
  constructor () {
    super()

    this.state = {
      video: null,
      shouldRedirect: false,
      redirectPath: ''
    }
  }

  delVideo = props => {
    const { alert } = this.props

    deleteVideo(props)
      .then(response => this.setState({
        shouldRedirect: true,
        redirectPath: '/videos'
      }))
      .then(() => alert(messages.deleteVideoSuccess, 'success'))
      .catch(error => {
        this.setState({
          shouldRedirect: true,
          redirectPath: `/videos/${this.props.match.params.id}`
        })
        alert(messages.deleteVideoFailure, 'danger')
        console.error(error)
      })
  }

  componentDidMount () {
    const { alert } = this.props

    getVideo(this.props)
      .then(response => this.setState({ video: response.data.video }))
      .then(() => this.setState({ video: {
        ...this.state.video,
        url: convertUrl(this.state.video.url)
      }
      }))
      .then(() => {
        if (this.state.video.url === false) {
          alert(messages.rickError, 'danger')
        }
      })
      .catch(console.error)
  }

  render () {
    const { video, shouldRedirect, redirectPath } = this.state

    if (shouldRedirect) {
      return <Redirect to={{
        pathname: redirectPath
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
            ? <iframe className="full-video-dims" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1">
            </iframe>
            : <iframe className="full-video-dims" src={url}>
            </iframe>
          }
          <div>
            <button onClick={() => this.delVideo(this.props)}>Delete</button>
            <Link to={`/videos/${this.props.match.params.id}/edit`}>
              <button>Edit</button>
            </Link>
            <Link to='/videos'>
              <button>Back</button>
            </Link>
          </div>
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
        <div>
          <p className="video-show video-head">URL:</p>
          <p className="video-show video-text">
            {!url
              ? 'Invalid URL stored'
              : <a rel="noopener noreferrer" target="_blank" href={url.replace('embed/', 'watch?v=')}>{url.replace('embed/', 'watch?v=')}</a>
            }
          </p>
        </div>
      </Fragment>
    )
  }
}

export default Video

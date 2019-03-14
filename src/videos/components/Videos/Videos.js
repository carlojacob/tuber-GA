import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Alert } from 'react-bootstrap'

import { getVideos } from '../../api'
import convertUrl from '../../convertUrl'

import './Videos.scss'

class Videos extends Component {
  constructor () {
    super()

    this.state = {
      videos: null
    }
  }

  convertUrlToThumb = url => {
    return `https://img.youtube.com/vi/${url.split('embed/')[1]}/maxresdefault.jpg`
  }

  componentDidMount () {
    let saveVideos
    getVideos(this.props.user)
      .then(response => {
        saveVideos = response.data.videos
        saveVideos.forEach(video => {
          video.url = convertUrl(video.url)
        })
        this.setState({ videos: saveVideos })
      })
      .catch(console.error)
  }

  render () {
    const { videos } = this.state

    const { convertUrlToThumb } = this

    if (videos === null) {
      return <p>Loading...</p>
    }

    return (
      <Fragment>
        <h3>
          Your Tubes
          <span>
            <Link to='/video-create'>
              <button>Add Tube</button>
            </Link>
          </span>
        </h3>
        {videos.length === 0
          ? <Alert variant="primary">{'You haven\'t added any videos yet!'}</Alert>
          : <p className="videos-table table-head">
            <span className="artist-head">Artist</span>
            <span className="title-head">Title</span>
            <span className="album-head">Album</span>
            <span className="description-head">Description</span>
            <span className="thumbnail-head">Thumbnail</span>
          </p>
        }
        {videos.map(video => (
          <p key={video._id}>
            <Link to={`/videos/${video._id}`} className="videos-table">
              <span className="artist-col">
                {video.artist}
              </span>
              <span className="title-col">
                {video.title}
              </span>
              <span className="album-col">
                {video.album}
              </span>
              <span className="description-col">
                {video.description}
              </span>
              <span className="thumbnail-col">
                {!video.url
                  ? <img className="thumbnail-dims" src="https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg" />
                  : <img className="thumbnail-dims" src={convertUrlToThumb(video.url)} />
                }
              </span>
            </Link>
          </p>
        ))}
      </Fragment>
    )
  }
}

export default Videos

import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

import { getVideos } from '../api'

import './Videos.scss'

class Videos extends Component {
  constructor () {
    super()

    this.state = {
      videos: null
    }
  }

  componentDidMount () {
    getVideos(this.props.user)
      .then(response => this.setState({ videos: response.data.videos }))
      .catch(console.error)
  }

  render () {
    if (!this.state.videos) {
      return <p>Loading...</p>
    }
    return (
      <Fragment>
        <h3>
          Your Tubes <span><button>Add Tube</button></span>
        </h3>
        <p className="videos-table table-head">
          <span className="artist-head">Artist</span>
          <span className="title-head">Title</span>
          <span className="album-head">Album</span>
          <span className="description-head">Description</span>
          <span className="thumbnail-head">Thumbnail</span>
        </p>
        {this.state.videos.map(video => (
          <p key={video.id}>
            <Link to={`/videos/${video.id}`} className="videos-table">
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
                <iframe className="thumbnail-dims" src="https://www.youtube.com/embed/tgbNymZ7vqY">
                </iframe>
              </span>
            </Link>
          </p>
        ))}
      </Fragment>
    )
  }
}

export default Videos

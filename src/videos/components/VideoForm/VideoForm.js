import React from 'react'

const VideoForm = ({ handleSubmit, handleChange, video }) => (
  <form onSubmit={handleSubmit}>
    <p>
      <label>Artist</label>
      <input
        placeholder="Artist Name"
        name="artist"
        onChange={handleChange}
        value={video ? video.artist : ''}
      />
    </p>
    <p>
      <label>Title</label>
      <input
        placeholder="Video Title"
        name="title"
        onChange={handleChange}
        value={video ? video.title : ''}
      />
    </p>
    <p>
      <label>Album</label>
      <input
        placeholder="Album"
        name="album"
        onChange={handleChange}
        value={video ? video.album : ''}
      />
    </p>
    <p>
      <label>Description</label>
      <input
        placeholder="Description"
        name="description"
        onChange={handleChange}
        value={video ? video.description : ''}
      />
    </p>
    <p>
      <label>URL</label>
      <input
        placeholder="YouTube URL only (required)"
        name="url"
        onChange={handleChange}
        value={video ? video.url : ''}
      />
    </p>
    <button type="submit">Submit</button>
  </form>
)

export default VideoForm

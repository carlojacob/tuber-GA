let videoId

const checkUrl = (url) => {
  if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
    return false
  }
}

const parseUrl = url => {
  let parsed
  if (url.includes('youtube.com')) {
    const afterWatch = url.split('watch?v=')
    if (afterWatch[1].substring(0, 11).length === 11) {
      parsed = afterWatch[1].substring(0, 11)
    } else {
      parsed = false
    }
  }
  if (url.includes('youtu.be')) {
    const afterWatch = url.split('.be/')
    if (afterWatch[1].substring(0, 11).length === 11) {
      parsed = afterWatch[1].substring(0, 11)
    } else {
      parsed = false
    }
  }
  return parsed
}

const createEmbedUrl = videoId => {
  return `https://www.youtube.com/embed/${videoId}`
}

const convertUrl = url => {
  if (checkUrl(url) === false) {
    return false
  }
  if (url.includes('youtube.com')) {
    if (parseUrl(url) === false) {
      videoId = false
    } else {
      videoId = parseUrl(url)
    }
  } else if (url.includes('youtu.be')) {
    if (parseUrl(url) === false) {
      videoId = false
    } else {
      videoId = parseUrl(url)
    }
  }
  if (videoId === false) {
    return false
  }
  return createEmbedUrl(videoId)
}

export default convertUrl

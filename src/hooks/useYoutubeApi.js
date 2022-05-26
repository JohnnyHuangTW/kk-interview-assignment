import { useCallback, useMemo } from 'react'

const { gapi } = window

const useYoutubeApi = () => {
  // query channel basic info by channel name
  const fetchChannelInfoByName = useCallback((channelName) => {
    const requestOptions = {
      part: ['snippet,contentDetails,statistics'],
      forUsername: channelName,
    }
    return gapi.client.youtube.channels
      .list(requestOptions)
      .then((response) => {
        const channel = response.result.items[0] ?? {}
        const {
          id,
          snippet: { customUrl, title, description, thumbnails },
          statistics: { subscriberCount },
          contentDetails: { relatedPlaylists },
        } = channel
        return {
          id,
          title,
          description,
          url: `https://youtube.com/${customUrl}`,
          subscriberCount,
          thumbnails,
          playlistId: relatedPlaylists.uploads,
        }
      })
      .catch((err) => console.error('Cannot find the channel', err))
  }, [])

  // query video list by playlistId
  const fetchVideosByPlaylistId = useCallback(
    ({ playlistId, pageToken = '', itemPerPage = '10' } = {}) => {
      const requestOptions = {
        playlistId,
        part: ['snippet'],
        pageToken,
        maxResults: itemPerPage,
      }
      return gapi.client.youtube.playlistItems
        .list(requestOptions)
        .then((response) => {
          const { items, nextPageToken, prevPageToken, pageInfo } = response.result
          // sort out items for only the information we need
          const videoItems = items?.map((video) => {
            const { title, description, resourceId, thumbnails, publishedAt } = video.snippet
            return {
              videoId: resourceId.videoId,
              title,
              description,
              thumbnails,
              publishedAt,
            }
          })
          // for fetch videos statistics api
          const videoIds = videoItems.map((video) => video.videoId)
          return {
            videoItems,
            videoIds,
            pageInfo,
            nextPageToken,
            prevPageToken,
          }
        })
        .catch((err) => console.error('Cannot find the playlist', err))
    },
    [],
  )

  // query videos by channelId and sorted by date
  const fetchChannelVideosByDate = useCallback(
    ({ channelId, pageToken = '', itemPerPage = '10' } = {}) => {
      const requestOptions = {
        channelId,
        part: ['snippet'],
        pageToken,
        maxResults: itemPerPage,
        order: 'date',
      }
      return gapi.client.youtube.search
        .list(requestOptions)
        .then((response) => {
          const { items, nextPageToken, prevPageToken, pageInfo } = response.result
          // sort out items for only the information we need
          const videoItems = items?.map((video) => {
            const { snippet, id } = video
            const { title, description, thumbnails, publishedAt } = snippet
            return {
              videoId: id.videoId,
              title,
              description,
              thumbnails,
              publishedAt,
            }
          })

          return {
            videoItems,
            pageInfo,
            nextPageToken,
            prevPageToken,
          }
        })
        .catch((err) => console.error('Cannot find the videos under this channel', err))
    },
    [],
  )

  // fetch video detail information by video ids
  const fetchVideosInfoByIds = useCallback((ids = []) => {
    const requestOptions = {
      part: ['contentDetails,statistics'],
      id: ids,
    }
    return gapi.client.youtube.videos
      .list(requestOptions)
      .then((response) => {
        const items = response.result.items ?? []
        const dataList = items.map((video) => {
          const { id, contentDetails, statistics } = video
          return {
            videoId: id,
            duration: contentDetails.duration,
            viewCount: statistics.viewCount,
            likeCount: statistics.likeCount,
            commentCount: statistics.commentCount,
          }
        })
        return dataList
      })
      .catch(() => console.error('Cannot find the videos'))
  }, [])

  // query channel videos by date with details
  const fetchSortedChannelVideos = useCallback(
    async ({ channelId, pageToken = '', itemPerPage = '10' } = {}) => {
      try {
        const channelVideos = await fetchChannelVideosByDate({ channelId, pageToken, itemPerPage })
        const { videoItems } = channelVideos ?? {}
        const videoIds = videoItems?.map((video) => video.videoId)
        const videoInfoList = await fetchVideosInfoByIds(videoIds)

        // transform array to object by videoId
        const videoInfoObj = videoInfoList?.reduce((obj, item) => {
          const { videoId, ...rest } = item
          return Object.assign(obj, { [videoId]: rest })
        }, {})

        // attach video detail to videoItems by videoId
        const videoItemsWithDetail = videoItems.map((item) => {
          const detail = videoInfoObj[item.videoId] ?? {}
          return { ...item, ...detail }
        })

        return { ...channelVideos, videoItems: videoItemsWithDetail }
      } catch (err) {
        console.error(err)
        return null
      }
    },
    [fetchChannelVideosByDate, fetchVideosInfoByIds],
  )

  return useMemo(
    () => ({
      fetchChannelInfoByName,
      fetchChannelVideosByDate,
      fetchVideosInfoByIds,
      fetchSortedChannelVideos,
      fetchVideosByPlaylistId,
    }),
    [
      fetchChannelInfoByName,
      fetchChannelVideosByDate,
      fetchSortedChannelVideos,
      fetchVideosByPlaylistId,
      fetchVideosInfoByIds,
    ],
  )
}

export default useYoutubeApi

import { API_KEY, CLIENT_ID } from '../constants'

const { gapi } = window

const googleAPI = {
  init: () => {
    gapi.load('client:auth2', () => {
      gapi.auth2.init({ client_id: CLIENT_ID })
    })
  },
  authenticate: () => gapi.auth2.getAuthInstance().signIn({ scope: 'https://www.googleapis.com/auth/youtube.readonly' }),
  loadClient: () => {
    gapi.client.setApiKey(API_KEY)
    return gapi.client.load('https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest')
  },

  // Make sure the client is loaded and sign-in is complete before calling this method.
  getChannelInfo: (channelName) => gapi.client.youtube.channels.list({
    part: [
      'snippet,contentDetails,statistics',
    ],
    forUsername: channelName,
    maxResults: 5,
  }),
}

export default googleAPI

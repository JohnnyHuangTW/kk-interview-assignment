import { useCallback, useEffect, useMemo, useState } from 'react'
import { GAPI_DISCOVERY, GAPI_SCOPE, OAUTH2_CLIENT_NAME } from '../constants'

/**
 * Google API Sign In Reference
 * https://developers.google.com/identity/sign-in/web/reference
 */

const { gapi } = window

const GAPI_API_KEY = process.env.REACT_APP_GAPI_API_KEY
const GAPI_CLIENT_ID = process.env.REACT_APP_GAPI_CLIENT_ID

const useGoogleAuth = () => {
  const [isGApiReady, setIsGApiReady] = useState(false)
  const [isClientReady, setIsClientReady] = useState(false)
  const [isSignIn, setIsSignIn] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const [error, setError] = useState('')

  // load client api
  const loadClient = useCallback(() => {
    gapi.client.setApiKey(GAPI_API_KEY)
    return gapi.client.load(GAPI_DISCOVERY).then(
      () => {
        setIsClientReady(true)
        setError('')
      },
      (err) => setError(err),
    )
  }, [])

  const updateSignInStatus = useCallback(
    (signInStatus) => {
      setIsSignIn(signInStatus)

      // load client api if currently has signed in
      if (signInStatus) loadClient()
    },
    [loadClient],
  )

  // initialize gapi
  const initGApi = useCallback(() => {
    gapi.auth2
      .init({
        client_id: GAPI_CLIENT_ID,
        plugin_name: OAUTH2_CLIENT_NAME,
      })
      .then(() => {
        setIsGApiReady(true)

        // initial sign in status
        const currentSignedInStatus = gapi.auth2.getAuthInstance().isSignedIn.get()
        updateSignInStatus(currentSignedInStatus)

        // listen for sign in status changes
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus)

        setError('')
      })
      .catch((err) => setError(err.details))
  }, [updateSignInStatus])

  const authenticate = useCallback(() => {
    gapi.auth2
      .getAuthInstance()
      .signIn({ scope: GAPI_SCOPE })
      .then(
        () => setError(''),
        () => setError('Login failed'),
      )
  }, [])

  const signOut = useCallback(() => {
    gapi.auth2
      .getAuthInstance()
      .signOut()
      .then(() => {
        setIsSignIn(false)
        setIsClientReady(false)
        setUserInfo(null)
      })
  }, [])

  const getUserInfo = useCallback(() => {
    const profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile()
    setUserInfo({
      id: profile.getId(),
      fullName: profile.getName(),
      givenName: profile.getGivenName(),
      familyName: profile.getFamilyName(),
      imageUrl: profile.getImageUrl(),
      email: profile.getEmail(),
    })
  }, [])

  // gapi initial process
  useEffect(() => {
    if (gapi) gapi.load('client:auth2', initGApi)
  }, [initGApi])

  // get user info once user signed in
  useEffect(() => {
    if (isSignIn) getUserInfo()
  }, [getUserInfo, isSignIn])

  const values = useMemo(
    () => ({
      isGApiReady, // whether the gapi initial process is ready
      isClientReady, // whether client setup is ready after user signed in
      isSignIn, // sign in status
      authenticate, // sign in callback
      signOut, // sign out callback
      userInfo, // user basic profile data
      error, // error message
    }),
    [authenticate, error, isClientReady, isGApiReady, isSignIn, signOut, userInfo],
  )

  return values
}

export default useGoogleAuth

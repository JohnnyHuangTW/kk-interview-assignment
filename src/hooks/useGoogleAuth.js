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
  const [isReady, setIsReady] = useState(false)
  const [isSignIn, setIsSignIn] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const [error, setError] = useState('')

  // load client api
  const loadClient = useCallback(() => {
    gapi.client.setApiKey(GAPI_API_KEY)
    return gapi.client.load(GAPI_DISCOVERY).then(
      () => console.log('%cClient Ready', 'font-weight: bold; color: #3f4e60'),
      (err) => setError(err),
    )
  }, [])

  const updateSignInStatus = useCallback((signInStatus) => {
    setIsSignIn(signInStatus)
    console.log(`%cSign In Status Changed: ${signInStatus}`, 'font-weight: bold; color: #3f4e60')
    // load client api if currently has signed in
    if (signInStatus) loadClient()
  }, [loadClient])

  // initialize gapi
  const initGApi = useCallback(() => {
    gapi.auth2
      .init({
        client_id: GAPI_CLIENT_ID,
        plugin_name: OAUTH2_CLIENT_NAME,
      })
      .then(() => {
        console.log('%cGAPI Ready', 'font-weight: bold; color: #3f4e60')
        setIsReady(true)
        // initial sign in status
        const currentSignedInStatus = gapi.auth2.getAuthInstance().isSignedIn.get()
        updateSignInStatus(currentSignedInStatus)
        console.log(`%cInitial Sign In Status: ${currentSignedInStatus}`, 'font-weight: bold; color: #3f4e60')

        // listen for sign in status changes
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus)
      })
      .catch((err) => setError(err.details))
  }, [updateSignInStatus])

  const authenticate = useCallback(() => {
    gapi.auth2
      .getAuthInstance()
      .signIn({ scope: GAPI_SCOPE })
      .then(
        () => console.log('%cSigned In Successfully', 'font-weight: bold; color: #3f4e60'),
        () => setError('Login failed'),
      )
  }, [])

  const signOut = useCallback(() => {
    gapi.auth2
      .getAuthInstance()
      .signOut()
      .then(() => setIsSignIn(false))
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
      isReady, // whether the gapi initial process is ready
      isSignIn, // sign in status
      authenticate, // sign in callback
      signOut, // sign out callback
      userInfo, // user basic profile data
      error, // error message
    }),
    [authenticate, error, isReady, isSignIn, signOut, userInfo],
  )

  return values
}

export default useGoogleAuth

import './App.css'
import VideoList from './components/VideoList'
import { useGoogleApi } from './useGoogleApi'

const App = () => {
  const googleApi = useGoogleApi()

  return (
    <div>
      Login: {String(googleApi.isSignIn)}<br />
      <button onClick={googleApi.authenticate}>login</button><br />
      <button onClick={googleApi.signOut}>logout</button>
      <VideoList />
    </div>
  )
}

export default App

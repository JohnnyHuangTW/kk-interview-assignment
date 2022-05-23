import { useCallback, useEffect } from 'react'
import './App.css'
import VideoList from './components/VideoList'
import googleAPI from './service/googleApi'

const App = () => {
  const appInit = useCallback(async () => {
    googleAPI.init()
    // googleAPI.authenticate().then((
    //   () => console.log('success'),
    //   (err) => console.error(err)
    // ))
  })

  useEffect(() => {
    appInit()
  })

  return (
    <div>
      <VideoList />
    </div>

  )
}

export default App

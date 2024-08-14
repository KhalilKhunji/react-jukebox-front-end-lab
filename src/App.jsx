import { useEffect, useState } from 'react';
import TrackList from './components/TrackList';
import * as trackService from './services/trackService';

const App = () => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const getTracks = async () => {
      try {
        const trackList = await trackService.index();
        if(trackList.error) {
          throw new Error(trackList.error);
        };
        setTracks(trackList);
      } catch (error) {
        console.log(error);
      };
    };
    getTracks();
  }, []);

  return(
    <>
      <TrackList tracks={tracks} />
    </>
  )
}

export default App;
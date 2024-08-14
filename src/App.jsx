import { useEffect, useState } from 'react';
import TrackList from './components/TrackList';
import TrackForm from './components/TrackForm';
import * as trackService from './services/trackService';

const App = () => {
  const [tracks, setTracks] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

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

  const handleAddTrack = async (formData) => {
    try {
      const newTrack = await trackService.create(formData);
      if (newTrack.error) {
        throw new Error(newTrack.error);
      };
      setTracks([...tracks, newTrack]);
    } catch (error) {
      console.log(error);
    };
  };

  return(
    <>
      {isFormOpen ? <TrackForm handleAddTrack={handleAddTrack} setIsFormOpen={setIsFormOpen} /> : <>
        <button onClick={() => {setIsFormOpen(true)}}>Add New Track</button>
        <TrackList tracks={tracks} />
      </>}
    </>
  )
}

export default App;
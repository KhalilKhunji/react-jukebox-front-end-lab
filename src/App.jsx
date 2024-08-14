import { useEffect, useState } from 'react';
import TrackList from './components/TrackList';
import TrackForm from './components/TrackForm';
import NowPlaying from './components/NowPlaying';
import * as trackService from './services/trackService';

const App = () => {
  const [tracks, setTracks] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editTrack, setEditTrack] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);

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

  const handleEditTrack = (track) => {
    setIsFormOpen(true);
    setEditMode(true);
    setEditTrack(track);
  };

  const handleUpdateTrack = async (formData) => {
    try {
      const updatedTrack = await trackService.update(formData, editTrack._id);
      if (updatedTrack.error) {
        throw new Error(updatedTrack.error);
      };
      const updatedTrackList = tracks.map((track) => (
        track._id !== updatedTrack ? track: updatedTrack
      ));
      setTracks(updatedTrackList);
    } catch (error) {
      console.log(error);
    };
  };

  const handleOnSubmit = async (formData) => {
    if (editMode) {
      await handleUpdateTrack(formData);
    } else {
      await handleAddTrack(formData);
    };
    setEditMode(false);
    setIsFormOpen(false);
  };

  const handleDeleteTrack = async (trackId) => {
    try {
      const deletedTrack = await trackService.remove(trackId);
      if (deletedTrack.error) {
        throw new Error(deletedTrack.error);
      };
      setTracks(tracks.filter((track) => track._id !== trackId));
      if (currentTrack && currentTrack._id === trackId) {
        setCurrentTrack(null);
      };
    } catch (error) {
      console.log(error);
    };
  };

  const handlePlayTrack = (track) => {
    setCurrentTrack(track);
  };

  return(
    <>
      {isFormOpen ? <TrackForm setIsFormOpen={setIsFormOpen} handleOnSubmit={handleOnSubmit} track={ editMode ? editTrack : null} /> : <>
        <button onClick={() => {setIsFormOpen(true); setEditMode(false); setEditTrack(false)}}>Add New Track</button>
        <TrackList tracks={tracks} handleEditTrack={handleEditTrack} handleDeleteTrack={handleDeleteTrack} handlePlayTrack={handlePlayTrack} />
        {currentTrack ? <NowPlaying currentTrack={currentTrack} /> : <></>}
      </>}
    </>
  )
}

export default App;
import { useState, useEffect } from 'react';

const TrackForm = ({ handleOnSubmit, setIsFormOpen, track }) => {
    const [formData, setFormData] = useState({
        title: '',
        artist: ''
    });

    useEffect(() => {
        if(track) {
            setFormData({ title: track.title, artist: track.artist });
        };
    }, [track]);

    const handleSubmit = (event) => {
        event.preventDefault();
        handleOnSubmit(formData);
        setIsFormOpen(false);
        setFormData({ title: '', artist: '' });
    };

    const handleChange = (event) => {
        
        setFormData({...formData, [event.target.name]: event.target.value });
    };

    return(
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Track Title:</label>
                <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="artist">Track Artist:</label>
                <input type="text" id="artist" name="artist" value={formData.artist} onChange={handleChange} required />
            </div>
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setIsFormOpen(false)}>Close Form</button>
        </form>
    );
};

export default TrackForm;
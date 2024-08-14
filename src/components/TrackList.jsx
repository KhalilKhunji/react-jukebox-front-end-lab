const TrackList = ({ tracks, edit, handleDeleteTrack }) => {
    return(
        <>
            <h2>TrackList</h2>
            <ul>
                {tracks.map((track) => (
                    <li key={track._id}>
                        <div>
                            {track.title} by {track.artist}
                        </div>
                        <div>
                            <button onClick={() => edit(track)}>Edit Track</button>
                            <button onClick={() => handleDeleteTrack(track._id)}>Delete Track</button>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default TrackList;
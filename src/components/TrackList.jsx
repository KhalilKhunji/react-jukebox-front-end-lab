const TrackList = ({ tracks }) => {
    return(
        <>
            <h2>TrackList</h2>
            <ul>
                {tracks.map((track) => (
                    <li key={track._id}>
                        {track.title} by {track.artist}
                    </li>
                ))}
            </ul>
        </>
    )
}

export default TrackList;
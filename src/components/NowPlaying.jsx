const NowPlaying = ({ currentTrack }) => {
    return(
        <>
            <h2>Now Playing:</h2>
            <h3>{currentTrack.title} by {currentTrack.artist}</h3>
        </>
    )
};

export default NowPlaying;
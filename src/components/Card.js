import React, { useContext, useEffect } from "react";
import { MusicContext } from "../Context";

function Card({ element }) {
  const musicContext = useContext(MusicContext);
  const likedMusic = musicContext.likedMusic;
  const setLikedMusic = musicContext.setLikedMusic;
  const pinnedMusic = musicContext.pinnedMusic;
  const setPinnedMusic = musicContext.setPinnedMusic;

  // Pin button handler
  const handlePin = () => {
    let pinnedMusic = JSON.parse(localStorage.getItem("pinnedMusic") || "[]");
    let updatedPinnedMusic = [];

    // Check if the song is already pinned
    if (pinnedMusic.some((item) => item.id === element.id)) {
      updatedPinnedMusic = pinnedMusic.filter((item) => item.id !== element.id);
      setPinnedMusic(updatedPinnedMusic);
      localStorage.setItem("pinnedMusic", JSON.stringify(updatedPinnedMusic));
    } else {
      // Limit pinning to 4 items
      if (pinnedMusic.length >= 4) {
        alert("You can only pin up to 4 songs.");
        return;
      }
      updatedPinnedMusic = [...pinnedMusic, element];
      setPinnedMusic(updatedPinnedMusic);
      localStorage.setItem("pinnedMusic", JSON.stringify(updatedPinnedMusic));
    }
  };

  // Like button handler
  const handleLike = () => {
    let likedMusic = JSON.parse(localStorage.getItem("likedMusic") || "[]");
    let updatedLikedMusic = [];

    // Check if the song is already liked
    if (likedMusic.some((item) => item.id === element.id)) {
      updatedLikedMusic = likedMusic.filter((item) => item.id !== element.id);
      setLikedMusic(updatedLikedMusic);
      localStorage.setItem("likedMusic", JSON.stringify(updatedLikedMusic));
    } else {
      updatedLikedMusic = [...likedMusic, element];
      setLikedMusic(updatedLikedMusic);
      localStorage.setItem("likedMusic", JSON.stringify(updatedLikedMusic));
    }
  };

  // Load liked music from local storage
  useEffect(() => {
    const localLikedMusic = JSON.parse(localStorage.getItem("likedMusic") || "[]");
    setLikedMusic(localLikedMusic);
  }, [setLikedMusic]);

  return (
    <div key={element.id} className="col-lg-3 col-md-6 py-2">
      <div className="card">
        <div className="ratio ratio-1x1 bg-secondary bg-opacity-25">
          <img
            // Safely access the image URL with optional chaining
            src={element?.album?.images?.[0]?.url || element?.images?.[0]?.url || 'default-image-url'}
            className="card-img-top"
            alt={element?.name || 'Unknown Track'} // Fallback text for missing name
          />
        </div>

        <div className="card-body">
          <h5 className="card-title d-flex justify-content-between">
            {element?.name || 'Unknown Track'} {/* Fallback for missing name */}
            <div className="add-options d-flex align-items-start">
              {/* Pin button */}
              {pinnedMusic.some((item) => item.id === element.id) ? (
                <button
                  onClick={handlePin}
                  className="btn btn-outline-dark mx-1"
                  title="Unpin this song"
                >
                  <i className="bi bi-pin-angle-fill"></i>
                </button>
              ) : (
                <button
                  onClick={handlePin}
                  className="btn btn-outline-dark mx-1"
                  title="Pin this song"
                >
                  <i className="bi bi-pin-angle"></i>
                </button>
              )}
              
              {/* Like button */}
              {likedMusic.some((item) => item.id === element.id) ? (
                <button onClick={handleLike} className="btn btn-outline-dark">
                  <i className="bi bi-heart-fill text-danger"></i>
                </button>
              ) : (
                <button onClick={handleLike} className="btn btn-outline-dark">
                  <i className="bi bi-heart"></i>
                </button>
              )}
            </div>
          </h5>
          {/* Safely access artist name and release date */}
          <p className="card-text">Artist: {element?.album?.artists?.[0]?.name || 'Unknown Artist'}</p>
          <p className="card-text">Release date: {element?.album?.release_date || 'Unknown Release Date'}</p>
          {/* Safely access preview URL */}
          <audio src={element?.preview_url || ''} controls className="w-100"></audio>
        </div>
      </div>
    </div>
  );
}

export default Card;

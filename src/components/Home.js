import React, { useContext, useEffect, useState, useCallback } from "react";
import Card from "./Card";
import CreatePlaylist from "./CreatePlaylist";
import { initializePlaylist } from "../initialize";
import Navbar from "./Navbar";
import { MusicContext } from "../Context";
import "./Home.css";

function Home() {
  const [keyword, setKeyword] = useState("");
  const [message, setMessage] = useState("");
  const [tracks, setTracks] = useState([]);
  const musicContext = useContext(MusicContext);
  const isLoading = musicContext.isLoading;
  const setIsLoading = musicContext.setIsLoading;
  const setLikedMusic = musicContext.setLikedMusic;
  const setPinnedMusic = musicContext.setPinnedMusic;
  const resultOffset = musicContext.resultOffset;
  const setResultOffset = musicContext.setResultOffset;

  // Function to fetch music data
  const fetchMusicData = useCallback(
    async (type = "track", category = "search", customKeyword = null) => {
      setTracks([]); // Clear the tracks before new fetch
      window.scrollTo(0, 0); // Scroll to top of page on new search
      setIsLoading(true); // Show loading spinner

      try {
        let url = "";

        // Define URL based on category (search, new releases, recently played)
        if (category === "search") {
          url = `https://v1.nocodeapi.com/hrishikesh600/spotify/HQcVQtbMUHNRXhAg/search?q=${customKeyword || keyword}&type=${type}`;
        } else if (category === "new-releases") {
          url = `https://v1.nocodeapi.com/hrishikesh600/spotify/HQcVQtbMUHNRXhAg/browse/new?country=ind`;
        } else if (category === "recently-played") {
          url = `https://v1.nocodeapi.com/hrishikesh600/spotify/HQcVQtbMUHNRXhAg/recentlyPlayed?limit=20`;
        }

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch music data");
        }

        const jsonData = await response.json();

        // Check the response for empty or undefined data
        if (category === "new-releases") {
          setTracks(jsonData.albums?.items || []); // Safe access with optional chaining
        } else if (category === "recently-played") {
          setTracks(jsonData.items?.map(item => item.track) || []); // Recently played has a different structure
        } else {
          setTracks(jsonData.tracks?.items || []); // Safe access with optional chaining
        }
      } catch (error) {
        setMessage(error.message);
      } finally {
        setIsLoading(false); // Hide loading spinner
      }
    },
    [keyword, resultOffset, setIsLoading]
  );

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setResultOffset(0); // Reset result offset when starting new search
      fetchMusicData();
    }
  };

  useEffect(() => {
    initializePlaylist();

    // Load liked and pinned music from local storage
    setLikedMusic(JSON.parse(localStorage.getItem("likedMusic")));
    setPinnedMusic(JSON.parse(localStorage.getItem("pinnedMusic")));

    // Fetch new releases on initial load
    fetchMusicData("album", "new-releases");
  }, [setIsLoading, setLikedMusic, setPinnedMusic, fetchMusicData]);

  return (
    <>
      <div className="animated-background"></div>
      <Navbar
        keyword={keyword}
        setKeyword={setKeyword}
        handleKeyPress={handleKeyPress}
        fetchMusicData={fetchMusicData}
      />
      <div className="container">
        <div className={`row ${isLoading ? "" : "d-none"}`}>
          <div className="col-12 py-5 text-center">
            <div
              className="spinner-border"
              style={{ width: "3rem", height: "3rem" }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
        <div className="row">
          {tracks.length > 0 ? (
            tracks.map((element) => {
              return <Card key={element.id} element={element} />;
            })
          ) : (
            <div className="col-12 text-center">
              <p>No tracks found</p>
            </div>
          )}
        </div>
        {tracks.length > 0 && (
          <div className="row">
            <div className="col">
              <button
                onClick={() => {
                  setResultOffset((previous) => previous - 20);
                  fetchMusicData();
                }}
                className="btn btn-outline-success w-100"
                disabled={resultOffset === 0}
              >
                Previous Page: {resultOffset / 20}
              </button>
            </div>
            <div className="col">
              <button
                onClick={() => {
                  setResultOffset((previous) => previous + 20);
                  fetchMusicData();
                }}
                className="btn btn-outline-success w-100"
              >
                Next Page: {resultOffset / 20 + 2}
              </button>
            </div>
          </div>
        )}
        {message && (
          <div className="row">
            <div className="col">
              <h4 className="text-center text-danger py-2">{message}</h4>
            </div>
          </div>
        )}
        <div className="row">
          <div className="col text-center">
            <button
              onClick={() => fetchMusicData("track", "recently-played")}
              className="btn btn-outline-info"
            >
              Recently Played
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-12 py-5 text-center">
            <h1>
              <i className="bi bi-music-note-list mx-3"></i>
              v-music
            </h1>
            <CreatePlaylist tracks={tracks} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

import React, { useState } from "react";

function CreatePlaylist() {
  const [playlistName, setPlaylistName] = useState("");

  const create = () => {
    let currentPlaylist = localStorage.getItem("allPlaylist");
    console.log("Before parsing:", currentPlaylist);

    if (currentPlaylist) {
      try {
        currentPlaylist = JSON.parse(currentPlaylist);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        currentPlaylist = {};
      }
    } else {
      currentPlaylist = {};
    }

    // Add the new playlist if it doesn't already exist
    if (!currentPlaylist[playlistName]) {
      currentPlaylist[playlistName] = [];
    }

    // Save the updated playlist object back to localStorage as a JSON string
    localStorage.setItem("allPlaylist", JSON.stringify(currentPlaylist));
    console.log("After creating playlist:", JSON.stringify(currentPlaylist));
  };

  return (
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="uniqueModalLabel">
            New Playlist
          </h1>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body">
          <input
            type="text"
            placeholder="Enter Name"
            className="form-control"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
          />
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cancel
          </button>
          <button onClick={create} type="button" className="btn btn-primary">
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePlaylist;

import React, { useState } from "react";

function App() {
  const [songName, setSongName] = useState("");
  const [songDetails, setSongDetails] = useState(null);
  const [error, setError] = useState("");

  const fetchSongDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/songs/${songName}`);
      if (!response.ok) {
        throw new Error("Song not found");
      }
      const data = await response.json();
      setSongDetails(data);
      setError("");
    } catch (err) {
      setSongDetails(null);
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Music Journal</h1>
      <input
        type="text"
        placeholder="Enter Song Name"
        value={songName}
        onChange={(e) => setSongName(e.target.value)}
        style={{ padding: "10px", width: "250px" }}
      />
      <button onClick={fetchSongDetails} style={{ marginLeft: "10px", padding: "10px" }}>
        Search
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {songDetails && (
        <div style={{ marginTop: "20px", textAlign: "left", display: "inline-block" }}>
          <p><strong>Music Director:</strong> {songDetails.musicDirector}</p>
          <p><strong>Hero:</strong> {songDetails.hero}</p>
          <p><strong>Heroine:</strong> {songDetails.heroine}</p>
          <p><strong>Genre:</strong> {songDetails.genre}</p>
          <p><strong>Year of Release:</strong> {songDetails.yearOfRelease}</p>
        </div>
      )}
    </div>
  );
}

export default App;

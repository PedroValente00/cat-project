import { FormEvent, useRef, useState } from "react";
import { Likes } from "./Likes";
const { v4: uuidv4 } = require("uuid");

export const Gallery = () => {
  const [showLikes, setShowLikes] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const api_key = process.env.REACT_APP_API_KEY;
    const url = `https://api.thecatapi.com/v1/images/search?&api_key=${api_key}`;
    const data = await fetch(url);
    const parsedData = await data.json();
    const parsedDataURL = parsedData[0].url;
    setImgUrl(parsedDataURL);
  };
  const handleLike = async () => {
    const img = image.current! as HTMLImageElement;

    try {
      fetch("/database", {
        method: "POST",
        body: JSON.stringify({ url: img.src, id: uuidv4() }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
    } catch (error) {
      console.error("caught unexpected error: ", error);
    }
  };
  const image = useRef(null);
  const toggleLikes = () => {
    setShowLikes(!showLikes);
  };
  return (
    <div>
      <h1>Get a random cat picture</h1>
      <form onSubmit={handleSubmit} action="" method="get">
        <p>
          <button type="submit">Cat me</button>
        </p>
        <p>
          <img src={imgUrl} alt="" ref={image} />
        </p>
      </form>
      {imgUrl.length ? (
        <p>
          <button onClick={handleLike}>
            <img
              className="like-button"
              src="https://cdn-icons-png.flaticon.com/512/28/28309.png"
              alt="like"
            />
          </button>
        </p>
      ) : (
        ""
      )}
      <div className="userPage" onClick={toggleLikes}>
        Your liked pictures
      </div>
      {showLikes ? <Likes /> : ""}
      {showLikes ? (
        <span className="closeLikes" onClick={toggleLikes}>
          close
        </span>
      ) : (
        ""
      )}
    </div>
  );
};

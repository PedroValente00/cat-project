import { Dispatch, useRef, useState } from "react";

type img = {
  src: string;
  id: any;
  alt: string;
  setCollection: Dispatch<string>;
  collection: any;
};
export const Image = ({ src, id, collection, setCollection }: img) => {
  const image = useRef(null);
  const [currImg, setCurrImg] = useState<any>(image);

  const handleDelete = async () => {
    const img = image.current! as HTMLImageElement;
    setCurrImg(img);
    try {
      fetch("/database", {
        method: "DELETE",
        body: JSON.stringify({ id: img.id }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      const remainingPictures = collection.filter(
        (picture: any) => picture.id !== img.id
      );
      setCollection(remainingPictures);
    } catch (error) {
      console.error("caught unexpected error: ", error);
    }
  };
  return (
    <>
      <img src={src} id={id} alt="" ref={image} onClick={handleDelete} />
    </>
  );
};

import { useEffect, useState } from "react";
import { Image } from "./Image";

export const Likes = () => {
  const [collection, setCollection] = useState<any>();

  useEffect(() => {
    fetch("/database")
      .then((data) => data.json())
      .then((results) => setCollection(results.data));
  }, []);

  return (
    <div className="likes">
      {collection
        ? collection.map((picture: any, i: number) => {
            return (
              <Image
                src={picture.url}
                key={i}
                id={picture.id}
                alt=""
                collection={collection}
                setCollection={setCollection}
              />
            );
          })
        : ""}
    </div>
  );
};

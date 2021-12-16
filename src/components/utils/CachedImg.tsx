import { useEffect, useRef } from "react";

type imgType = {
  src: string;
  alt: string;
  className?: string;
  style?: {};
  width?: number;
  height?: number;
};

const Img = (props: imgType) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const win: any = window;
  win._imageCache = win._imageCache || {};
  const cachedImage = win._imageCache[props.src];

  useEffect(() => {
    if (cachedImage) return (imgRef.current!.src = cachedImage);

    urlContentToDataUri(props.src).then((dataUri) => {
      if (imgRef.current === null) return null;
      win._imageCache[props.src] = dataUri as string;
      imgRef.current.src = dataUri as string;
    });
  }, [cachedImage, imgRef, props.src, win._imageCache]);

  return (
    <img
      src=""
      alt={props.alt}
      className={props.className}
      style={props.style}
      width={props.width}
      height={props.height}
      ref={imgRef}
    />
  );
};

function urlContentToDataUri(
  url: string,
  width: number = 640,
  quality: number = 75
) {
  return fetch(
    `/_next/image?url=${encodeURIComponent(url)}&w=${width}&q=${quality}`
  )
    .then((response) => {
      return response.blob();
    })
    .then(
      (blob) =>
        new Promise((callback) => {
          let reader = new FileReader();
          reader.onload = function () {
            callback(this.result);
          };
          reader.readAsDataURL(blob);
        })
    );
}

export default Img;

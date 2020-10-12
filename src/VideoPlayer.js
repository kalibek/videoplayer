import React from "react";
import {Player} from "video-react";
import "video-react/dist/video-react.css"; // import css

export function VideoPlayer({url}) {

  return <div>
    <Player
        playsInline
        src={url}
    />

    <div>
      <a href={url}>Direct link</a>
    </div>

  </div>;
}
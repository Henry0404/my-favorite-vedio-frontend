import React, { useState } from "react";
import { Video } from "./Video";
import * as VideoService from "./VideoService";
import VideoItem from "./videoItem";

const VideoList = () => {
  const [videos, setVideos] = React.useState<Video[]>([]);
  const loadVideos = async () => {
    const res = await VideoService.getVideos();
    const formatedVideos = res.data
      .map((video) => {
        return {
          ...video,
          createdAt: video.createdAt ? new Date(video.createdAt) : new Date(),
          updatedAt: video.updatedAt ? new Date(video.updatedAt) : new Date(),
        };
      })
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    setVideos(formatedVideos);
  };

  React.useEffect(() => {
    loadVideos();
  }, []);
  return (
    <div className="row">
      {videos.map((video) => {
        return (
          <VideoItem video={video} key={video._id} loadVideos={loadVideos} />
        );
      })}
    </div>
  );
};

export default VideoList;

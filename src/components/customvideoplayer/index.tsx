import React, { useRef, useState, useEffect } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { FiPauseCircle } from "react-icons/fi";
import { CgMaximize } from "react-icons/cg";
import { AiOutlineFullscreenExit } from "react-icons/ai";
import { MdSubtitlesOff } from "react-icons/md";
import { MdOutlineSubtitles } from "react-icons/md";
import { FiVolume1 } from "react-icons/fi";
import { FiVolumeX } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
const CustomVideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(true);
  const [subtitleIndex, setSubtitleIndex] = useState(-1);
  const [mute, setMute] = useState(true);
  const [settingBtn, setSettingBtn] = useState(false);
  const [videoSpeedgBtn, setVideoSpeedgBtn] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const customSubtitles = [
    { start: 0, end: 5, text: "DummySubtitle 1" },
    { start: 6, end: 10, text: "Subtitle 2" },
  ];

  const handleControl = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration);

      // Check for subtitle display
      const currentSubtitle = customSubtitles.find(
        (subtitle) =>
          currentTime >= subtitle.start && currentTime <= subtitle.end
      );
      if (currentSubtitle) {
        setSubtitleIndex(customSubtitles.indexOf(currentSubtitle));
      } else {
        setSubtitleIndex(-1);
      }
    }
    setVideoSpeedgBtn(!videoSpeedgBtn);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener("timeupdate", handleTimeUpdate);
    }
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, []);

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newTime = parseFloat(event.target.value);
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };
  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!isFullscreen) {
        if (videoRef.current.requestFullscreen) {
          videoRef.current.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document?.exitFullscreen();
        }
      }
      setIsFullscreen(!isFullscreen);
    }
  };

  const formatTime = (timeInSeconds: any) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    return `${hours}:${String(minutes)}:${String(seconds)}`;
  };

  const toggleSubtitles = () => {
    setSubtitlesEnabled(!subtitlesEnabled);
  };
  const handleMute = () => {
    setMute(!mute);
  };
  const handleSetting = () => {
    setSettingBtn(!settingBtn);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener("timeupdate", handleTimeUpdate);
      videoRef.current.playbackRate = playbackRate;
    }
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [playbackRate]);

  return (
    <div>
      <h1>Custom video player</h1>

      <div className="player">
        <div className="videoWrapper">
          <video ref={videoRef}>
            <source src="https://player.vimeo.com/external/194837908.sd.mp4?s=c350076905b78c67f74d7ee39fdb4fef01d12420&profile_id=164" />
          </video>
        </div>
        <div className="wrappControls">
          {subtitlesEnabled && subtitleIndex !== -1 && (
            <div className="subtitle">
              {customSubtitles[subtitleIndex].text}
            </div>
          )}
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            step={0.1}
            className="video-range"
            onChange={handleSeek}
          />
          <div className="leftWrapper">
            <button className="controlBtn" onClick={handleControl}>
              {isPlaying ? <FiPauseCircle /> : <AiFillPlayCircle />}
            </button>
            <div className="timeWrapp">
              <div className="current-time">{formatTime(currentTime)} / </div>
              <div className="total-time">{formatTime(duration)}</div>
            </div>
            <div className="volumeWrapper">
              <button className="controlBtn" onClick={() => handleMute()}>
                {volume === 0 ? <FiVolumeX /> : <FiVolume1 />}
              </button>

              <input
                type="range"
                min={0}
                max={1}
                value={volume}
                step={0.01}
                onChange={handleVolumeChange}
              />
            </div>
          </div>
          <div className="rightWrapper">
            <button
              className={`controlBtn ${settingBtn ? "showModal" : ""}`}
              onClick={handleSetting}
            >
              {<IoSettingsOutline />}
              <div
                className={`playbackRateWrapper ${
                  settingBtn ? "showSpeedBtn" : ""
                }`}
                onClick={handleSetting}
              >
                <button
                  className={`controlBtn ${
                    playbackRate === 0.5 ? "activeSpeed" : ""
                  }`}
                  onClick={() => setPlaybackRate(0.5)} // Set playback rate to 0.5x (half speed).
                >
                  0.5
                </button>
                <button
                  className={`controlBtn ${
                    playbackRate === 1 ? "activeSpeed" : ""
                  }`}
                  onClick={() => setPlaybackRate(1)} // Set playback rate to 1x (normal speed).
                >
                  1 Normal
                </button>
                <button
                  className={`controlBtn ${
                    playbackRate === 1.5 ? "activeSpeed" : ""
                  }`}
                  onClick={() => setPlaybackRate(1.5)} // Set playback rate to 1.5x (1.5 times speed).
                >
                  1.5
                </button>
                <button
                  className={`controlBtn ${
                    playbackRate === 2 ? "activeSpeed" : ""
                  }`}
                  onClick={() => setPlaybackRate(2)} // Set playback rate to 1.5x (2 times speed).
                >
                  2
                </button>
              </div>
            </button>
            <button
              className="controlBtn subtitleBtn"
              onClick={toggleSubtitles}
            >
              {subtitlesEnabled ? <MdSubtitlesOff /> : <MdOutlineSubtitles />}
            </button>
            <button className="controlBtn" onClick={toggleFullscreen}>
              {isFullscreen ? <AiOutlineFullscreenExit /> : <CgMaximize />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomVideoPlayer;

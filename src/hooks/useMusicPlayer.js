import { useCallback, useEffect, useRef } from 'react';
import { MUSIC_VOLUME } from '../data/config';

function getYouTubeId(url) {
  if (!url) return null;
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
}

export function useMusicPlayer(musicUrl) {
  const audioRef = useRef(null);
  const ytRef = useRef(null);
  const youtubeId = getYouTubeId(musicUrl);
  const isYouTube = !!youtubeId;
  const youTubeEmbedSrc = isYouTube
    ? `https://www.youtube.com/embed/${youtubeId}?enablejsapi=1&playsinline=1&loop=1&playlist=${youtubeId}`
    : '';
  const musicSrc = isYouTube ? '' : musicUrl || '';

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.volume = MUSIC_VOLUME;
    if (musicSrc && el.getAttribute('src') !== musicSrc) {
      el.src = musicSrc;
    } else if (!musicSrc && el.getAttribute('src')) {
      el.removeAttribute('src');
    }
  }, [musicSrc]);

  const postYT = useCallback((func, args = []) => {
    const win = ytRef.current && ytRef.current.contentWindow;
    if (win) win.postMessage(JSON.stringify({ event: 'command', func, args }), '*');
  }, []);

  const handleIframeLoad = useCallback(() => {
    postYT('setVolume', [MUSIC_VOLUME * 100]);
  }, [postYT]);

  const play = useCallback(() => {
    if (isYouTube) {
      postYT('setVolume', [MUSIC_VOLUME * 100]);
      postYT('playVideo');
    } else if (audioRef.current) {
      audioRef.current.volume = MUSIC_VOLUME;
      audioRef.current.play().catch(() => {});
    }
  }, [isYouTube, postYT]);

  const pause = useCallback(() => {
    if (isYouTube) postYT('pauseVideo');
    else if (audioRef.current) audioRef.current.pause();
  }, [isYouTube, postYT]);

  return { audioRef, ytRef, isYouTube, youTubeEmbedSrc, play, pause, handleIframeLoad };
}

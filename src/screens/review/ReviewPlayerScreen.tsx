import React, { useRef, useState } from 'react';
import { BackButton } from '../../components/BackButton';
import type { Review } from '../../types/review';

interface ReviewPlayerScreenProps {
  review: Review;
  onNavigate: (screen: string) => void;
}

export const ReviewPlayerScreen: React.FC<ReviewPlayerScreenProps> = ({ review, onNavigate }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playbackRate, setPlaybackRate] = useState(1);

  const changeRate = (rate: number) => {
    setPlaybackRate(rate);
    if (videoRef.current) videoRef.current.playbackRate = rate;
  };

  return (
    <div className="relative max-w-[430px] mx-auto w-full h-[100dvh] bg-black overflow-hidden">
      {/* ヘッダー */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 z-20">
        <BackButton onClick={() => onNavigate('review-detail')} />
        <h1 className="text-white text-lg font-medium">動画再生</h1>
        <div className="w-10" />
      </div>

      {/* ▼ 動画ビューポート：ヘッダー(≈56px)とフッターボタン領域(≈112px)を差し引いて確保 */}
      <div className="absolute left-0 right-0 top-14 bottom-28 z-10 flex items-center justify-center px-4">
        <video
          ref={videoRef}
          src={review.videoUrl}
          poster={review.thumbUrl}
          controls
          playsInline
          /* 重要: コンテナいっぱいに“切り抜きなし”で最大化 */
          className="rounded-xl bg-black shadow-lg max-h-full max-w-full w-auto h-auto object-contain"
        />
      </div>

      {/* 速度ボタン */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-4 z-20">
        {[0.25, 0.5, 1].map((r) => (
          <button
            key={r}
            onClick={() => changeRate(r)}
            className={`px-4 py-2 rounded-md font-medium text-sm ${
              playbackRate === r ? 'bg-purple-600 text-white' : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            ×{r}
          </button>
        ))}
      </div>
    </div>
  );
};

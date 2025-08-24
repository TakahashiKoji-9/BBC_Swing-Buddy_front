import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface Props {
  onNavigate: (screen: string, params?: any) => void;
  onSaveDraft: (draft: { problems: string[]; note: string }) => void;
}

const PROBLEMS = [
  'スライス','フック','トップ','ダフリ',
  '飛距離不足','方向性','弾道の高さ',
  'スピン量','リズム','ミート率'
];

export const RequestProblemScreen: React.FC<Props> = ({ onNavigate, onSaveDraft }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [note, setNote] = useState('');

  const toggle = (p: string) => {
    if (selected.includes(p)) {
      setSelected(selected.filter((x) => x !== p));
    } else if (selected.length < 2) {
      setSelected([...selected, p]);
    }
  };

  const handleNext = () => {
    if (selected.length > 0) {
      onSaveDraft({ problems: selected, note });
      onNavigate('request-confirm');
    }
  };

  return (
    <div className="max-w-[430px] mx-auto min-h-100dvh h-100dvh shadow-2xl rounded-[28px] overflow-hidden relative">
      {/* 背景（Club と同じ） */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/bg.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500 via-purple-600 to-pink-500 opacity-90" />
      </div>

      {/* コンテンツ */}
      <div className="relative z-10 flex flex-col min-h-100dvh h-100dvh pl-safe pr-safe">
        {/* ヘッダー */}
        <div className="flex items-center justify-between pt-4 pb-6 px-4">
          <button onClick={() => onNavigate('request-club')}>
            <ArrowLeft size={24} color="white" />
          </button>
          <h1 className="text-white text-3xl font-light" style={{ fontFamily: 'cursive' }}>
            Problem
          </h1>
          <div className="w-6" />
        </div>

        {/* 注意書き */}
        <p className="text-white/90 text-xs mb-4 px-4">
          ※最大２つまで選択できます
        </p>

        {/* 課題選択エリア */}
        <div className="flex-1 px-6">
          <div className="grid grid-cols-3 gap-x-3 gap-y-4 justify-items-center mb-8">
            {PROBLEMS.map((p) => {
              const isActive = selected.includes(p);
              const atLimit = !isActive && selected.length >= 2;
              return (
                <button
                  key={p}
                  onClick={() => toggle(p)}
                  disabled={atLimit}
                  aria-pressed={isActive}
                  className={[
                    'px-4 py-2 h-11 min-w-[100px]',
                    'rounded-full text-[14px] font-medium transition-all duration-200',
                    isActive
                      ? 'bg-white text-purple-600 shadow-lg'
                      : atLimit
                        ? 'bg-purple-500/40 text-white/70 cursor-not-allowed'
                        : 'bg-purple-500/80 text-white border border-purple-400/50 hover:bg-purple-500/90 hover:scale-105'
                  ].join(' ')}
                >
                  {p}
                </button>
              );
            })}
          </div>

          {/* 自由記入 */}
          <div className="mb-8">
            <h2 className="text-white mb-2">自由記入（任意）</h2>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="その他あれば記入してください"
              className="w-full min-h-[120px] bg-white/20 rounded-2xl text-white p-4 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/60"
            />
          </div>
        </div>

        {/* 次へボタン */}
        <div className="sticky bottom-0 px-6 pb-6 pt-4 bg-transparent">
          <button
            onClick={handleNext}
            disabled={selected.length === 0}
            className={`w-full h-[54px] rounded-full font-medium transition-all duration-200 ${
              selected.length > 0
                ? 'bg-white text-purple-600 shadow-lg hover:shadow-xl active:scale-95'
                : 'bg-white/70 text-purple-600 opacity-60 cursor-not-allowed'
            }`}
          >
            次へ
          </button>
        </div>
      </div>
    </div>
  );
};

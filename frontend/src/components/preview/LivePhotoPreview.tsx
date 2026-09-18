import React from 'react';
import { Image as ImageIcon, Camera, X } from 'lucide-react';
import type { PhotoItem } from '../../types';

interface LivePhotoPreviewProps {
  photos: PhotoItem[];
  onRemovePhoto: (id: string) => void;
  maxPhotos?: number;
}

export const LivePhotoPreview: React.FC<LivePhotoPreviewProps> = ({
  photos,
  onRemovePhoto,
  maxPhotos = 5,
}) => {
  const slots = Array.from({ length: maxPhotos }, (_, index) => {
    return photos[index] || null;
  });

  return (
    <div className="bg-[#091e1c] border border-[#0f342f] rounded-2xl p-4 md:p-5 shadow-xl shadow-black/20 text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-emerald-400" />
          <h3 className="font-semibold text-xs md:text-sm text-slate-100">
            Live Photo Preview
          </h3>
        </div>

        <div className="bg-[#0e332d] text-emerald-300 border border-emerald-500/30 text-[11px] font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
          <span>{photos.length}/{maxPhotos} photos</span>
        </div>
      </div>

      {/* 5 Slots Grid */}
      <div className="grid grid-cols-5 gap-2 md:gap-3">
        {slots.map((photo, index) => (
          <div key={index} className="flex flex-col items-center">
            {photo ? (
              <div className="relative group w-full aspect-square rounded-xl overflow-hidden border-2 border-emerald-500/60 shadow-md bg-slate-900">
                <img
                  src={photo.url}
                  alt={photo.name || `Photo ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => onRemovePhoto(photo.id)}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/80 hover:bg-rose-600 text-white flex items-center justify-center shadow transition-colors"
                  title="Remove Photo"
                  aria-label={`Remove photo ${index + 1}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <div className="w-full aspect-square rounded-xl border border-dashed border-[#1a4b44] bg-[#071816]/70 flex items-center justify-center text-slate-500 hover:border-emerald-500/40 transition-colors">
                <Camera className="w-4 h-4 text-slate-500" />
              </div>
            )}
            <span className="text-[10px] md:text-[11px] text-slate-400 mt-1.5 font-medium">
              Photo {index + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

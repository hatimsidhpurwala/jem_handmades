import { shades, type Shade, type Finish } from '@/data/shades';
import { useState } from 'react';

interface ShadeSelectorProps {
  selectedShade: Shade;
  onSelectShade: (shade: Shade) => void;
  opacity: number;
  onOpacityChange: (v: number) => void;
  finish: Finish;
  onFinishChange: (f: Finish) => void;
}

const finishes: Finish[] = ['matte', 'glossy', 'satin'];

export default function ShadeSelector({
  selectedShade, onSelectShade, opacity, onOpacityChange, finish, onFinishChange
}: ShadeSelectorProps) {
  const [hoveredShade, setHoveredShade] = useState<string | null>(null);

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="font-heading text-lg font-semibold text-card-foreground">Select Shade</h3>

      <div className="mt-3 grid grid-cols-4 gap-3">
        {shades.map(s => (
          <button
            key={s.id}
            onClick={() => onSelectShade(s)}
            onMouseEnter={() => setHoveredShade(s.id)}
            onMouseLeave={() => setHoveredShade(null)}
            className="group relative flex flex-col items-center gap-1"
            title={s.name}
          >
            <div
              className={`h-10 w-10 rounded-full border-2 transition-all ${
                selectedShade.id === s.id
                  ? 'border-accent ring-2 ring-accent/30 scale-110'
                  : 'border-border hover:scale-105'
              }`}
              style={{ backgroundColor: s.hex }}
            />
            {(hoveredShade === s.id || selectedShade.id === s.id) && (
              <span className="text-[10px] text-muted-foreground font-medium">{s.name}</span>
            )}
          </button>
        ))}
      </div>

      <div className="mt-5">
        <label className="text-sm font-medium text-card-foreground">
          Intensity: {Math.round(opacity * 100)}%
        </label>
        <input
          type="range"
          min={0.3}
          max={1}
          step={0.05}
          value={opacity}
          onChange={e => onOpacityChange(parseFloat(e.target.value))}
          className="mt-1 w-full accent-accent"
        />
      </div>

      <div className="mt-4">
        <label className="text-sm font-medium text-card-foreground">Finish</label>
        <div className="mt-2 flex gap-2">
          {finishes.map(f => (
            <button
              key={f}
              onClick={() => onFinishChange(f)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                finish === f
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

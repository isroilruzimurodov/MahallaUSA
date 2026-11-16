// The trail of small diamonds from the lower left of the MahallaUSA logo.
const colours = ["#B01C24", "#2E8B57", "#1F6A9A", "#E3B04B", "#006E7D"];

export default function Diamonds({ className = "", size = 14, gap = 10 }: { className?: string; size?: number; gap?: number }) {
  const step = size + gap;
  const w = step * colours.length;
  return (
    <svg aria-hidden="true" width={w} height={size * 1.5} viewBox={`0 0 ${w} ${size * 1.5}`} className={className}>
      {colours.map((c, i) => {
        const cx = i * step + size / 2 + 2;
        const cy = size * 0.75;
        return <rect key={c} x={cx - size / 2.8} y={cy - size / 2.8} width={size / 1.4} height={size / 1.4} fill={c} transform={`rotate(45 ${cx} ${cy})`} />;
      })}
    </svg>
  );
}

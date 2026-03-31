import { PanelCard } from '../PanelCard';

export function ChartContainer({ title, subtitle, children, className }) {
  return (
    <PanelCard title={title} subtitle={subtitle} className={className}>
      <div className="h-[320px] w-full">{children}</div>
    </PanelCard>
  );
}

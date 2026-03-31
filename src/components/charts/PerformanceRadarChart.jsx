import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts';
import { performanceRadar } from '../../data/mockData';
import { ChartContainer } from './ChartContainer';

export function PerformanceRadarChart() {
  return (
    <ChartContainer
      title="Operational readiness radar"
      subtitle="Conservation system readiness across critical mission dimensions"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={performanceRadar} outerRadius="72%">
          <PolarGrid stroke="rgba(255,255,255,0.1)" />
          <PolarAngleAxis dataKey="metric" tick={{ fill: 'rgba(255,255,255,0.55)', fontSize: 12 }} />
          <Radar dataKey="score" stroke="#c0ff7b" fill="#c0ff7b" fillOpacity={0.28} strokeWidth={2} />
        </RadarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

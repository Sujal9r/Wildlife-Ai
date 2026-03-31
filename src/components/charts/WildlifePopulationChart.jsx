import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { wildlifePopulationData } from '../../data/mockData';
import { ChartContainer } from './ChartContainer';

export function WildlifePopulationChart() {
  return (
    <ChartContainer
      title="Wildlife population trends"
      subtitle="Quarterly protected-species monitoring across key habitats"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={wildlifePopulationData}>
          <defs>
            <linearGradient id="tigerFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#c0ff7b" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#c0ff7b" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="elephantFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4fa07d" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#4fa07d" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
          <XAxis dataKey="month" stroke="rgba(255,255,255,0.45)" tickLine={false} axisLine={false} />
          <YAxis stroke="rgba(255,255,255,0.45)" tickLine={false} axisLine={false} />
          <Tooltip contentStyle={{ background: '#102019', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }} />
          <Area type="monotone" dataKey="Tiger" stroke="#c0ff7b" fill="url(#tigerFill)" strokeWidth={3} />
          <Area type="monotone" dataKey="Elephant" stroke="#4fa07d" fill="url(#elephantFill)" strokeWidth={3} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

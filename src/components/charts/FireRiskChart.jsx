import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { fireRiskData } from '../../data/mockData';
import { ChartContainer } from './ChartContainer';

export function FireRiskChart() {
  return (
    <ChartContainer
      title="Forest fire risk"
      subtitle="Zone-wise fire probability and reported incident clusters"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={fireRiskData}>
          <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
          <XAxis dataKey="zone" stroke="rgba(255,255,255,0.45)" tickLine={false} axisLine={false} />
          <YAxis stroke="rgba(255,255,255,0.45)" tickLine={false} axisLine={false} />
          <Tooltip contentStyle={{ background: '#102019', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }} />
          <Bar dataKey="risk" fill="#f3b562" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

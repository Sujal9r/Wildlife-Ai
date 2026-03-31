import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { reportsOverview } from '../../data/mockData';
import { ChartContainer } from './ChartContainer';

export function ReportsPerformanceChart() {
  return (
    <ChartContainer
      title="Protected area performance"
      subtitle="Monthly comparison of wildlife count trend and patrol coverage"
    >
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={reportsOverview}>
          <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
          <XAxis dataKey="month" stroke="rgba(255,255,255,0.45)" tickLine={false} axisLine={false} />
          <YAxis stroke="rgba(255,255,255,0.45)" tickLine={false} axisLine={false} />
          <Tooltip contentStyle={{ background: '#102019', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }} />
          <Bar dataKey="alerts" fill="#f3b562" radius={[10, 10, 0, 0]} />
          <Line type="monotone" dataKey="patrolCoverage" stroke="#c0ff7b" strokeWidth={3} dot={false} />
          <Line type="monotone" dataKey="performance" stroke="#4fa07d" strokeWidth={3} dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

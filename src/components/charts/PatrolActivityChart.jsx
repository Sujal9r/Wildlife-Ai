import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { rangerPatrolActivity } from '../../data/mockData';
import { ChartContainer } from './ChartContainer';

export function PatrolActivityChart() {
  return (
    <ChartContainer
      title="Ranger patrol activity"
      subtitle="Coverage percentage and incident response across the week"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={rangerPatrolActivity}>
          <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
          <XAxis dataKey="day" stroke="rgba(255,255,255,0.45)" tickLine={false} axisLine={false} />
          <YAxis stroke="rgba(255,255,255,0.45)" tickLine={false} axisLine={false} />
          <Tooltip contentStyle={{ background: '#102019', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }} />
          <Legend />
          <Line type="monotone" dataKey="coverage" stroke="#c0ff7b" strokeWidth={3} dot={false} />
          <Line type="monotone" dataKey="incidents" stroke="#fb7185" strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

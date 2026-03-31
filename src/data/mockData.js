export const appMeta = {
  name: 'Forestra',
  tagline: 'Protecting Wildlife with Modern Technology',
  description:
    'A premium wildlife and forest protection interface that shows how ranger coordination, drones, camera traps, and predictive alerts can support conservation operations.',
};

export const authRoles = [
  {
    id: 'admin',
    label: 'Admin',
    description: 'Full command view for protected areas, alerts, analytics, and operational oversight.',
    accent: 'text-moss',
  },
  {
    id: 'ranger',
    label: 'Ranger',
    description: 'Field operations access for patrol teams, incident response, and on-ground updates.',
    accent: 'text-cyan-300',
  },
  {
    id: 'analyst',
    label: 'Analyst',
    description: 'Insights-focused workspace for wildlife trends, reporting, and risk assessment.',
    accent: 'text-amber-300',
  },
];

export const demoAccounts = [
  {
    id: 'demo-admin',
    name: 'Aanya Sharma',
    email: 'admin@forestra.demo',
    password: 'admin123',
    role: 'admin',
    title: 'Forest Admin',
    region: 'National Command Center',
  },
  {
    id: 'demo-ranger',
    name: 'Ravi Singh',
    email: 'ranger@forestra.demo',
    password: 'ranger123',
    role: 'ranger',
    title: 'Patrol Ranger',
    region: 'Central Tiger Corridor',
  },
  {
    id: 'demo-analyst',
    name: 'Meera Das',
    email: 'analyst@forestra.demo',
    password: 'analyst123',
    role: 'analyst',
    title: 'Wildlife Analyst',
    region: 'Conservation Intelligence Desk',
  },
];

export const forestStats = [
  { label: 'Total Forest Zones', value: 128, change: '+6.4%', tone: 'emerald' },
  { label: 'Protected Areas', value: 36, change: '+3 new', tone: 'amber' },
  { label: 'Endangered Species', value: 18, change: 'Under watch', tone: 'rose' },
  { label: 'Active Rangers', value: 412, change: '+24 on duty', tone: 'cyan' },
  { label: 'Active Drones', value: 67, change: '91% uptime', tone: 'violet' },
  { label: 'Camera Traps Installed', value: 1248, change: '+112 this quarter', tone: 'lime' },
];

export const dashboardHighlights = [
  { title: 'Threat detection network', value: '24/7', detail: 'Camera traps, ranger radios, and drone sweeps linked into one mock control room.' },
  { title: 'Wildlife corridor visibility', value: '92%', detail: 'Protected route coverage across tiger, elephant, and leopard movement belts.' },
  { title: 'Response readiness', value: '18 mins', detail: 'Average mock dispatch time from alert creation to nearest ranger assignment.' },
];

export const liveAnimalFeed = [
  {
    id: 'live-tiger',
    name: 'Bengal Tiger',
    image:
      'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1200&q=80',
    liveCount: 12,
    zone: 'Central Tiger Corridor',
    source: 'Camera trap cluster A7',
    lastSeen: '2 mins ago',
    status: 'Active',
  },
  {
    id: 'live-elephant',
    name: 'Asian Elephant',
    image:
      'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1200&q=80',
    liveCount: 24,
    zone: 'Eastern Wetland Passage',
    source: 'GPS herd tracker',
    lastSeen: '5 mins ago',
    status: 'Migrating',
  },
  {
    id: 'live-leopard',
    name: 'Indian Leopard',
    image:
      'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?auto=format&fit=crop&w=1200&q=80',
    liveCount: 7,
    zone: 'Rocky Foothill Sector',
    source: 'Night vision drone relay',
    lastSeen: '9 mins ago',
    status: 'Watchlist',
  },
  {
    id: 'live-deer',
    name: 'Spotted Deer',
    image:
      'https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=1200&q=80',
    liveCount: 58,
    zone: 'Open Meadow Blocks',
    source: 'Habitat observation grid',
    lastSeen: '1 min ago',
    status: 'Healthy',
  },
];

export const wildlifeSpecies = [
  {
    id: 1,
    name: 'Bengal Tiger',
    count: 186,
    status: 'Stable',
    tracking: 'GPS Collar + Camera Trap',
    zone: 'Central Tiger Corridor',
    cameraActivity: '18 verified sightings this week',
    health: 82,
    movementLogs: ['05:10 - crossed river edge near Zone C4', '11:40 - camera trap triggered at bamboo ridge', '19:15 - resting cluster detected close to patrol lane'],
  },
  {
    id: 2,
    name: 'Indian Leopard',
    count: 94,
    status: 'Watchlist',
    tracking: 'Thermal Drone + Camera Trap',
    zone: 'Rocky Foothill Sector',
    cameraActivity: '9 night detections in last 72 hours',
    health: 68,
    movementLogs: ['21:10 - village-edge route flagged', '01:25 - hillside camera detected movement', '03:55 - patrol unit verified no conflict event'],
  },
  {
    id: 3,
    name: 'Asian Elephant',
    count: 132,
    status: 'Seasonal Migration',
    tracking: 'GPS Herd Tagging',
    zone: 'Eastern Wetland Passage',
    cameraActivity: 'Herd moved through 3 monitoring points',
    health: 77,
    movementLogs: ['06:20 - herd entered marsh corridor', '12:50 - water source activity detected', '17:05 - movement shifted toward dense canopy'],
  },
  {
    id: 4,
    name: 'Spotted Deer',
    count: 420,
    status: 'Healthy',
    tracking: 'Habitat Sampling',
    zone: 'Open Meadow Blocks',
    cameraActivity: 'High daylight activity',
    health: 88,
    movementLogs: ['07:15 - grazing cluster observed', '14:00 - northern grass patch occupancy high', '18:45 - prey density updated for predator model'],
  },
  {
    id: 5,
    name: 'Sloth Bear',
    count: 46,
    status: 'Sensitive',
    tracking: 'Ranger Reports + Trap Alerts',
    zone: 'Dry Forest Fringe',
    cameraActivity: '4 den-side events this week',
    health: 64,
    movementLogs: ['04:55 - fruiting patch activity logged', '20:18 - rocky den route revisited', '23:10 - patrol team noted quiet movement trail'],
  },
];

export const alertTypes = ['All', 'Forest Fire', 'Illegal Logging', 'Poaching Risk', 'Animal Near Village'];

export const alerts = [
  {
    id: 'AL-402',
    title: 'Smoke plume detected near teak line',
    type: 'Forest Fire',
    severity: 'High',
    location: 'South Canopy Block',
    timestamp: '08:42 AM',
    source: 'Drone thermal scan',
    status: 'Dispatch active',
  },
  {
    id: 'AL-403',
    title: 'Chainsaw acoustic signature identified',
    type: 'Illegal Logging',
    severity: 'Medium',
    location: 'Buffer Zone 3',
    timestamp: '09:15 AM',
    source: 'Audio sensor node',
    status: 'Under verification',
  },
  {
    id: 'AL-404',
    title: 'Unusual bait pattern near water trail',
    type: 'Poaching Risk',
    severity: 'High',
    location: 'River Crossing B2',
    timestamp: '10:08 AM',
    source: 'Field intelligence report',
    status: 'Escalated',
  },
  {
    id: 'AL-405',
    title: 'Elephant herd approaching village edge',
    type: 'Animal Near Village',
    severity: 'Medium',
    location: 'Madhupur Settlement',
    timestamp: '11:21 AM',
    source: 'GPS herd tracker',
    status: 'Community warning sent',
  },
  {
    id: 'AL-406',
    title: 'Heat cluster in dry scrub patch',
    type: 'Forest Fire',
    severity: 'Low',
    location: 'Scrubland Sector 7',
    timestamp: '12:05 PM',
    source: 'Satellite risk model',
    status: 'Monitoring',
  },
  {
    id: 'AL-407',
    title: 'Suspicious vehicle halt inside patrol lane',
    type: 'Poaching Risk',
    severity: 'High',
    location: 'Checkpoint Delta',
    timestamp: '01:32 PM',
    source: 'Ranger checkpoint log',
    status: 'Interception team deployed',
  },
];

export const protectedZones = [
  {
    id: 'PA-11',
    name: 'Sariska Tiger Reserve',
    state: 'Rajasthan',
    status: 'Operationally Secure',
    riskLevel: 'Medium',
    assignedOfficers: 18,
    progress: 76,
    area: '881 sq km',
    focus: 'Tiger recovery and corridor surveillance',
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56721.40364022643!2d76.36887885820312!3d27.3104429!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396d7fad54382e5d%3A0x4860ac432e594e26!2sSariska%20Tiger%20Reserve!5e0!3m2!1sen!2sin!4v1774974614902!5m2!1sen!2sin',
  },
  {
    id: 'PA-12',
    name: 'Kaziranga National Park',
    state: 'Assam',
    status: 'Flood Response Ready',
    riskLevel: 'High',
    assignedOfficers: 26,
    progress: 84,
    area: '430 sq km',
    focus: 'Rhino conservation and wetland resilience',
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114115.97555111827!2d93.21241011640622!3d26.644504400000013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3744412d379f65df%3A0x8b2b74b6e7c99458!2sKaziranga%20National%20Park!5e0!3m2!1sen!2sin!4v1774974691428!5m2!1sen!2sin',
  },
  {
    id: 'PA-13',
    name: 'Bandhavgarh National Park',
    state: 'Madhya Pradesh',
    status: 'Habitat Surveillance Active',
    riskLevel: 'Medium',
    assignedOfficers: 15,
    progress: 71,
    area: '1536 sq km',
    focus: 'Tiger landscape monitoring and buffer protection',
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116969.48747776699!2d80.85299745793792!3d23.6295509733504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3986a5ee3c6959b7%3A0x600191e348ba2f44!2sBandhavgarh%20National%20Park!5e0!3m2!1sen!2sin!4v1774975002290!5m2!1sen!2sin',
  },
  {
    id: 'PA-14',
    name: 'Jim Corbett National Park',
    state: 'Uttarakhand',
    status: 'Patrol Grid Optimized',
    riskLevel: 'Low',
    assignedOfficers: 20,
    progress: 89,
    area: '1318 sq km',
    focus: 'Patrol mobility and tiger habitat protection',
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3470.7712595812122!2d78.87833978410386!3d29.55215501116607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390a24ffffffffff%3A0x3017b72d3d253fd7!2sJim%20Corbett%20National%20Park!5e0!3m2!1sen!2sin!4v1774974813026!5m2!1sen!2sin',
  },
  {
    id: 'PA-15',
    name: 'Sundarbans National Park',
    state: 'West Bengal',
    status: 'Tidal Zone Monitoring',
    riskLevel: 'High',
    assignedOfficers: 22,
    progress: 67,
    area: '1330 sq km',
    focus: 'Mangrove ecosystem and estuarine tiger monitoring',
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3702.3074012380575!2d88.8828015755122!3d21.884235379987945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a018264f05cd269%3A0xe99cba5218a4be78!2sSundarbans%20National%20Park!5e0!3m2!1sen!2sin!4v1774974760793!5m2!1sen!2sin',
  },
  {
    id: 'PA-16',
    name: 'Nahargarh Biological Park',
    state: 'Rajasthan',
    status: 'Education and Rescue Ready',
    riskLevel: 'Low',
    assignedOfficers: 9,
    progress: 81,
    area: '7.2 sq km',
    focus: 'Urban-edge biodiversity education and rescue support',
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56871.14199858473!2d75.7944252582031!3d27.016057499999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db0219a4fbceb%3A0xb4d2669f0e9ff538!2sNahargarh%20Biological%20Park!5e0!3m2!1sen!2sin!4v1774974634445!5m2!1sen!2sin',
  },
];

export const rangers = [
  {
    id: 'RG-101',
    name: 'Aarav Singh',
    zone: 'Central Tiger Corridor',
    status: 'On Patrol',
    shift: '06:00 - 14:00',
    lastActivity: 'Drone relay verified near Zone C4',
    patrolScore: 92,
  },
  {
    id: 'RG-102',
    name: 'Meera Joseph',
    zone: 'Wetland Protection Belt',
    status: 'In Transit',
    shift: '08:00 - 16:00',
    lastActivity: 'Elephant movement advisory issued',
    patrolScore: 84,
  },
  {
    id: 'RG-103',
    name: 'Ravi Chouhan',
    zone: 'Buffer Zone 3',
    status: 'Responding',
    shift: '10:00 - 18:00',
    lastActivity: 'Illegal logging sensor alert acknowledged',
    patrolScore: 88,
  },
  {
    id: 'RG-104',
    name: 'Nisha Thapa',
    zone: 'River Patrol Line',
    status: 'On Patrol',
    shift: '14:00 - 22:00',
    lastActivity: 'Camera trap battery cluster replaced',
    patrolScore: 90,
  },
  {
    id: 'RG-105',
    name: 'Kabir Das',
    zone: 'Village Fringe Watch',
    status: 'Standby',
    shift: '12:00 - 20:00',
    lastActivity: 'Community briefing completed',
    patrolScore: 79,
  },
];

export const patrolLogs = [
  { time: '05:30', ranger: 'Aarav Singh', event: 'Patrol started at east checkpoint', zone: 'Central Tiger Corridor' },
  { time: '08:15', ranger: 'Meera Joseph', event: 'Elephant herd route marked safe', zone: 'Wetland Protection Belt' },
  { time: '11:10', ranger: 'Ravi Chouhan', event: 'Acoustic sensor site verified', zone: 'Buffer Zone 3' },
  { time: '14:25', ranger: 'Nisha Thapa', event: 'River crossing drone refueled', zone: 'River Patrol Line' },
  { time: '16:40', ranger: 'Kabir Das', event: 'Village perimeter awareness notice delivered', zone: 'Village Fringe Watch' },
];

export const recentAlertsTable = alerts.slice(0, 5);

export const wildlifePopulationData = [
  { month: 'Jan', Tiger: 164, Elephant: 118, Leopard: 81, Deer: 380 },
  { month: 'Feb', Tiger: 168, Elephant: 120, Leopard: 83, Deer: 391 },
  { month: 'Mar', Tiger: 170, Elephant: 121, Leopard: 82, Deer: 399 },
  { month: 'Apr', Tiger: 174, Elephant: 125, Leopard: 86, Deer: 408 },
  { month: 'May', Tiger: 179, Elephant: 129, Leopard: 89, Deer: 416 },
  { month: 'Jun', Tiger: 186, Elephant: 132, Leopard: 94, Deer: 420 },
];

export const fireRiskData = [
  { zone: 'North Ridge', risk: 72, incidents: 6 },
  { zone: 'East Wetland', risk: 38, incidents: 2 },
  { zone: 'Dry Scrub', risk: 81, incidents: 8 },
  { zone: 'River Belt', risk: 29, incidents: 1 },
  { zone: 'Canopy Core', risk: 56, incidents: 4 },
];

export const rangerPatrolActivity = [
  { day: 'Mon', coverage: 74, incidents: 5 },
  { day: 'Tue', coverage: 81, incidents: 4 },
  { day: 'Wed', coverage: 79, incidents: 6 },
  { day: 'Thu', coverage: 86, incidents: 3 },
  { day: 'Fri', coverage: 89, incidents: 2 },
  { day: 'Sat', coverage: 83, incidents: 4 },
  { day: 'Sun', coverage: 77, incidents: 5 },
];

export const reportsOverview = [
  { month: 'Jan', wildlifeCount: 760, alerts: 32, patrolCoverage: 71, performance: 74 },
  { month: 'Feb', wildlifeCount: 778, alerts: 29, patrolCoverage: 74, performance: 77 },
  { month: 'Mar', wildlifeCount: 792, alerts: 35, patrolCoverage: 76, performance: 79 },
  { month: 'Apr', wildlifeCount: 806, alerts: 31, patrolCoverage: 81, performance: 83 },
  { month: 'May', wildlifeCount: 825, alerts: 27, patrolCoverage: 84, performance: 86 },
  { month: 'Jun', wildlifeCount: 842, alerts: 24, patrolCoverage: 88, performance: 90 },
];

export const performanceRadar = [
  { metric: 'Patrol Reach', score: 88 },
  { metric: 'Fire Response', score: 79 },
  { metric: 'Species Watch', score: 91 },
  { metric: 'Village Alerts', score: 73 },
  { metric: 'Sensor Health', score: 84 },
  { metric: 'Officer Readiness', score: 87 },
];

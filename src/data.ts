import { ChartDataPoint, Mention } from './types';

export const mockMentions: Mention[] = [
  {
    id: 'm1',
    source: 'Twitter',
    author: 'Sarah Chen',
    authorHandle: '@sarahdesigns',
    avatarUrl: 'https://i.pravatar.cc/150?u=sarah',
    content: 'Love the new Floxby Creative tools! Just produced a killer ad campaign in half the time it usually takes me. 🚀',
    timestamp: '2h ago',
    sentiment: 'Positive',
    aiReplySuggested: 'Hi Sarah! So thrilled to hear our new tools helped you speed up your workflow. We\'d love to see the campaign you built! Let us know if you need any tips on the new features. 💚',
  },
  {
    id: 'm2',
    source: 'Reddit',
    author: 'VideoEditorPro',
    authorHandle: 'u/VideoEditorPro',
    avatarUrl: 'https://i.pravatar.cc/150?u=reddit1',
    content: 'Honestly, the UI is a bit clunky on mobile right now. Also taking way too long to load exports when I\'m on the go.',
    timestamp: '4h ago',
    sentiment: 'Negative',
    aiReplySuggested: 'Hey there. We hear you on the mobile UI and export speeds. Our dev team just rolled out a beta update targeting mobile performance optimization. Would you be open to test-driving it?',
  },
  {
    id: 'm3',
    source: 'G2',
    author: 'Miguel R.',
    authorHandle: 'Creative Director',
    avatarUrl: 'https://i.pravatar.cc/150?u=miguel',
    content: 'Switched from Adobe to Floxby. Never looking back. The collaborative timeline features are unmatched for remote teams.',
    timestamp: '6h ago',
    sentiment: 'Positive',
    aiReplySuggested: 'Thanks Miguel! Our goal was to make remote collaboration seamless, and it\'s great to hear we hit the mark for your team. Welcome to the Floxby community!',
  },
  {
    id: 'm4',
    source: 'Instagram',
    author: 'Jamie Visuals',
    authorHandle: '@jamie.visuals',
    avatarUrl: 'https://i.pravatar.cc/150?u=jamie',
    content: 'Does anyone else feel like the pricing seems a bit steep for solo creators? Thinking of downgrading my plan.',
    timestamp: '12h ago',
    sentiment: 'Neutral',
    aiReplySuggested: 'Hi Jamie, we completely understand that solo budgeting is tight. Did you know we just launched our "Indie Creator" tier which includes 80% of our pro features for half the price? DM us and we can help transition your account.',
  }
];

export const mockChartData: ChartDataPoint[] = [
  { date: 'Mon', floxby: 420, competitorA: 280, competitorB: 350 },
  { date: 'Tue', floxby: 510, competitorA: 310, competitorB: 320 },
  { date: 'Wed', floxby: 680, competitorA: 380, competitorB: 410 },
  { date: 'Thu', floxby: 710, competitorA: 420, competitorB: 390 },
  { date: 'Fri', floxby: 890, competitorA: 450, competitorB: 480 },
  { date: 'Sat', floxby: 920, competitorA: 510, competitorB: 500 },
  { date: 'Sun', floxby: 1040, competitorA: 580, competitorB: 620 },
];

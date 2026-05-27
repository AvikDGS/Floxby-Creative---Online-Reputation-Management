export interface Mention {
  id: string;
  source: 'Twitter' | 'Reddit' | 'G2' | 'Instagram';
  author: string;
  authorHandle: string;
  avatarUrl: string;
  content: string;
  timestamp: string;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  aiReplySuggested: string;
}

export interface ChartDataPoint {
  date: string;
  floxby: number;
  competitorA: number;
  competitorB: number;
}

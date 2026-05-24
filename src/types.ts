export interface Admin {
  email: string;
}

export interface Member {
  uid: string;
  fullName: string;
  email: string;
  phone: string;
  state: string;
  district: string;
  tehsil: string;
  role: 'member' | 'volunteer';
  createdAt: any; // Firestore Timestamp
  membershipId: string;
}

export interface News {
  id?: string;
  title: string;
  content: string;
  category: 'announcement' | 'event' | 'campaign';
  createdAt: any;
  imageUrl: string;
  published: boolean;
}

export interface Message {
  id?: string;
  fullName: string;
  email: string;
  category: 'suggestion' | 'support' | 'issue_report';
  message: string;
  createdAt: any;
}

export interface Manifesto {
  id?: string;
  topic: 'EMPLOYMENT' | 'HEALTHCARE' | 'EDUCATION' | 'CLEAN_GREEN' | 'EQUALITY' | 'DEMOCRACY' | 'LISTENING';
  title: string;
  content: string;
  items: string[];
  updatedAt: any;
}

export interface Donation {
  id?: string;
  name: string;
  amount: number;
  transactionId: string;
  timestamp: any;
}

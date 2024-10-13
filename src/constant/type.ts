export type User = {
    username: string;
    name: string;
    birthday: string | null; 
    avatar: string; 
    ranking: number; 
    reputation: number; 
    gitHub: string | null; 
    twitter: string | null; 
    linkedIN: string | null;
    website: string[]; 
    country: string;
    company: string | null; 
    school: string | null;
    skillTags: string[]; 
    about: string; 
};

export type ContestProfile = {
    contestAttend: number; 
    contestRating: number; 
    contestGlobalRanking: number;
    totalParticipants: number; 
    contestTopPercentage: number; 
    contestBadges: any; 
    contestParticipation: any; 
};
  
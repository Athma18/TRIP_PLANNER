

export interface DailyPlan {
  day: number;
  title: string;
  destinations: string[];
}

export interface Package {
  packageId: number;
  packageName: string;
  city: string;
  numberOfDays: number;
  amount: number;
  type: string;
  dailyPlan: DailyPlan[];
}

export interface Country {
  id: number;
  name: string;
  description: string;
}

export interface DestinationState {
  countries: Country[];
  loading: boolean;
  error: string | null;
}



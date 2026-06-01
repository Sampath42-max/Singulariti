export interface TypingProfile {
  bestWpm: number;
  bestAccuracy: number;
  totalTests: number;
  totalTimeSeconds: number;
  longestStreak: number;
  currentStreak: number;
  lastTestDate: string | null;
  speedCategory: string;
  accuracyCategory: string;
  consistencyCategory: string;
}

const DEFAULT_PROFILE: TypingProfile = {
  bestWpm: 0,
  bestAccuracy: 0,
  totalTests: 0,
  totalTimeSeconds: 0,
  longestStreak: 0,
  currentStreak: 0,
  lastTestDate: null,
  speedCategory: 'Novice',
  accuracyCategory: 'Developing',
  consistencyCategory: 'Variable',
};

export function getTypingProfile(): TypingProfile {
  if (typeof window === 'undefined') return DEFAULT_PROFILE;
  try {
    const data = localStorage.getItem('singulariti_typing_profile');
    return data ? JSON.parse(data) : DEFAULT_PROFILE;
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function updateTypingProfile(wpm: number, accuracy: number, durationSecs: number, consistency: number) {
  if (typeof window === 'undefined') return DEFAULT_PROFILE;
  
  const profile = getTypingProfile();
  const today = new Date().toISOString().split('T')[0];

  profile.bestWpm = Math.max(profile.bestWpm, wpm);
  profile.bestAccuracy = Math.max(profile.bestAccuracy, accuracy);
  profile.totalTests += 1;
  profile.totalTimeSeconds += durationSecs;

  if (profile.lastTestDate) {
    const lastDate = new Date(profile.lastTestDate);
    const currDate = new Date(today);
    const diffTime = Math.abs(currDate.getTime() - lastDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    if (diffDays === 1) {
      profile.currentStreak += 1;
    } else if (diffDays > 1) {
      profile.currentStreak = 1;
    }
  } else {
    profile.currentStreak = 1;
  }
  
  profile.longestStreak = Math.max(profile.longestStreak, profile.currentStreak);
  profile.lastTestDate = today;

  // Categories
  if (wpm >= 100) profile.speedCategory = 'Speed Demon';
  else if (wpm >= 70) profile.speedCategory = 'Fast Typist';
  else if (wpm >= 40) profile.speedCategory = 'Average Typist';
  else profile.speedCategory = 'Novice';

  if (accuracy >= 98) profile.accuracyCategory = 'Precision Typist';
  else if (accuracy >= 90) profile.accuracyCategory = 'Balanced Typist';
  else profile.accuracyCategory = 'Developing';

  if (consistency >= 90) profile.consistencyCategory = 'Machine-like';
  else if (consistency >= 70) profile.consistencyCategory = 'Consistent';
  else profile.consistencyCategory = 'Variable';

  localStorage.setItem('singulariti_typing_profile', JSON.stringify(profile));
  return profile;
}

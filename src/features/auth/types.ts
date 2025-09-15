export type AuthState = {
  isAuthenticated: boolean;
  hasPin: boolean;
  biometricsEnabled: boolean;
  bioAvailable: boolean;
  failedAttempts: number;
  lockUntil: number | null;
  loading?: boolean;
  error?: string | null;
};
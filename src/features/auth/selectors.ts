import type { RootState } from '../../app/store';

export const selectAuth = (s: RootState) => s.auth;
export const selectIsAuthenticated = (s: RootState) => s.auth.isAuthenticated;
export const selectHasPin = (s: RootState) => s.auth.hasPin;
export const selectBiometricsEnabled = (s: RootState) => s.auth.biometricsEnabled;
export const selectBioAvailable = (s: RootState) => s.auth.bioAvailable;
export const selectAuthError = (s: RootState) => s.auth.error;
export const selectLockUntil = (s: RootState) => s.auth.lockUntil;
export const selectFailedAttempts = (s: RootState) => s.auth.failedAttempts;
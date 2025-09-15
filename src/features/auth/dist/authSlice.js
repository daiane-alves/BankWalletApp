"use strict";
exports.__esModule = true;
var toolkit_1 = require("@reduxjs/toolkit");
var thunks_1 = require("./thunks");
var initialState = {
    isAuthenticated: false,
    hasPin: false,
    biometricsEnabled: false,
    bioAvailable: false,
    failedAttempts: 0,
    lockUntil: null,
    loading: false,
    error: null
};
var authSlice = toolkit_1.createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
    extraReducers: function (b) {
        b.addCase(thunks_1.bootstrapAuth.pending, function (s) { s.loading = true; s.error = null; });
        b.addCase(thunks_1.bootstrapAuth.fulfilled, function (s, a) {
            s.loading = false;
            s.hasPin = a.payload.hasPin;
            s.biometricsEnabled = a.payload.biometricsEnabled;
            s.bioAvailable = a.payload.bioAvailable;
            s.isAuthenticated = a.payload.isAuthenticated;
            s.lockUntil = a.payload.lockUntil;
        });
        b.addCase(thunks_1.bootstrapAuth.rejected, function (s, a) { var _a; s.loading = false; s.error = (_a = a.error.message) !== null && _a !== void 0 ? _a : 'Erro ao iniciar auth'; });
        b.addCase(thunks_1.createPin.pending, function (s) { s.loading = true; s.error = null; });
        b.addCase(thunks_1.createPin.fulfilled, function (s, a) {
            s.loading = false;
            s.hasPin = true;
            s.biometricsEnabled = a.payload.biometricsEnabled;
            s.isAuthenticated = true;
        });
        b.addCase(thunks_1.createPin.rejected, function (s, a) { var _a; s.loading = false; s.error = (_a = a.error.message) !== null && _a !== void 0 ? _a : 'Erro ao criar PIN'; });
        b.addCase(thunks_1.authWithBiometrics.pending, function (s) { s.loading = true; s.error = null; });
        b.addCase(thunks_1.authWithBiometrics.fulfilled, function (s) { s.loading = false; s.isAuthenticated = true; s.failedAttempts = 0; s.lockUntil = null; });
        b.addCase(thunks_1.authWithBiometrics.rejected, function (s, a) { var _a; s.loading = false; s.error = (_a = a.error.message) !== null && _a !== void 0 ? _a : 'Biometria falhou'; });
        b.addCase(thunks_1.authWithPin.pending, function (s) { s.loading = true; s.error = null; });
        b.addCase(thunks_1.authWithPin.fulfilled, function (s) { s.loading = false; s.isAuthenticated = true; s.failedAttempts = 0; s.lockUntil = null; });
        b.addCase(thunks_1.authWithPin.rejected, function (s, a) {
            var _a, _b;
            s.loading = false;
            s.failedAttempts += 1;
            s.error = (_b = (_a = a.payload) !== null && _a !== void 0 ? _a : a.error.message) !== null && _b !== void 0 ? _b : 'PIN incorreto';
        });
        b.addCase(thunks_1.signOutAndLock.fulfilled, function (s) { s.isAuthenticated = false; });
    }
});
exports["default"] = authSlice.reducer;

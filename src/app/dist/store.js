"use strict";
var _a;
exports.__esModule = true;
exports.store = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var authSlice_1 = require("../features/auth/authSlice");
var listener_1 = require("./listener");
var baseApi_1 = require("../services/baseApi");
exports.store = toolkit_1.configureStore({
    reducer: (_a = {
            auth: authSlice_1["default"]
        },
        _a[baseApi_1.baseApi.reducerPath] = baseApi_1.baseApi.reducer,
        _a),
    middleware: function (gDM) { return gDM().concat(baseApi_1.baseApi.middleware, listener_1.appListenerMiddleware.middleware); },
    devTools: true
});

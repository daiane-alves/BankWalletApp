"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var native_1 = require("@react-navigation/native");
var native_stack_1 = require("@react-navigation/native-stack");
var SetPinScreen_1 = require("../screens/SetPinScreen/");
var BiometricLoginScreen_1 = require("../screens/BiometricLoginScreen/");
var PinLoginScreen_1 = require("../screens/PinLoginScreen/");
var HomeScreen_1 = require("../screens/HomeScreen/");
var TransactionDetailsScreen_1 = require("../screens/TransactionDetailsScreen/");
var hooks_1 = require("../app/hooks");
var thunks_1 = require("../features/auth/thunks");
var linking_1 = require("./linking");
var useDeepLinking_1 = require("../lib/useDeepLinking");
var Stack = native_stack_1.createNativeStackNavigator();
function RootNavigator() {
    var dispatch = hooks_1.useAppDispatch();
    var _a = hooks_1.useAppSelector(function (s) { return s.auth; }), hasPin = _a.hasPin, biometricsEnabled = _a.biometricsEnabled, isAuthenticated = _a.isAuthenticated;
    // dispara a leitura do estado de auth (PIN, biometria, sessão, etc.)
    react_1.useEffect(function () {
        dispatch(thunks_1.bootstrapAuth());
    }, [dispatch]);
    // ref para navegação (usado pelo hook de deep link quando autenticar)
    var navRef = react_1.useRef(null);
    // ativa deep link: só navega automaticamente quando já estiver autenticado
    useDeepLinking_1.useDeepLinking({ enabled: isAuthenticated, navRef: navRef });
    var theme = __assign(__assign({}, native_1.DefaultTheme), { colors: __assign(__assign({}, native_1.DefaultTheme.colors), { background: '#fff' }) });
    return (react_1["default"].createElement(native_1.NavigationContainer, { ref: navRef, theme: theme, linking: linking_1.linking },
        react_1["default"].createElement(Stack.Navigator, { screenOptions: { headerShown: false } },
            !hasPin && react_1["default"].createElement(Stack.Screen, { name: "SetPin", component: SetPinScreen_1["default"] }),
            hasPin && !isAuthenticated && biometricsEnabled && (react_1["default"].createElement(Stack.Screen, { name: "BiometricLogin", component: BiometricLoginScreen_1["default"] })),
            hasPin && !isAuthenticated && !biometricsEnabled && (react_1["default"].createElement(Stack.Screen, { name: "PinLogin", component: PinLoginScreen_1["default"] })),
            isAuthenticated && (react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement(Stack.Screen, { name: "Home", component: HomeScreen_1["default"] }),
                react_1["default"].createElement(Stack.Screen, { name: "TransactionDetails", component: TransactionDetailsScreen_1["default"] }))))));
}
exports["default"] = RootNavigator;

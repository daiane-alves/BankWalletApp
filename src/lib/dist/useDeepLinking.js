"use strict";
exports.__esModule = true;
exports.useDeepLinking = void 0;
var react_1 = require("react");
var react_native_1 = require("react-native");
// extrai o id de recarga://user/transactions/:id
var extractId = function (url) {
    var _a;
    var m = url.match(/^recarga:\/\/user\/transactions\/([^/?#]+)/i);
    return (_a = m === null || m === void 0 ? void 0 : m[1]) !== null && _a !== void 0 ? _a : null;
};
function useDeepLinking(_a) {
    var enabled = _a.enabled, navRef = _a.navRef;
    var pendingUrl = react_1.useRef(null);
    var navigateWithId = function (url) {
        var id = extractId(url);
        if (!id || !navRef.current)
            return;
        navRef.current.navigate('TransactionDetails', { id: id });
    };
    var handle = function (url) {
        if (url.startsWith('recarga://user/transactions')) {
            if (enabled && navRef.current) {
                navigateWithId(url);
            }
            else {
                pendingUrl.current = url; // guarda até autenticar
            }
        }
    };
    react_1.useEffect(function () {
        var sub = react_native_1.Linking.addEventListener('url', function (_a) {
            var url = _a.url;
            return handle(url);
        });
        react_native_1.Linking.getInitialURL().then(function (url) { return url && handle(url); });
        return function () { return sub.remove(); };
    }, []);
    // quando autenticar, consome link pendente
    react_1.useEffect(function () {
        if (enabled && pendingUrl.current && navRef.current) {
            navigateWithId(pendingUrl.current);
            pendingUrl.current = null;
        }
    }, [enabled, navRef]);
}
exports.useDeepLinking = useDeepLinking;

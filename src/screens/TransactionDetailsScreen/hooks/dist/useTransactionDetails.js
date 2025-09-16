"use strict";
exports.__esModule = true;
exports.useTransactionDetails = void 0;
var react_1 = require("react");
var native_1 = require("@react-navigation/native");
var walletApi_1 = require("../../../features/wallet/walletApi");
function useTransactionDetails() {
    var route = native_1.useRoute();
    var nav = native_1.useNavigation();
    var id = route.params.id;
    var _a = walletApi_1.useGetTransactionByIdQuery(id), data = _a.data, isLoading = _a.isLoading, isError = _a.isError;
    var goBack = react_1.useCallback(function () { return nav.goBack(); }, [nav]);
    return { id: id, data: data, isLoading: isLoading, isError: isError, goBack: goBack };
}
exports.useTransactionDetails = useTransactionDetails;

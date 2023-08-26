import axios from "axios";
import store from "../store";
import authToken from "./authToken";
// import authToken from "../common/authToken";
// import router from "../router";
// import { ROUTER_URL } from "../constant/urls";
// import Keys from "../constants/keys";

let CancelToken = axios.CancelToken;
let source = CancelToken.source();

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
export const AxiosHelper = {
    errorHandler: (response) => {
        switch (response.status) {
            case 400:
                store.dispatch("snackBar/showToast", {
                    message: response.data.message ? response.data.message : response.data.detail,
                    color: "E",
                });
                break;
            case 401:
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("rtoken");
                sessionStorage.clear();
                // router.push({ name: ROUTER_URL.auth.children.login.name });
                break;
            case 403:
                store.dispatch("snackBar/showToast", {
                    message: "Invalid token",
                    color: "E",
                });
                sessionStorage.removeItem("token");
                // sessionStorage.removeItem("user_type");
                sessionStorage.clear();
                // router.push({ name: ROUTER_URL.auth.children.login.name });
                break;
            case 404:
                if (
                    response.data.message != "undefined" &&
                    response.data.message != null
                ) {
                    store.dispatch("snackBar/showToast", {
                        message: response.data.message,
                        color: "E",
                    });
                } else {
                    store.dispatch("snackBar/showToast", {
                        message: "Invalid API URL",
                        color: "E",
                    });
                }
                break;
            case 440:
                store.dispatch("snackBar/showToast", {
                    message: "PublicSession Expired",
                    color: "E",
                });
                sessionStorage.removeItem("token");
                // sessionStorage.removeItem("user_type");
                // router.push(ROUTER_URL.auth.children.login.link);
                break;
            default:
                if (response.data.message) {
                    store.dispatch("snackBar/showToast", {
                        message: response.data.message,
                        color: "E",
                    });
                } else {
                    store.dispatch("snackBar/showToast", {
                        message: "Something Went Wrong!",
                        color: "E",
                    });
                }
        }
    },

};

const Axios = {
    request_GET: (
        url,
        look_up_key,
        params,
        headers,
        fnSuccessResponse = null,
        fnFailureResponse = null,
        cancel = true,
        isTokenRequired = true,
        fnFinallyBlock = null
    ) => {
        if (cancel) {
            source.cancel();
            source = axios.CancelToken.source();
            headers["cancelToken"] = source.token;
        }

        if (isTokenRequired) {
            headers["Authorization"] = `Bearer ${authToken.getAccessToken()}`;
            // console.log(authToken.getAccessToken());
        }

        axios
            .get(url + look_up_key, {
                params: params,
                headers: headers,
                cancelToken: cancel ? source.token : "",
            })
            .then(function (response) {
                if (fnSuccessResponse != null) {
                    fnSuccessResponse(response);
                }
                //update token
                if (
                    response.data.result.token
                ) {
                    sessionStorage.setItem("token", response.data.result.token.access_token);
                    // sessionStorage.setItem("token", response.data.token);
                }
                // AxiosHelper.updatePermissions(response);
            })
            .catch(function (error) {
                if (axios.isCancel(error)) {
                    // Request cancelled
                } else {
                    if (!error.response) {
                        // Network error
                        store.dispatch("snackBar/showToast", {
                            message: "Something Went Wrong! Try Reloading",
                            color: "E",
                        });
                        console.log(error, " djdsjds")
                    } else {
                        if (fnFailureResponse != null) {
                            fnFailureResponse();
                        }

                        AxiosHelper.errorHandler(error.response);
                        if (
                            error.response.headers.permissions !== null &&
                            error.response.headers.permissions !== "" &&
                            error.response.headers.permissions !== undefined
                        ) {
                            store.dispatch(
                                "mainStore/updatePermissions",
                                error.response.headers.permissions
                            );
                        }
                    }
                }
            })
            .finally(function () {
                if (fnFinallyBlock != null) {
                    fnFinallyBlock();
                }
            });
    },
    request_POST: (
        url,
        data,
        headers,
        fnSuccessResponse = null,
        fnFailureResponse = null,
        cancel = true,
        isTokenRequired = true,
        fnFinallyBlock = null
    ) => {
        var config = {};

        if (cancel) {
            source.cancel();
            source = axios.CancelToken.source();
            config["cancelToken"] = source.token;
        }

        if (!cancel) {
            source = axios.CancelToken.source();
        }

        if (isTokenRequired) {
            headers["Authorization"] = `Bearer ${authToken.getAccessToken()}`;
            // headers["token"] = authToken.getAccessToken();
        }

        config["headers"] = headers;

        axios
            .post(url, data, config)
            .then(function (response) {
                if (fnSuccessResponse != null) {
                    fnSuccessResponse(response);
                    store.dispatch("snackBar/showToast", {
                        message: response.data.detail,
                        color: "s",
                    });

                }
                // update token
                // console.log(response.headers.token, "response.headers.token");
                if (
                    response.data.result.token.access_token !== null &&
                    response.data.result.token.access_token !== "" &&
                    response.data.result.token.access_token !== undefined &&
                    typeof response.data.result.token.access_token !== undefined
                ) {
                    console.log("token updated - POST");
                    sessionStorage.setItem("token", response.data.result.token.access_token);
                    sessionStorage.setItem("rtoken", response.data.result.token.refresh_token);
                    // sessionStorage.setItem("token", response.data.token);
                    // console.log(authToken.getAccessToken());
                }

                // AxiosHelper.updatePermissions(response);
            })
            .catch(function (error) {
                console.log(error);
                if (axios.isCancel(error)) {
                    console.log("Request canceled", error);
                } else {
                    if (!error.response) {
                        // Network error
                        store.dispatch("snackBar/showToast", {
                            message: "Something Went Wrong! Try Reloading",
                            color: "E",
                        });
                    } else {
                        if (fnFailureResponse != null) {
                            fnFailureResponse(error.response);
                        }

                        AxiosHelper.errorHandler(error.response);
                        // if (
                        //   error.response.headers.permissions !== null &&
                        //   error.response.headers.permissions !== "" &&
                        //   error.response.headers.permissions !== undefined
                        // ) {
                        //   store.dispatch(
                        //     "mainStore/updatePermissions",
                        //     error.response.headers.permissions
                        //   );
                        // }
                    }
                }
            })
            .finally(function () {
                if (fnFinallyBlock != null) {
                    fnFinallyBlock();
                }
            });
    },
    request_DELETE: (
        url,
        params,
        headers,
        fnSuccessResponse = null,
        fnFailureResponse = null,
        cancel = true,
        isTokenRequired = true,
        fnFinallyBlock = null
    ) => {
        if (cancel) {
            source.cancel();
            source = axios.CancelToken.source();
            headers["cancelToken"] = source.token;
        }
        if (isTokenRequired) {
            headers["Authorization"] = `Bearer ${authToken.getAccessToken()}`;
            // headers["token"] = authToken.getAccessToken();
        }

        axios
            .delete(url, {
                params: params,
                headers: headers,
                cancelToken: cancel ? source.token : "",
            })
            .then(function (response) {
                if (fnSuccessResponse != null) {
                    fnSuccessResponse(response);
                    store.dispatch("snackBar/showToast", {
                        message: response.data.detail,
                        color: "E",
                    });
                }
                // update token
                if (
                    // response.headers.token !== null &&
                    // response.headers.token !== "" &&
                    // response.headers.token !== undefined
                    response.data.result.token.access_token !== null &&
                    response.data.result.token.access_token !== "" &&
                    response.data.result.token.access_token !== undefined
                ) {
                    sessionStorage.setItem("token", response.result.token.access_token);

                }
            })
            .catch(function (error) {
                if (axios.isCancel(error)) {
                    // Request cancelled
                } else {
                    if (!error.response) {
                        // Network error
                        // store.dispatch("snackBar/showToast", {
                        //     message: "Something Went Wrong! Try Reloading",
                        //     color: "E",
                        // });
                        console.log("jdjsdj")
                    } else {
                        if (fnFailureResponse != null) {
                            fnFailureResponse(error.response);
                        }

                        AxiosHelper.errorHandler(error.response);
                        // if (
                        //     error.response.headers.permissions !== null &&
                        //     error.response.headers.permissions !== "" &&
                        //     error.response.headers.permissions !== undefined
                        // ) {
                        //     store.dispatch(
                        //         "mainStore/updatePermissions",
                        //         error.response.headers.permissions
                        //     );
                        // }
                    }
                }
            })
            .finally(function () {
                if (fnFinallyBlock != null) {
                    fnFinallyBlock();
                }
            });
    },
    request_PUT: (
        url,
        look_up_key,
        params,
        headers,
        fnSuccessResponse = null,
        fnFailureResponse = null,
        // cancel = true,
        isTokenRequired = true,
        fnFinallyBlock = null
    ) => {
        // if (cancel) {
        //     source.cancel();
        //     source = axios.CancelToken.source();
        // }
        // /** COMMENTED ON 9 MAR **/
        // if (!cancel) {
        //     source = axios.CancelToken.source();
        // }
        // headers["cancelToken"] = source.token;
        if (isTokenRequired) {
            headers["Authorization"] = `Bearer ${authToken.getAccessToken()}`;
            // headers["token"] = authToken.getAccessToken();
        }

        axios
            .put(url + `${look_up_key}/`, params, { headers: headers })
            .then(function (response) {
                if (fnSuccessResponse != null) {
                    fnSuccessResponse(response);
                    store.dispatch("snackBar/showToast", {
                        message: response.data.detail,
                        color: "s",
                    });
                }
                // update token
                if (
                    // response.headers.token !== null &&
                    // response.headers.token !== "" &&
                    // response.headers.token !== undefined
                    response.data.result.token.access_token !== null &&
                    response.data.result.token.access_token !== "" &&
                    response.data.result.token.access_token !== undefined
                ) {
                    sessionStorage.setItem("token", response.result.token.access_token);
                }
                AxiosHelper.updatePermissions(response);
            })
            .catch(function (error) {
                if (axios.isCancel(error)) {
                    console.log("Request canceled", error.message);
                } else {
                    if (!error.response) {
                        // Network error
                        store.dispatch("snackBar/showToast", {
                            message: "Something Went Wrong! Try Reloading",
                            color: "E",
                        });
                    } else {
                        if (fnFailureResponse != null) {
                            fnFailureResponse();
                        }

                        AxiosHelper.errorHandler(error.response);
                        if (
                            error.response.headers.permissions !== null &&
                            error.response.headers.permissions !== "" &&
                            error.response.headers.permissions !== undefined
                        ) {
                            // store.dispatch(
                            //     "mainStore/updatePermissions",
                            //     error.response.headers.permissions
                            // );
                        }
                    }
                }
            })
            .finally(function () {
                if (fnFinallyBlock != null) {
                    fnFinallyBlock();
                }
            });
    },
    request_PATCH: (
        url,
        data,
        headers,
        fnSuccessResponse = null,
        fnFailureResponse = null,
        cancel = true,
        isTokenRequired = true,
        fnFinallyBlock = null
    ) => {
        var config = {};

        if (cancel) {
            source.cancel();
            source = axios.CancelToken.source();
            config["cancelToken"] = source.token;
        }

        if (!cancel) {
            source = axios.CancelToken.source();
        }

        if (isTokenRequired) {
            headers["Authorization"] = `Bearer ${authToken.getAccessToken()}`;
            // headers["token"] = authToken.getAccessToken();
        }

        config["headers"] = headers;
        config["params"] = { id: data.id }

        axios
            .patch(url, data, config)
            .then(function (response) {
                if (fnSuccessResponse != null) {
                    fnSuccessResponse(response);
                    store.dispatch("snackBar/showToast", {
                        message: response.data.detail,
                        color: "s",
                    });
                }
                // update token
                if (
                    response.data.result.token.access_token !== null &&
                    response.data.result.token.access_token !== "" &&
                    response.data.result.token.access_token !== undefined
                ) {
                    sessionStorage.setItem("token", response.result.token.access_token);
                }
                AxiosHelper.updatePermissions(response);
            })
            .catch(function (error) {
                if (axios.isCancel(error)) {
                    console.log("Request canceled", error.message);
                } else {
                    if (!error.response) {
                        // Network error
                        // store.dispatch("snackBar/showToast", {
                        //     message: "Something Went Wrong! Try Reloading",
                        //     color: "E",
                        // });
                    } else {
                        if (fnFailureResponse != null) {
                            fnFailureResponse();
                        }

                        AxiosHelper.errorHandler(error.response);
                        // if (
                        //     error.response.headers.permissions !== null &&
                        //     error.response.headers.permissions !== "" &&
                        //     error.response.headers.permissions !== undefined
                        // ) {
                        //     store.dispatch(
                        //         "mainStore/updatePermissions",
                        //         error.response.headers.permissions
                        //     );
                        // }
                    }
                }
            })
            .finally(function () {
                if (fnFinallyBlock != null) {
                    fnFinallyBlock();
                }
            });
    },
    request_PATCH_MULTIPART: (
        url,
        data,
        params,
        headers,
        fnSuccessResponse = null,
        fnFailureResponse = null,
        cancel = true,
        isTokenRequired = true,
        fnFinallyBlock = null
    ) => {
        var config = {};

        if (cancel) {
            source.cancel();
            source = axios.CancelToken.source();
            config["cancelToken"] = source.token;
        }

        if (!cancel) {
            source = axios.CancelToken.source();
        }

        if (isTokenRequired) {
            headers["Authorization"] = `Bearer ${authToken.getAccessToken()}`;
            // headers["token"] = authToken.getAccessToken();
        }

        config["headers"] = headers;
        config["params"] = params

        axios
            .patch(url, data, config)
            .then(function (response) {
                if (fnSuccessResponse != null) {
                    fnSuccessResponse(response);
                }
                // update token
                if (
                    response.headers.token !== null &&
                    response.headers.token !== "" &&
                    response.headers.token !== undefined
                ) {
                    sessionStorage.setItem("token", response.headers.token);
                }
                AxiosHelper.updatePermissions(response);
            })
            .catch(function (error) {
                if (axios.isCancel(error)) {
                    console.log("Request canceled", error.message);
                } else {
                    if (!error.response) {
                        // Network error
                        // store.dispatch("snackBar/showToast", {
                        //     message: "Something Went Wrong! Try Reloading",
                        //     color: "E",
                        // });
                    } else {
                        if (fnFailureResponse != null) {
                            fnFailureResponse();
                        }

                        // AxiosHelper.errorHandler(error.response);
                        // if (
                        //     error.response.headers.permissions !== null &&
                        //     error.response.headers.permissions !== "" &&
                        //     error.response.headers.permissions !== undefined
                        // ) {
                        //     store.dispatch(
                        //         "mainStore/updatePermissions",
                        //         error.response.headers.permissions
                        //     );
                        // }
                    }
                }
            })
            .finally(function () {
                if (fnFinallyBlock != null) {
                    fnFinallyBlock();
                }
            });
    },
    request_PASSWORD_RESET: (
        url,
        params,
        headers,
        fnSuccessResponse = null,
        fnFailureResponse = null,
        cancel = true,
        isTokenRequired = false,
        fnFinallyBlock = null
    ) => {
        if (cancel) {
            source.cancel();
            source = axios.CancelToken.source();
        }
        /** COMMENTED ON 9 MAR **/
        if (!cancel) {
            source = axios.CancelToken.source();
        }
        headers["cancelToken"] = source.token;
        if (isTokenRequired) {
            // headers["token"] = authToken.getAccessToken();
        }

        axios
            .post(url, params, { headers: headers })
            .then(function (response) {
                if (fnSuccessResponse != null) {
                    fnSuccessResponse(response);
                }
                // update token
                if (
                    response.headers.token !== null &&
                    response.headers.token !== "" &&
                    response.headers.token !== undefined
                ) {
                    sessionStorage.setItem("token", response.headers.token);
                }
                //update permissions
                if (
                    response.headers.permissions !== null &&
                    response.headers.permissions !== "" &&
                    response.headers.permissions !== undefined
                ) {
                    // store.dispatch(
                    //     "mainStore/updatePermissions",
                    //     response.headers.permissions
                    // );
                }
            })
            .catch(function (error) {
                if (axios.isCancel(error)) {
                    console.log("Request canceled", error.message);
                } else {
                    if (!error.response) {
                        // Network error
                        // store.dispatch("snackBar/showToast", {
                        //     message: "Something Went Wrong! Try Reloading",
                        //     color: "E",
                        // });
                    } else {
                        if (fnFailureResponse != null) {
                            fnFailureResponse();
                        }

                        AxiosHelper.errorHandler(error.response);
                        // if (
                        //     error.response.headers.permissions !== null &&
                        //     error.response.headers.permissions !== "" &&
                        //     error.response.headers.permissions !== undefined
                        // ) {
                        //     store.dispatch(
                        //         "mainStore/updatePermissions",
                        //         error.response.headers.permissions
                        //     );
                        // }
                    }
                }
            })
            .finally(function () {
                if (fnFinallyBlock != null) {
                    fnFinallyBlock();
                }
            });
    },
    request_DOWNLOAD: (
        url,
        params,
        headers,
        fnSuccessResponse = null,
        fnFailureResponse = null,
        filename,
        cancel = false,
        isTokenRequired = true
    ) => {
        if (cancel) {
            source.cancel();
            source = axios.CancelToken.source();
            headers["cancelToken"] = source.token;
        }

        if (isTokenRequired) {
            // headers["token"] = authToken.getAccessToken();
        }

        // headers["responseType"] = "blob";
        // responseType:
        axios
            .get(url, {
                params: params,
                headers: headers,
                responseType: "blob",
                cancelToken: cancel ? source.token : "",
            })
            .then((response) => {
                if (fnSuccessResponse != null) {
                    fnSuccessResponse(response);
                }
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", filename);
                document.body.appendChild(link);
                link.click();
            })
            .catch(function (error) {
                if (fnFailureResponse != null) {
                    fnFailureResponse();
                }

                AxiosHelper.errorHandler(error.response);
            });
    },
    request_GET_BLOB: (
        url,
        params,
        headers,
        fnSuccessResponse = null,
        fnFailureResponse = null,
        cancel = true,
        isTokenRequired = true,
        isBlobType = false,
        fnFinallyBlock = null
    ) => {
        if (cancel) {
            source.cancel();
            source = axios.CancelToken.source();
            headers["cancelToken"] = source.token;
        }

        if (isTokenRequired) {
            // headers["token"] = authToken.getAccessToken();
        }

        axios
            .get(url, {
                params: params,
                headers: headers,
                cancelToken: cancel ? source.token : "",
                responseType: isBlobType ? "blob" : "",
            })
            .then(function (response) {
                if (fnSuccessResponse != null) {
                    fnSuccessResponse(response);
                }
                // update token
                if (
                    response.headers.token !== null &&
                    response.headers.token !== "" &&
                    response.headers.token !== undefined
                ) {
                    sessionStorage.setItem("token", response.headers.token);
                    // sessionStorage.setItem("token", response.data.token);
                }
                AxiosHelper.updatePermissions(response);
            })
            .catch(function (error) {
                if (axios.isCancel(error)) {
                    // Request cancelled
                } else {
                    if (!error.response) {
                        // Network error
                        // store.dispatch("snackBar/showToast", {
                        //     message: "Something Went Wrong! Try Reloading",
                        //     color: "E",
                        // });
                    } else {
                        if (fnFailureResponse != null) {
                            fnFailureResponse();
                        }

                        AxiosHelper.errorHandler(error.response);
                        // if (
                        //     error.response.headers.permissions !== null &&
                        //     error.response.headers.permissions !== "" &&
                        //     error.response.headers.permissions !== undefined
                        // ) {
                        //     store.dispatch(
                        //         "mainStore/updatePermissions",
                        //         error.response.headers.permissions
                        //     );
                        // }
                    }
                }
            })
            .finally(function () {
                if (fnFinallyBlock != null) {
                    fnFinallyBlock();
                }
            });
    },
};

export default Axios;

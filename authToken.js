// var secret = 'qpCJieS1CtTJbdAq0SFUmrsiZegj5sKiGcHOcMTw7pE=';
// var resetPasswordSecret = 'ZYWA9{c~T4M?Btn_nf4h]ZWs@"6*=WZQ2}LvQ}';

const authToken = {
    getAccessToken: () => {
        let token = {
            accessToken: sessionStorage.getItem('token'),
            refreshToken: sessionStorage.getItem('rtoken')
        }
        return token;
    },
    // decodedToken: () => {
    //     const jwtDecode = require("jwt-decode");
    //     const jwt = require("jwt-decode");
    //     try {
    //         Correct token
    //         return jwtDecode(authToken.getAccessToken());
    //         console.log(jwt.decode(authToken.getAccessToken(), secret, true));
    //         return jwt.decode(authToken.getAccessToken(), secret, true);
    //     } catch (err) {
    //         Invalid token
    //         return {};
    //     }
    // },
    // decodedTokenFromString: (token) => {
    //     const jwtDecode = require("jwt-decode");
    //     const jwt = require("jwt-decode");
    //     try {
    //         Correct token
    //         return jwtDecode(token);
    //         console.log(jwt.decode(token, secret, true));
    //         return jwt.decode(token, secret, true);
    //     } catch (err) {
    //         Invalid token
    //         return {};
    //     }
    // },
    /**
     * Save access token in local storage
     * @param token
     */
    setAccessToken: (access_token, refresh_token) => {

        sessionStorage.setItem("token", access_token);
        sessionStorage.setItem("rtoken", refresh_token);
    },
    /**
     * Remove access token from local storage
     */
    removeAccessToken: () => {
        sessionStorage.removeItem("token");
        // sessionStorage.removeItem("rtoken");
        // sessionStorage.clear();
    },
    /**
     * Inspect the access token, Track the status of token
     * @returns {*}
     */
    // inspectAccessToken: () => {
    //     if (authToken.isCorrectAccessToken()) {
    //         return {
    //             flagSession: true,
    //             action: {
    //                 redirect: false,
    //             },
    //         };
    //     } else {
    //         return {
    //             flagSession: false,
    //             action: {
    //                 redirect: true,
    //                   page: ROUTER_URL.auth.children.login.name,
    //             },
    //         };
    //     }
    // },
    /**
     * Returns true if token is correct.
     * @returns {boolean}
     */


    /**
     * Returns true if user has changed password and not logging in for first time
     * @returns {boolean}
     */
    //    is_gym_setup_done: () => {
    //     return authToken.decodedToken().is_gym_setup_done;
    //   },
    /**
     * Decode reset password token
     * @param token
     */
};

// console.log(authToken.decodedTokenFromString);

export default authToken;
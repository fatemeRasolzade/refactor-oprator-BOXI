//public client
import axios from "axios";
import keycloak from "keycloak-js";
import { ErrorAlert } from "../global/alert/Alert";

const _kc = new keycloak({
  url: "http://boxi.local:8080",
  realm: "hubRealm",
  "ssl-required": "none",
  "public-client": true,
  "confidential-port": 0,
  clientId: "react-client",
  "auth-server-url": "http://boxi.local:8080",
});

const doLogin = _kc.login;

const logout = _kc.logout;

const getToken = () => _kc.token;

const isLoggedIn = () => !!_kc.token;
console.log("isLoggedIn", isLoggedIn());

const updateToken = (successCallback) => {
  console.log("updateToken");
  return _kc.updateToken(5).then(successCallback).catch(doLogin);
};

const doLogout = () => {
  localStorage.clear();
  logout();
};

const initKeycloak = (onAuthenticatedCallback) => {
  _kc
    .init({
      onLoad: "check-sso",
      checkLoginIframe: false,

      //onLoad: 'check-sso'
    })
    .then((authenticated) => {
      if (authenticated) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + _kc.token;
        window.localStorage.setItem("myToken", _kc.token);
        window.localStorage.setItem(
          "userName",
          _kc.tokenParsed?.preferred_username
        );
      } else {
        doLogin();
      }
    });
};

const getUsername = () => _kc.tokenParsed?.preferred_username;

const hasRole = (roles) => roles.some((role) => _kc.hasRealmRole(role));

const hasClientRole = (role) => {
  //console.log('_kc.clientId',_kc.clientId);
  return _kc.hasResourceRole(role);
};

const tokenExpired = (_kc.onTokenExpired = () => {
  _kc
    .updateToken(5)
    .then((response) => {
      if (response) {
        console.log("rrrrrrrr", _kc.token);
        axios.defaults.headers.common["Authorization"] = "Bearer " + _kc.token;
        window.localStorage.setItem("myToken", _kc.token);
      } else {
        ErrorAlert("توکن آپدیت نشد");
      }
    })
    .catch((err) => {
      console.log("error token", err);
      ErrorAlert("توکن آپدیت نشد");
      doLogout();
    });

  /*
      if(window.confirm('Do you want to keep login')){
        try {
          _kc.updateToken(5).then((response) => {
            console.log('response',response);
            if (response) {
              console.log('successfully get a new token', _kc.token);
            } else {
              throw new Error('Something went wrong ...');
            }
          }).catch( err => {
              console.log('400 response form server',err);
             // doLogout();
          });
        }catch (e) {
          console.log('err in try catch',e);
          //doLogout();
        }
      }else {
        console.log('User log out selected');
        //doLogout();
      }*/
});

const UserService = {
  initKeycloak,
  doLogin,
  doLogout,
  isLoggedIn,
  getToken,
  updateToken,
  getUsername,
  hasRole,
  tokenExpired,
  hasClientRole,
};

export default UserService;

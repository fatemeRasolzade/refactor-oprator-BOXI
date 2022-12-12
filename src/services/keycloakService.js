//public client
import axios from "axios";
import keycloak from "keycloak-js";
const _kc=new keycloak({
	"url":"http://boxi.local:8080",
	"realm":"hubRealm",
	"ssl-required":"none",
	"public-client":true,
	"confidential-port":0,
	"clientId":"react-client",
	"auth-server-url":"http://boxi.local:8080"
});

const doLogin = _kc.login;

const doLogout = _kc.logout;

const getToken = () => _kc.token;

const isLoggedIn = () => !!_kc.token;

const updateToken = (successCallback) =>{
	console.log('updateToken');
	return _kc.updateToken(5)
		.then(successCallback)
		.catch(doLogin);
}




const initKeycloak = (onAuthenticatedCallback) => {
	_kc.init({
		onLoad: 'login-required',
		checkLoginIframe: false,
		
		//onLoad: 'check-sso'

	})
		.then((authenticated) => {
			if (authenticated) {
				console.log('token')
				axios.defaults.headers.common["Authorization"] = "Bearer " + getToken();
				window.localStorage.setItem("myToken",getToken())
			onAuthenticatedCallback();
			} else {
			  doLogin();
			}
		})
};


const getUsername = () => _kc.tokenParsed?.preferred_username;

const hasRole = (roles) => roles.some((role) => _kc.hasRealmRole(role));


const hasClientRole = (role) => {
	//console.log('_kc.clientId',_kc.clientId);
	return _kc.hasResourceRole(role);
}

const  tokenExpired =_kc.onTokenExpired = () => {
	console.log('token expired!: previous token', _kc.token);

	_kc.updateToken(5).then((response) => {
		console.log('response',response);
		if (response) {
			axios.defaults.headers.common["Authorization"] = "Bearer " + getToken();
				window.localStorage.setItem("myToken",getToken())
			console.log('successfully get a new token', _kc.token);
		} /*else {
      throw new Error('Something went wrong ...');
    }*/
	}).catch( err => {
		console.log('400 response form server',err);
		doLogout()
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

}

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
	hasClientRole
};

export default UserService;
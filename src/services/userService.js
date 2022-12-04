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



const initKeycloak = (onAuthenticatedCallback) => {
	_kc.init({
		onLoad: 'login-required',
		//onLoad: 'check-sso'

	})
		.then((authenticated) => {
			 if (!authenticated) {
			console.log('user is not authenticated')
			} 
			onAuthenticatedCallback();
		}).catch(console.error)
};

const doLogin = _kc.login;

const doLogout = _kc.logout;

const getToken = () => _kc.token;

const isLoggedIn = () => !!_kc.token;

const updateToken = (successCallback) =>
	 _kc.updateToken(5)
		.then(successCallback)
		.catch(doLogin);



const getUsername = () => _kc.tokenParsed?.preferred_username;

const hasRole = (roles) => roles.some((role) => _kc.hasRealmRole(role));


const hasClientRole = (role) => {
	//console.log('_kc.clientId',_kc.clientId);
	return _kc.hasResourceRole(role);
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
	hasClientRole
};

export default UserService;
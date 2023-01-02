import Keycloak from 'keycloak-js'
 
// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'

const keycloakConfig = {
    "url": "http://boxi.local:8080",
    "realm": "hubRealm",
    "ssl-required": "none",
    "public-client": true,
    "confidential-port": 0,
    "clientId": "react-client",
    "auth-server-url": "http://boxi.local:8080",
}

const Customkeycloak = new Keycloak(keycloakConfig);

export default Customkeycloak
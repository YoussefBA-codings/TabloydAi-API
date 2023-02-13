import * as dotenv from 'dotenv';
dotenv.config();

const firebaseConfig = {
	databaseUrl: process.env.DATABASE_URL,
	type: process.env.TYPE,
	projectId: process.env.PROJECT_ID,
	privateKeyId: process.env.PRIVATE_KEY_ID,
	privateKey: process.env.PRIVATE_KEY,
	clientEmail: process.env.CLIENT_EMAIL,
	clientId: process.env.CLIENT_ID,
	authUri: process.env.AUTH_URI,
	tokenUri: process.env.TOKEN_URI,
	authProviderX509CertUrl: process.env.AUTH_PROVIDER_X509_CERT_URL,
	clientX509CertUrl: process.env.CLIENT_X509_CERT_URL,
};

// const firebaseConfig = {
// 	type: serviceAccount.type,
// 	project_id: serviceAccount.project_id,
// 	private_key_id: serviceAccount.private_key_id,
// 	private_key: serviceAccount.private_key,
// 	client_email: serviceAccount.client_email,
// 	client_id: serviceAccount.client_id,
// 	auth_uri: serviceAccount.auth_uri,
// 	token_uri: serviceAccount.token_uri,
// 	auth_provider_x509_cert_url: serviceAccount.auth_provider_x509_cert_url,
// 	client_x509_cert_url: serviceAccount.client_x509_cert_url,
// };

export default firebaseConfig;

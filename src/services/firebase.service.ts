import { Injectable } from '@nestjs/common';
import axios from 'axios';

//FireBase Dependences
import firebaseConfig from '~/config/firebase-config';
import { credential } from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
import { Auth, getAuth } from 'firebase-admin/auth';

@Injectable()
export class FirebaseService {
	public readonly app: any;
	public readonly auth: Auth;

	constructor() {
		this.app = initializeApp({
			credential: credential.cert(firebaseConfig),
			serviceAccountId: process.env.EMAIL_CLIENT,
			databaseURL: process.env.DATABASE_URL,
			projectId: process.env.PROJECT_ID,
		});

		this.auth = getAuth(this.app);
	}

	public async signIn(uid, options?) {
		const customToken = await this.auth
			.createCustomToken(uid, options)
			.catch((error) => {
				console.log('Error creating custom token:', error);
			});

		const responseAxios = await axios.post(
			`https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${process.env.API_KEY}`,
			{ token: customToken, returnSecureToken: true },
			{ headers: { 'Content-Type': 'application/json' } },
		);

		return responseAxios.data.idToken;
	}
}

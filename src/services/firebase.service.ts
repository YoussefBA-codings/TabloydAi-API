import {Injectable} from "@nestjs/common";
import * as firebase from "firebase-admin";
import firebaseConfig from "~/config/firebase-config";

@Injectable()
export class FirebaseApp {
    private firebaseApp: firebase.app.App;

    constructor() {
        this.firebaseApp = firebase.initializeApp({
            // credential: firebase.credential.cert(serviceAccount),
            credential: firebase.credential.cert({...firebaseConfig}),
            databaseURL: firebaseConfig.databaseUrl
        });
    }

    getAuth = (): firebase.auth.Auth => {
        return this.firebaseApp.auth();
    }

    firestore = (): firebase.firestore.Firestore => {
        return this.firebaseApp.firestore();
    }
}
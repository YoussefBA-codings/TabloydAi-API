const firebaseConfig = {
  clientEmail: process.env.EMAIL_CLIENT,
  projectId: process.env.PROJECT_ID,
  privateKey: process.env.PRIVATE_KEY,
  databaseUrl: process.env.DATABASE_URL,
}

export default firebaseConfig;
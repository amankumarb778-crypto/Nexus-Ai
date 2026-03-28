const admin = require('firebase-admin');
const path = require('path');

let isInitialized = false;

// Ensure you have downloaded the service account key from Firebase Console
// and placed it in the backend directory as 'firebase-service-account.json'
const serviceAccountPath = path.join(__dirname, '..', 'firebase-service-account.json');

try {
    const serviceAccount = require(serviceAccountPath);
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    isInitialized = true;
    console.log('✅ Firebase Admin SDK Initialized');
} catch (error) {
    console.error('⚠️ Firebase Admin SDK initialization failed:', error.message);
    console.log('💡 Please ensure d:\\prashantsir\\ai-resume=optimizer\\backend\\firebase-service-account.json exists.');

    if (process.env.NODE_ENV === 'production') {
        console.error('❌ Critical: Cannot start in production without Firebase credentials.');
        process.exit(1);
    }
}

module.exports = { admin, isInitialized };

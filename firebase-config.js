  // Firebase Configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBxm9scK9bWxue782r8w2xNR_thS1y9-q4",
    authDomain: "dhjrjtdzjg.firebaseapp.com",
    databaseURL: "https://dhjrjtdzjg-default-rtdb.firebaseio.com",
    projectId: "dhjrjtdzjg",
    storageBucket: "dhjrjtdzjg.appspot.com", // ✅ Fixed Storage Bucket
    messagingSenderId: "548960975194",
    appId: "1:548960975194:web:fc9596a8cae353883d9b63",
    measurementId: "G-BPJJSQV4Z6"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app); // ✅ Added Authentication

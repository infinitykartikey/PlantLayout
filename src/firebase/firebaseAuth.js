// import auth from '@react-native-firebase/auth';
// import  firestore  from '@react-native-firebase/firestore';

// export const signUp = async (email, password, name) => {
//     try {
//       const userCredential = await auth().createUserWithEmailAndPassword(email, password);
//       const user = userCredential.user;
  
//       // Store user data in Firestore
//       await firestore().collection('users').doc(user.uid).set({
//         uid: user.uid,
//         name,
//         email,
//         createdAt: firestore.FieldValue.serverTimestamp(),
//       });
  
//       return user;
//     } catch (error) {
//         console.log(error);
//       throw error;
//     }
//   };



// // Login function
// export const login = async (email, password) => {
//   try {
//     const userCredential = await auth().signInWithEmailAndPassword(email, password);
//     // Return the user object
//     return userCredential.user;
//   } catch (error) {
//     console.error('Login error:', error);
//     throw error;
//   }
// };

// // Optional: Add a function to check if a user is authenticated
// export const checkAuthState = () => {
//   return new Promise((resolve) => {
//     const unsubscribe = auth().onAuthStateChanged((user) => {
//       unsubscribe();
//       resolve(user);
//     });
//   });
// };

// export const resetPassword = async (email) => {
//   try {
//     await auth().sendPasswordResetEmail(email);
//     return 'Password reset email sent!';
//   } catch (error) {
//     throw error;
//   }
// };

// export const signOut = async () => {
//   await auth().signOut();
// };
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// Sign up new user
export const signUp = async (email, password, name) => {
  const userCredential = await auth().createUserWithEmailAndPassword(email, password);
  const user = userCredential.user;

  // Save user profile in Firestore
  await firestore().collection('users').doc(user.uid).set({
    uid: user.uid,
    name,
    email,
    createdAt: firestore.FieldValue.serverTimestamp(),
  });

  return user;
};

// Login existing user
export const login = async (email, password) => {
  const userCredential = await auth().signInWithEmailAndPassword(email, password);
  return userCredential.user;
};

// Logout
export const logout = async () => {
  await auth().signOut();
};

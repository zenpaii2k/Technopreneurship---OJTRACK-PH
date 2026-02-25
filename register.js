document.getElementById('student-submit-btn').addEventListener('click', () => {
    const email = document.getElementById('student-email').value;
    const password = document.getElementById('student-pass').value;
    const agree = document.getElementById('agree').checked;

    if (!agree) {
        alert("Please agree to the terms.");
        return;
    }
  
    sessionStorage.setItem('reg_email', email);
    sessionStorage.setItem('reg_password', password);

    window.location.href = "register1.html";
});

document.getElementById('student-submit1-btn').addEventListener('click', () => {
    const name = document.getElementById('student-name').value;
    const surname = document.getElementById('student-surname').value;
  
    sessionStorage.setItem('reg_name', name);
    sessionStorage.setItem('reg_surname', surname);

    window.location.href = "register2.html";
});

import { auth, db } from "./firebase-config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

    document.getElementById('student-submit2-btn').addEventListener('click', async (e) => {
    e.preventDefault(); 
 
    console.log("Button clicked, refresh prevented.");

    const email = sessionStorage.getItem('reg_email');
    const password = sessionStorage.getItem('reg_password');
    
    if (!email || !password) {
        alert("Session data lost. Please go back to Part 1.");
        return;
    }

    try {
        console.log("Attempting to create user...");
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("Auth Success: ", user.uid);

        const ojtData = {
            company: document.getElementById('stu-ojtname').value,
          
            role: "student"
        };

        console.log("Attempting to save to Firestore...");
        await setDoc(doc(db, "users", user.uid), ojtData);
        
        console.log("Firestore Success!");
        alert("Registration Successful!");
        window.location.href = "login.html";

    } catch (error) {
        console.error("FIREBASE ERROR: ", error.code, error.message);
        alert("Firebase Error: " + error.message);
    }
});

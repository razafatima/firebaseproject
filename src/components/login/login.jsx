import React, { useState } from 'react';
import { Heading, Label, Input, Button } from '../utils/logindata';
import loginContent from '../utils/loginContent';
import styles from '../styles/styles.module.css';
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      toast.error("Please enter both email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", userCredential.user);

      toast.success("Login successful! Redirecting...");
      navigate('/pokemonList2'); // Redirect user to the demo page
    } catch (error) {
      console.error("Login error:", error);

      let errorMessage = "Invalid email or password.";
      if (error.code === "auth/user-not-found") {
        errorMessage = "No user found with this email.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Incorrect password.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email format.";
      }

      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleLogin}>
        <Heading text={loginContent.title} />
        {error && <div className={styles.errorMessage}>{error}</div>}

        <div className={styles.labelinputcontainer}>
          <Label label={loginContent.label} />
          <Input 
            type="text" 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>

        <div className={styles.labelinputcontainer}>
          <Label label={loginContent.label2} />
          <Input 
            type="password" 
            placeholder="Enter your password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>

        <div className={styles.btncontainer}>
          <Button btn={loginContent.btn} type="submit" />
        </div>

        <div className={styles.btncontainer}>
          <Button btn={loginContent.btn2} onClick={() => navigate("/signup")} />
        </div>
      </form>
    </div>
  );
};

export default Login;

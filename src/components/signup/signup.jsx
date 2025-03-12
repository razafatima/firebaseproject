import React, {useState} from 'react'
import {Heading, Label, Input, Button} from '../utils/logindata';
import loginContent from '../utils/loginContent';
import styles from '../styles/styles.module.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import {auth } from '../firebase/firebase';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
  
    const handleSignUp = async (e) => {
      e.preventDefault();
      
      if (!email.trim() || !password.trim()) {
        setError('Please enter both email and password');
        toast({
          title: "Error",
          description: "Please enter both email and password",
          variant: "destructive"
        });
        return;
      }
      
      setIsLoading(true);
      
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('User signed up:', userCredential.user);
        
        toast({
          title: "Success",
          description: "Account created successfully! Redirecting to login...",
        });
        
        // Redirect to login page after successful signup
        navigate('/login');
      } catch (error) {
        console.error('Signup error:', error);
        
        let errorMessage = 'An error occurred during signup. Please try again.';
        
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'This email is already in use. Please use a different email or login.';
        } else if (error.code === 'auth/weak-password') {
          errorMessage = 'Password must be at least 6 characters long.';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'Please enter a valid email address.';
        }
        
        setError(errorMessage);
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
  

  return (
    <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSignUp}>
            <Heading text={loginContent.title2}/>
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
            <Button btn={loginContent.btn2} type="submit"/>
          </div>
          
          <div className={styles.btncontainer}>
             <Button btn={loginContent.btn3} onClick={() => navigate("/login")}/>
          </div>

          
        </form>
    </div>
  )
}

export default Signup;
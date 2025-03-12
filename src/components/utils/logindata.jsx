import styles from '../styles/styles.module.css';


const Heading = ({text}) => {
return (
    <div className={styles.heading}>{text}</div>
);
}

const Label = ({label}) => {
 return(
     <div className={styles.label}>{label}</div>
 );
}

const Input = ({type = "text", placeholder, value, onChange, disabled}) =>  {
    return(
   
     <input type={type} 
     className={styles.input} 
     placeholder={placeholder} 
     value={value}
     onChange={onChange}
     disabled={disabled}
     />
     
    );
}

const Button = ({btn, onClick}) => {

return(
   <button className={styles.btn}  onClick={onClick}>{btn}</button>
)
};



export {Heading, Label, Input, Button}; 
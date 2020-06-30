import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { clearMessages } from "../../actions/messagesActions";

const useCustomForm = (initialState) => {

    const [values, setValues] = useState(initialState); 

    useEffect(() => {
      console.log(values);
      return () => {
        console.log("removido")
      }
    },[values])

    const { register, handleSubmit, errors, clearError} = useForm();   

    const dispatch = useDispatch(); 

    const handleChange = e => {
        const target = e.target; 
        setValues(prevState => ({  
          ...prevState, 
          [target.name]: target.value
        }));
      };

    const clearAllErrors = () => {
      clearError();
      dispatch(clearMessages())    
    }

    return { handleChange, values, setValues, register, handleSubmit, errors, clearAllErrors }
}

export default useCustomForm
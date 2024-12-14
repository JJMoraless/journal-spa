import { useEffect, useMemo, useState } from "react";


/**
* @param { Object }  initialForm estado inicial del formulario
* @param { Object }  formValidator objeto con las validaciones de los campos de initialForm
*/
export const useForm = (initialForm = {}, formValidator = {}) => {
  const [formState, setformState] = useState(initialForm);

  useEffect(() => {
    setformState(initialForm);
  }, [initialForm])
  
  /**
   * se evita crear otro estado para setear cada vez que se cambia tambien el formState
   * y por lo tanto usar el use efect con el formState como dependencia
   * y setear el estado de validaciones 
   * 
   * provocando que haya dos re-renders
   * usa useMemo para que solo se ejecute cuando cambie el formState y nada mas
   */
  const formValidations = useMemo(() => {
    if(Object.keys(formValidator).length === 0) return true;

    const formCheckedValues = {}
    for (const formField of Object.keys(formState)) {
      const [fnIsValidValue, errMsg] = formValidator[formField];

      const valueToCheck = formState[formField];
      formCheckedValues[`${formField}Valid`] = !fnIsValidValue(valueToCheck)
        ? errMsg
        : null;

    }
    return formCheckedValues;
  }, [formState, formValidator])


  const isFormValid = useMemo(() => {
    if(Object.keys(formValidator).length === 0) return true;
    
    for (const formValue of Object.values(formValidations)) {
      if (formValue !== null) {
        return false;
      }
    }
    return true;
  }, [formValidations, formValidator])

  /**
   * @param { React.ChangeEvent<HTMLInputElement> } event
   */
  const onInputChange = ({ target: { name, value } }) => {
    setformState({ ...formState, [name]: value });
  };

  const onResetForm = () => {
    setformState(initialForm);
  };


  return {
    formState,
    formValidations,
    isFormValid,

    onInputChange,
    onResetForm,
  };
};
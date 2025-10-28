import { useEffect, useMemo, useState } from "react";

/**
 * @param { Object }  initialForm estado inicial del formulario
 * @param { Object }  formValidator objeto con las validaciones de los campos de initialForm
 */
export const useForm = (initialForm = {}, formValidator = {}) => {
  const [formState, setformState] = useState(initialForm);

  /**
   * cuando initialForm cambie se resetea el estado del formulario
   * pero cuandose se cambie desde fuera del hook sin usar el hook
   */
  useEffect(() => {
    setformState(initialForm);
  }, [initialForm]);

  /**
   * Calcula las validaciones del formulario.
   *
   * En vez de crear un estado separado para las validaciones (lo que provocaría dos actualizaciones y dos renders),
   * usamos useMemo para que las validaciones solo se recalculen
   * cuando cambie el formulario (formState) o las reglas de validación (formValidator).
   *
   * Así evitamos recalcular las validaciones en cada render y solo lo hacemos cuando realmente es necesario.
   * Esto mejora el rendimiento y hace el código más sencillo.
   */
  const formValidations = useMemo(() => {
    if (Object.keys(formValidator).length === 0) return true;

    const formCheckedValues = {};
    for (const formField of Object.keys(formState)) {
      /**
       * @type { [ function(any): boolean, string ] }
       */
      const [fnIsValidValue, errMsg] = formValidator[formField];

      const valueToCheck = formState[formField];
      formCheckedValues[`${formField}Valid`] = !fnIsValidValue(valueToCheck)
        ? errMsg
        : null;
    }
    return formCheckedValues;
  }, [formState, formValidator]);

  const isFormValid = useMemo(() => {
    if (Object.keys(formValidator).length === 0) return true;

    // Si alguna validación no es nula, el formulario no es válido
    for (const formValue of Object.values(formValidations)) {
      if (formValue !== null) {
        return false;
      }
    }

    return true;
  }, [formValidations, formValidator]);

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

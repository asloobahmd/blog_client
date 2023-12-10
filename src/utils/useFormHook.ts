import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Define a generic for the validation schema
type ValidationSchema = yup.AnyObjectSchema;

const useFormHook = <T extends FieldValues>(
  validationSchema: ValidationSchema
) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<T>({
    resolver: yupResolver(validationSchema),
  });

  return { register, handleSubmit, errors, reset };
};

export default useFormHook;

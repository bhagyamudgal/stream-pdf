import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

export const isInvalidField = (
    error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
) => {
    return error ? true : false;
};

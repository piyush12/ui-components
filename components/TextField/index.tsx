import styled from "styled-components";

interface InputProps {
  type?: string;
  placeholder?: string;
  style?: object;
  className?: string;
  label?: string;
  id?: string | number;
  name?: string;
  error?: null | string;
  onChange?: () => void;
  required?: boolean;
  defaultValue?: string;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

interface InputStyleProps {
  error?: string;
}

const InputStyle = styled.div<InputStyleProps>`
  display: flex;
  flex-direction: column;
  gap: 10px;

  input {
    padding: 0rem 1rem;
    border-radius: 0.5rem;
    outline: none;
    box-shadow: none;
    border: 1px solid
      ${(props) => (props.error ? "var(--form-error-color)" : "#efefef")};
    background-color: #f3f3f3;
    height: 2.5rem;
    line-height: 1rem;
    color: ${(props) =>
      props.error ? "var(--form-error-color)" : "var(--dark-color)"};
    font-size: 1rem;

    &:focus {
      outline: 2px solid #2196f3;
      background-color: #efefef;
    }
  }

  .error {
    border-radius: 0.5rem;
    border-width: 1px;
    border-color: hsl(357, 56%, 72%);
    background-color: hsl(357, 56%, 90%);
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    color: hsl(357, 100%, 30%);
    text-align: left;
  }
`;

export const TextField: React.FC<InputProps> = ({
  id = "",
  type,
  placeholder,
  name,
  style,
  className,
  label,
  error,
  onChange,
  required,
  defaultValue,
  minLength,
  maxLength,
  pattern,
  ...rest
}) => {
  const labelId = name ? `${name}-${id}` : String(id);

  return (
    <InputStyle error={error}>
      {label && <label htmlFor={labelId}> {label} </label>}
      <input
        id={labelId}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        required={required}
        defaultValue={defaultValue}
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
        className={className}
        {...rest}
      />
      {error && (
        <div className='error' role='error'>
          {error}
        </div>
      )}
    </InputStyle>
  );
};

import { FC, useState } from "react";
import style from "./SearchForm.module.css";

interface SearchFormProp {
  onSubmit: (value: string) => void;
}

const SearchForm: FC<SearchFormProp> = ({ onSubmit }) => {
  const [value, setValue] = useState("");

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <form className={style.component} onSubmit={handleSubmit}>
      <input
        type="text"
        name="search"
        placeholder={"search..."}
        className={style.input}
        value={value}
        onChange={handleChange}
      />
      <button className={style.button} type="submit">
        <svg width="30" height="30" viewBox="0 0 20 20">
          <path
            d="M8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4ZM2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 9.29583 13.5892 10.4957 12.8907 11.4765L17.7071 16.2929C18.0976 16.6834 18.0976 17.3166 17.7071 17.7071C17.3166 18.0976 16.6834 18.0976 16.2929 17.7071L11.4765 12.8907C10.4957 13.5892 9.29583 14 8 14C4.68629 14 2 11.3137 2 8Z"
            fill="#4A5568"
          />
        </svg>
      </button>
    </form>
  );
};

export { SearchForm };

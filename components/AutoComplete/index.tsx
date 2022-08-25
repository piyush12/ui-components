/*
    TODO

    support of key event
    support of async options
    selected class
    Typescript conversion

*/

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import List from "./List";

const AutoCompleteStyled = styled.div`
  position: relative;
`;

const AutoCompleteListStyled = styled.div`
  position: absolute;
  z-index: 8;
  background-color: #fff;
  box-shadow: rgb(0 0 0 / 20%) 0px 2px 1px -1px,
    rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px;

  ul {
    width: 100%;
    max-height: 40vh;
    overflow: auto;
    list-style: none;
    padding: 0 20px;
    margin: 0;
  }

  li {
    padding: 10px;
    cursor: pointer;
  }
`;

const AutoComplete = ({
  renderInput,
  options,
  getOptionLabel,
  renderOption,
  onChange
}) => {
  const [value, setValue] = useState("");
  const [hideList, setHideList] = useState(true);
  const comboBoxContainer = useRef();

  useEffect(() => {
    function clickAnyWhere(event) {
      if (comboBoxContainer.current) {
        if (
          !event.target.classList.contains("autoComplete") &&
          !comboBoxContainer.current.contains(event.target)
        ) {
          setHideList(true);
        }
      }
    }

    document.addEventListener("click", clickAnyWhere);

    return () => {
      document.removeEventListener("click", clickAnyWhere);
    };
  }, [comboBoxContainer]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const listLabel = useCallback(
    (option) =>
      getOptionLabel
        ? getOptionLabel(option)
        : typeof option === "string"
        ? option
        : option.label,
    []
  );

  const filteredOptions = useMemo(
    () =>
      options.filter((option) => {
        const optionValue = listLabel(option).toLowerCase();
        return optionValue.includes(value.toLowerCase());
      }),
    [options, listLabel, value]
  );

  const onFocus = () => {
    setHideList(false);
  };

  const handleSelect = (option) => {
    const value = listLabel(option);
    setValue(value);
    setHideList(true);
    onChange(option);
  };

  return (
    <AutoCompleteStyled>
      {renderInput({
        onChange: handleChange,
        value: value,
        onFocus,
        className: "autoComplete",
      })}
      {!hideList && (
        <AutoCompleteListStyled ref={comboBoxContainer}>
          <ul role='listbox' aria-labelledby='combo-box-demo-label'>
            {!filteredOptions.length && <List item='Not found' />}
            {filteredOptions.map((option, index) => {
              if (renderOption) {
                return (
                  <React.Fragment key={listLabel(option)}>
                    {renderOption({
                      option,
                      onClick: () => handleSelect(option),
                    })}
                  </React.Fragment>
                );
              }
              return (
                <List
                  tabIndex='-1'
                  data-option-index={index}
                  role='option'
                  aria-disabled='false'
                  aria-selected='false'
                  key={listLabel(option)}
                  item={listLabel(option)}
                  onClick={() => handleSelect(option)}
                />
              );
            })}
          </ul>
        </AutoCompleteListStyled>
      )}
    </AutoCompleteStyled>
  );
};

export default AutoComplete;

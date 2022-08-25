import { NextPage } from "next";
import Image from "next/image";
import { CodeBlock, dracula } from "react-code-blocks";

import AutoComplete from "../components/AutoComplete";
import countries from "../components/AutoComplete/countries";
import { TextField } from "../components/TextField";
import styles from "../styles/Home.module.css";

const AutoCompleteEg1 = `<AutoComplete
    options={countries}
    renderInput={(params) => <TextField placeholder='Choose a country' {...params} /> }
  />`;

const AutoCompleteEg2 = `<AutoComplete
    options={countries}
    renderInput={(params) => <TextField placeholder='Choose a country' {...params} /> }
    renderOption={(option) => (
      <li
        style={{
          display: "flex",
          gap: 20,
          alignItems: "center",
          fontSize: 14,
        }}
      >
        <Image
          loading='lazy'
          width='20'
          height='20'
          src={'https://flagcdn.com/w20/aud.png'}
          alt=''
        />
        {option.label} ({option.code}) + {option.phone}
      </li>
    )}
    renderInput={(params) => {
      return <TextField placeholder='Choose a country' {...params} />;
    }}
  />`;

const AutoCompleteEg3 = `<AutoComplete
    getOptionLabel={(option) => option.code}
    options={countries}
    renderInput={(params) => <TextField placeholder='Choose a country' {...params} /> }
  />`;

const AutoCompletePage: NextPage = () => {

  const handleChange = (value) => {
    console.log(value)
  }

  return (
    <div className={styles.container}>
      <h3>Autocomplete</h3>
      <div className={styles.component}>
        <h4 className={styles.heading4}>Usage</h4>
        <p>Simple</p>
        <div style={{ width: 400, marginBottom: 20 }}>
          <AutoComplete
            options={countries}
            renderInput={(params) => {
              return <TextField placeholder='Choose a country' {...params} />;
            }}
            onChange={handleChange}
          />
        </div>
        <CodeBlock
          text={AutoCompleteEg1}
          language='jsx'
          showLineNumbers
          theme={dracula}
          wrapLines
          codeBlock
        />

        <div className={styles.seperator} />

        <p>label option</p>
        <div style={{ width: 400, marginBottom: 20 }}>
          <AutoComplete
            options={countries}
            getOptionLabel={(option) => option.code}
            renderInput={(params) => {
              return <TextField placeholder='Choose a country' {...params} />;
            }}
          />
        </div>
        <CodeBlock
          text={AutoCompleteEg3}
          language='jsx'
          showLineNumbers
          theme={dracula}
        />

        <div className={styles.seperator} />

        <p>Custom listing</p>
        <div style={{ width: 400, marginBottom: 20 }}>
          <AutoComplete
            options={countries}
            renderOption={({option,...rest}) => (
              <li
                style={{
                  display: "flex",
                  gap: 20,
                  alignItems: "center",
                  fontSize: 14,
                }}
                {...rest}
              >
                <Image
                  loading='lazy'
                  width='20'
                  height='20'
                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                  alt=''
                />
                {option.label} ({option.code}) + {option.phone}
              </li>
            )}
            renderInput={(params) => {
              return <TextField placeholder='Choose a country' {...params} />;
            }}
          />
        </div>
        <CodeBlock
          text={AutoCompleteEg2}
          language='jsx'
          showLineNumbers
          theme={dracula}
        />
      </div>
    </div>
  );
};

export default AutoCompletePage;

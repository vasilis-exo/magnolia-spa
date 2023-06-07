import React, {useRef, useState} from 'react';

function AgeForm() {
  const [age, setAge] = React.useState(null);
  const [savedAge, setSavedAge] = useState(sessionStorage.getItem('mgnlAge'));
  const [errorMessages, setErrorMessages] = useState({isValid: false, isDirty: false});
  const input = useRef(null);

  function handleInput(event) {
    const {value} = event.target;
    const num = parseInt(value);
    if (isNaN(num) || num < 1 || num > 130) {
      setErrorMessages({isValid: false, isDirty: true});
    } else {
      setErrorMessages({isValid: true, isDirty: true})
      if (errorMessages.isValid) {
        setAge(num);
      }
    }
  }

  function saveAge(event) {
    event.preventDefault();
    if (!errorMessages.isValid) {
      return;
    }
    setSavedAge(age);
    sessionStorage.setItem('mgnlAge', age);
    const headerVal = age < 18 ? 'Child' : age < 55 ? 'Adult' : 'Senior';
    sessionStorage.setItem('mgnlAgeHeader', headerVal);
    sessionStorage.setItem(`personalized_${window.location.pathname.replace(/\//g, '_')}`, true);
    setAge(null);
    input.current.value = '';
    setTimeout(() => window.location.reload(), 200);
  }

  function getDisplayedText() {
    if (savedAge) {
      return (<h2>Your age is <strong>{savedAge}</strong>. </h2>)
    } else {
      return (<h2>You've not entered your age. </h2>)
    }
  }

  function displayError() {
    if (!errorMessages.isValid && errorMessages.isDirty) {
      return (<span>Please enter a valid age</span>);
    }
    return (<></>)
  }

  return (
    <form onSubmit={saveAge}>
      <div>
        <label>Enter your age:</label>
        <input ref={input} onKeyUp={handleInput}></input>
        <button type="submit">Save</button>
      </div>
      {displayError()}
      {getDisplayedText()}
    </form>
  );
}

export default AgeForm;

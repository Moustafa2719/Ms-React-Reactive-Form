import React, { FC, useState } from 'react';

import FunctionalForm from './components/FunctionalForm';
import ClassForm from './components/ClassForm';

const App = () => {
  const [type, updateType] = useState<number>(1);

  const renderForm = () => {
    if (type === 1) {
      return <FunctionalForm />;
    } else {
      return <ClassForm />;
    }
  };

  return (
    <>
      <button onClick={() => updateType(1)}>Functional Form</button>
      <button onClick={() => updateType(2)}> Class Form</button>

      {
        renderForm()
      }
    </>
  )
};

export default App;

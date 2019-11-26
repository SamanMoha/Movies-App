import React from 'react';
import './App.scss';
import Person from "./pages/Person";
import DropdownFilter from './components/DropdownFilter'
import MultiSelectList from './components/MultiSelectList'

function App() {
  return (
    <div className="App">
      My page
      <Person name="Jessica Doe" avatar="..." email="hello@jessica.com" />
      <DropdownFilter/>
      <MultiSelectList/>
    </div>
  );
}

export default App;

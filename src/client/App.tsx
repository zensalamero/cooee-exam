import * as React from 'react';
import { useState, useEffect } from 'react';
import { DropDown } from './components';
import './shared/styles/common.styles.scss';
import { IBadge, IMake, IModel } from './shared/interface/IVehicle';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './pages/Form';
import Upload from './pages/Upload';
import './shared/styles/common.styles.scss';

const App = (props: AppProps) => {
  return (
    <main className='container my-5'>
      <Router>
        <Routes>
          <Route path='/' element={<Form />} />
          <Route path='/upload/:id' element={<Upload />} />
        </Routes>
      </Router>
    </main>
  );
};

interface AppProps {}

export default App;

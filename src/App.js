import React from 'react';
import { Provider } from 'react-redux';
import { GlobalStyle } from './style'
import { IconStyle } from './assets/iconfont/iconfont'
import { BrowserRouter, Route } from 'react-router-dom';
import store from './store';
import Home from './application/Home';
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <>
          <GlobalStyle></GlobalStyle>
          <IconStyle></IconStyle>
          <Route path='/' component={Home}></Route>
        </>
      </BrowserRouter>
    </Provider>

  )
}

export default App;
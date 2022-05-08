import './App.css';
import 'normalize.css';
import MainPage from './mainPage/MainPage';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <MainPage />
    </Provider>
  );
}

export default App;

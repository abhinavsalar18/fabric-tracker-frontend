import HomePage from './components/HomePage';
import {createBrowserRouter} from "react-router-dom"
import { RouterProvider } from 'react-router-dom';
import ViewFabricDetail from './components/ViewFabricDetail';
import { Provider } from 'react-redux';
import appStore from './components/store/appStore';
import ViewFabricImage from './components/ViewFabricImage';
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/viewFabric",
    element: <ViewFabricDetail />
  },
  {
    path: "/viewFabricImages",
    element: <ViewFabricImage />
  }
])

function App() {
  return (
    <div className='app'>
    <Provider store={appStore}>
      <RouterProvider router={appRouter}>
            <HomePage />
      </RouterProvider>
     </Provider>
    </div>
  );
}

export default App;

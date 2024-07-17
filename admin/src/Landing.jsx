import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Feedback, History, Login, User } from './pages'
import App from './App'
import { useSelector } from 'react-redux'
import { SingleUserHistory, SingleUserLogin } from './components'

// route
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='user' element={<User />} />
      <Route path='user/:id' element={<SingleUserLogin />} />
      <Route path='feedback' element={<Feedback />} />
      <Route path='history' element={<History />} />
      <Route path='history/:user_id' element={<SingleUserHistory />} />
    </Route>
  )
)

const Landing = () => {

  const data = useSelector(state => state.auth.isLogin)

  return data ? <RouterProvider router={router} /> : <Login />
}

export default Landing

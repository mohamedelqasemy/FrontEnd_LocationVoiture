import { RouterProvider } from 'react-router-dom'
import './App.css'
import { router } from './routes'
import { CarProvider } from './components/CarContext'
import { DateProvider } from './components/DateContext'

function App() {

  return (
    <DateProvider>
      <CarProvider>
        <RouterProvider router={router}/>
      </CarProvider>
    </DateProvider>
  )
}

export default App

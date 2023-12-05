import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Shifts from './pages/Shifts'
import ProtectedRoute from './ui/ProtectedRoute'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'
import GlobalStyles from './styles/GlobalStyles'
import Activate from './pages/Activate'
import BaseAppLayout from './ui/BaseAppLayout'
import WorkDay from './pages/WorkDay'
import WorkTimeLayout from './features/workTime/WorkTimeLayout'
import WorkDayCalculator from './pages/WorkDayCalculator'

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // staleTime: 10 * 1000,
      },
    },
  })
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Login />} />
          <Route path='activate/:uidb/:token/' element={<Activate />} />
          <Route
            element={
              <ProtectedRoute>
                <BaseAppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to='/worktime' />} />

            <Route path='worktime' element={<WorkTimeLayout />}>
              <Route index element={<Navigate replace to='workdays' />} />
              <Route path='workdays' element={<WorkDay />} />
              <Route path='shifts' element={<Shifts />} />
              <Route path='calculator' element={<WorkDayCalculator />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position='top-right'
        gutter={12}
        containerStyle={{ margin: '1rem', padding: '0.5rem' }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          // style: {
          //   fontSize: '16px',
          //   maxWidth: '500px',
          //   padding: '16px 24px',
          //   backgroundColor: 'var(--stone-0)',
          //   color: 'var(--stone-700)',
          // },
        }}
      />
    </QueryClientProvider>
  )
}

export default App

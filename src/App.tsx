import { lazy } from 'react'
import { Route, Routes } from 'react-router'
import { SiteLayout } from '@/components/layout/SiteLayout'

const Home = lazy(() => import('@/views/Home'))
const NotFound = lazy(() => import('@/views/NotFound'))

export function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

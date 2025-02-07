import Navigation from '@/components/Navigation'
import { Outlet } from 'react-router-dom'

const PageLayout: React.FC = () => {
  return (
    <div>
      <Navigation />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  )
}

export default PageLayout

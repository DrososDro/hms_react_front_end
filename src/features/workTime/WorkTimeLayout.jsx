import { Outlet } from 'react-router-dom'
import { WorkTimeLinks } from '../../linkData/workTime'
import NavBar from '../../ui/NavBar'

const WorkTimeLayout = () => {
  return (
    <>
      <NavBar render={WorkTimeLinks} />

      <div className='overflow-y-hidden text-sm md:text-base'>
        <Outlet />
      </div>
    </>
  )
}

export default WorkTimeLayout

import SidebarNav from './SidebarNav'
import TimeDisplay from '@/components/Timer/TimeDisplay'
import Controls from '@/components/Timer/Controls'

export default function Sidebar() {
    return (
        <>
            <div className='p-5'>
                <SidebarNav />
                <TimeDisplay />
                <Controls />
            </div>
        </>
    )
}
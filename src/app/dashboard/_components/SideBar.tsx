
import SidebarMenu from './SidebarMenu'

const SideBar = () => {

    return (
        <div className="flex flex-col justify-start items-start gap-10 px-7 py-10 bg-gray-900 text-white h-[calc(100vh-80px)] w-[340px] border-r-2 border-gray-600">
            <SidebarMenu />
        </div>
    )
}

export default SideBar
import TopNav from '../Navs/topNav'
import Sidebar from '../Navs/sideNav'

const messages = () => {
  return (
    <>
    <TopNav />

    <div className="mx-auto flex max-w-[1600px]">
      <Sidebar /> 
    <div>
      <h1>this is my messages</h1>
    </div>
    </div>
    </>
  )
}

export default messages

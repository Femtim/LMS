import React from 'react'
import TopNav from '../Navs/topNav'
import Sidebar from '../Navs/sideNav'

const Achievements = () => {
  return (
    <>
    <TopNav />

    <div className="mx-auto flex max-w-[1600px]">
      <Sidebar /> 
    <div>
      <h1>this is my achievements</h1>
    </div>
    </div>
    </>
  )
}

export default Achievements

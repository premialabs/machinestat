import React from "react"
import { Helmet } from "react-helmet-async"

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <div className="flex items-center justify-center">
        <div className=" px-6 py-2 rounded-full text-center bg-red-100">
          <h1 className="text-lg font-semibold font-inter text-gray-600 leading-10">You have landed at the default home page.</h1>
          <h2 className="text-gray-700 leading-10">Please add the application home page.</h2>
        </div>
      </div>
    </>
  )
}

export default Home
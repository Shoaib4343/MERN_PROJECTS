import React from 'react'
import SEO from '../components/SEO'
import { useAuth } from '../context/auth.context'


const Home = () => {
  const [auth,setAuth] = useAuth()
  return (
    <div>
      {/* seo */}
      <SEO title={"Home Page"} description={"Hi this is Home page"} />

       <pre className='max-w-full'>{JSON.stringify(auth)}</pre>
      
    </div>
  )
}

export default Home
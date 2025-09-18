import Hero from '../sections/Hero/Hero'
import About from '../sections/About'
import Footer from '../sections/Footer'
import Topbar from '../sections/Topbar'
import Clients from '../sections/Clients/Clients'
import Contact from '../sections/Contact'
import Services from '../sections/Services'

const App = () => {
  return (
    <div className='bg-[#070707]'>
        <Topbar/>
        <Hero/>
        <Services/>
        <About/>
        <Clients />
        <Contact />
        <Footer/>
    </div>
  )
}

export default App
import Hero from '../sections/Hero'
import About from '../sections/About'
import Footer from '../sections/Footer'
import Topbar from '../sections/Topbar'
import Clients from '../sections/Clients'
import Contact from '../sections/Contact'

const App = () => {
  return (
    <div>
        <Topbar/>
        <Hero/>
        <About/>
        <Clients />
        <Contact />
        <Footer/>
    </div>
  )
}

export default App
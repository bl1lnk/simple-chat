import React from 'react'
import {BrowserRouter as Router, Route} from "react-router-dom"
import {Container} from "react-bootstrap"
import Header from "./components/Header"
import RegisterScreen from "./components/screens/RegisterScreen"
import LoginScreen from './components/screens/LoginScreen'
import HomeScreen from './components/screens/HomeScreen'



const App = () => {
  return (
    <Router>
      <Header />

      <main className="py-3">
        <Container>
          <Route path="/register" component={RegisterScreen} exact/>
          <Route path="/login" component={LoginScreen} exact/>
          <Route path="/" component={HomeScreen} exact/>
        </Container>
        </main>
    </Router>
  )
}

export default App

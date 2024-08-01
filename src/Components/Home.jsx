import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div>
        <h1>Welcome to Shut-Up! the chat-app</h1>
        <h3>Already have an account? <Link to="/login">Login here</Link></h3>
        <h3>Dont have an account? <Link to="/register">Register here</Link></h3>
    </div>
  )
}
export default Home
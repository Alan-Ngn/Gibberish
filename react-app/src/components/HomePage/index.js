import { useSelector } from "react-redux";
import './HomePage.css'
const HomePage = () => {
    const sessionUser = useSelector(state => state.session.user);
    return (
        <div className="home-page">
            <h1>{`Welcome ${sessionUser.first_name} ${sessionUser.last_name}!`}</h1>
            <p>Please see the side navigation to create your own channel or have a friend invite you to one of theirs!</p>
        </div>
    )
}

export default HomePage

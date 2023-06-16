import { useSelector } from "react-redux";
import SplashNav from "./SplashNav"
import SplashBody from "./SplashBody";

const SplashPage = ({isLoaded}) => {
    console.log(isLoaded)

    const sessionUser = useSelector(state => state.session.user);
    return (
        <>
            {!sessionUser && (
                // <h1>test</h1>
                <>
                    <SplashNav />
                    <SplashBody />
                </>

            )
            }

        </>
    )
}

export default SplashPage

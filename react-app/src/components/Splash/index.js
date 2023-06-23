import { useSelector } from "react-redux";
import SplashNav from "./SplashNav"
import SplashBody from "./SplashBody";
import SplashFooter from "./SplashFooter";

const SplashPage = ({isLoaded}) => {

    const sessionUser = useSelector(state => state.session.user);
    return (
        <>
            {!sessionUser && (
                // <h1>test</h1>
                <>
                    <SplashNav />
                    <SplashBody />
                    <SplashFooter />
                </>

            )
            }

        </>
    )
}

export default SplashPage

import { Link } from "react-router-dom"

const Navbar = ()=>{
    return(
        <header>
            <div className="container">
                <Link to="/Home">
                    <h1>
                        Aquathermie groep 6
                    </h1>
                </Link>
                <Link to="/Data">
                    <h3>
                        Data
                    </h3>
                </Link>
            </div>
        </header>
    )
}

export default Navbar
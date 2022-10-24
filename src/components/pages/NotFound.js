import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"
import ErrorMessage from "../ErrorMessage/ErrorMessage"

const PageNotFound = () => {
    return (
        <div>
            <Helmet>
                <meta
                    name="description"
                    content="404"
                />
                <title>Not Found</title>
            </Helmet>
            <ErrorMessage/>
            <p style={{'color': 'red', 'textAlign': 'center', 'fontSize': '50px'}}>Чумба, ты ебнутый. Сходи к мозгоправу, попей колесики</p>
            <Link to='/' style={{"display": 'block','color': 'blue', 'textAlign': 'center', 'fontSize': '40px'}}>Нахуй из моего космического пространства</Link>
        </div>
    )
}

export default PageNotFound
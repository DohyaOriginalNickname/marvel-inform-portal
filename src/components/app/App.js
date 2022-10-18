import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import AppHeader from "../appHeader/AppHeader";
import MainPage from "../pages/MainPage"
import ComicsPage from "../pages/ComicsPage"
import PageNotFound from "../pages/NotFound";
import SingleComicPage from "../pages/SingleComicPage";

const App = () => {
    

    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Routes>
                        <Route exact path="/" element={<MainPage/>} />
                        <Route exact path="/comics" element={<ComicsPage/>}/> 
                        <Route exact path="/comics/:comicId" element={<SingleComicPage/>}/> 
                        <Route exact path="*" element={<PageNotFound/>}></Route>
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;
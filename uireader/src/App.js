import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Listings from './comps/Listings'
import ItemListings from './comps/ItemListings'
import ReaderProvider from './comps/ReaderProvider'

const App = () => {
    const baseUrl = 'http://localhost:8000'

    return (
        <Router>
            <Routes>
                <Route
                    exact
                    path="/"
                    element={<Listings baseUrl={baseUrl} />}
                />
                <Route
                    exact
                    path="/:series/chapters/"
                    element={<ItemListings baseUrl={baseUrl} />}
                />
                <Route
                    exact
                    path="/:series/volumes/"
                    element={<ItemListings baseUrl={baseUrl} />}
                />
                <Route
                    path="/:series/chapters/:item/"
                    element={<ReaderProvider baseUrl={baseUrl} />}
                />
                <Route
                    path="/:series/volumes/:item/"
                    element={<ReaderProvider baseUrl={baseUrl} />}
                />
                <Route
                    path="/cbz/"
                    element={<ReaderProvider baseUrl={baseUrl} />}
                />
            </Routes>
        </Router>
    )
}

export default App

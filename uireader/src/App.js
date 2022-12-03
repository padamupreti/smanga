import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Listings from './comps/Listings'
import ItemListings from './comps/ItemListings'
import ItemReader from './comps/ItemReader'

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
                    element={<ItemReader baseUrl={baseUrl} />}
                />
                <Route
                    path="/:series/volumes/:item/"
                    element={<ItemReader baseUrl={baseUrl} />}
                />
                <Route
                    path="/cbz/"
                    element={<ItemReader baseUrl={baseUrl} />}
                />
            </Routes>
        </Router>
    )
}

export default App

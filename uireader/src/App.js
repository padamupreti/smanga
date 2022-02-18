import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Listings from './comps/Listings'
import ItemListings from './comps/ItemListings'
import ItemReader from './comps/ItemReader'

const App = () => {
    const baseUrl = 'http://localhost:8000'

    return (
        <Router>
                <Switch>
                    <Route exact path="/">
                        <Listings baseUrl={baseUrl} />
                    </Route>
                    <Route exact path="/:series/chapters/">
                        <ItemListings baseUrl={baseUrl} />
                    </Route>
                    <Route exact path="/:series/volumes/">
                        <ItemListings baseUrl={baseUrl} />
                    </Route>
                    <Route path="/:series/chapters/:item/">
                        <ItemReader baseUrl={baseUrl} />
                    </Route>
                    <Route path="/:series/volumes/:item/">
                        <ItemReader baseUrl={baseUrl} />
                    </Route>
                </Switch>
        </Router>
    )
}

export default App

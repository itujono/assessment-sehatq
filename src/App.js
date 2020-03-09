import React, { useState, Suspense } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { NotFound } from "components"
import { Provider } from "react-redux"
import { ThemeProvider } from "styled-components"
import { createAppStore } from "./store"
import "./styles/index.less"
import Search from "./pages/Search"
import Home from "./pages/Home"
import ProductDetails from "./pages/ProductDetails"
import History from "./pages/History"

// const Home = React.lazy(() => import("./pages/Home"))

const App = () => {
    const [mode, setMode] = useState("light")
    const handleToggle = () => setMode(mode === "light" ? "dark" : "light")

    return (
        <Provider store={createAppStore()}>
            <BrowserRouter>
                <ThemeProvider theme={{ mode, toggle: handleToggle }}>
                    <Switch>
                        {/* <Suspense fallback="Loading..."> */}
                        <Route exact path="/" component={Home} />
                        <Route exact path="/search" component={Search} />
                        <Route exact path="/product/:slug" component={ProductDetails} />
                        <Route exact path="/history" component={History} />
                        <Route component={NotFound} />
                        {/* </Suspense> */}
                    </Switch>
                </ThemeProvider>
            </BrowserRouter>
        </Provider>
    )
}

export default App

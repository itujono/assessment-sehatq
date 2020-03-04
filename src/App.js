import React, { useState, Suspense } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { Provider } from "react-redux"
import { ThemeProvider } from "styled-components"
import { createAppStore } from "./store"
import "./styles/index.less"

const Home = React.lazy(() => import("./pages/Home"))

const App = () => {
    const [mode, setMode] = useState("light")
    const handleToggle = () => setMode(mode === "light" ? "dark" : "light")

    return (
        <Provider store={createAppStore()}>
            <BrowserRouter>
                <ThemeProvider theme={{ mode, toggle: handleToggle }}>
                    <Switch>
                        <Suspense fallback="Loading...">
                            <Route exact path="/" component={Home} />
                        </Suspense>
                    </Switch>
                </ThemeProvider>
            </BrowserRouter>
        </Provider>
    )
}

export default App

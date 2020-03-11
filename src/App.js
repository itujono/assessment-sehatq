import React, { useEffect, useState } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { NotFound, Heading } from "components"
import { Provider } from "react-redux"
import { createAppStore } from "./store"
import "./styles/index.less"
import Search from "./pages/Search"
import Home from "./pages/Home"
import ProductDetails from "./pages/ProductDetails"
import History from "./pages/History"
import { Modal } from "antd"

const App = () => {
    const [isMobile, setIsMobile] = useState(true)
    // const [mode, setMode] = useState("light")
    // const handleToggle = () => setMode(mode === "light" ? "dark" : "light")

    useEffect(() => {
        if (window.innerWidth > 415) {
            setIsMobile(false)
        }
    }, [window.innerWidth])

    return (
        <Provider store={createAppStore()}>
            <BrowserRouter>
                <Modal visible={!isMobile} footer={false} closable={false} centered>
                    <Heading
                        level={4}
                        content="You are currently not in mobile"
                        subheader="Please switch to mobile device in order to continue using this app"
                    />
                </Modal>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/search" component={Search} />
                    <Route exact path="/product/:slug" component={ProductDetails} />
                    <Route exact path="/history" component={History} />
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        </Provider>
    )
}

export default App

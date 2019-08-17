import axios from "axios"
import { css } from "styled-components"

const instance = axios.create({
    baseURL: "https://zigzagbatam.com/api/",
    headers: {
        "x-api-key": "953ab333-c05a-zigzag-4abf-b3db-6a8c25c0031e",
        Accept: "application/json"
    }
})

instance.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    return config
})

export { instance }

/////////////////////////////////

export const pricer = price =>
    new Intl.NumberFormat("en-ID", {
        currency: "IDR"
    }).format(price)

export const upperCase = word => word && word[0].toUpperCase() + word.slice(1)

// Range from date/time
export const range = (from, to) => Array.from({ length: Math.ceil((to - from + 1) / 1) }, (_, idx) => from + idx * 1)

// Media queries Styled-Components
const sizes = {
    tablet: 767,
    mobile: 414
}

export const media = Object.keys(sizes).reduce((acc, label) => {
    acc[label] = (...args) => css`
        @media (max-width: ${sizes[label]}px) {
            ${css(...args)};
        }
    `
    return acc
}, {})

export const mobile = window.innerWidth < 415
export const tablet = window.innerWidth > 414 && window.innerWidth < 769

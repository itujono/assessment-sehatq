import React from "react"
import styled from "styled-components"
import { media } from "utils"

const StyledSection = styled.section`
    && {
        padding: ${({ pl, pr, pt, pb }) => `${pt || "2em"} ${pr || "4em"} ${pb || "2em"} ${pl || "4em"}`};
        text-align: ${({ textAlign }) => textAlign || "left"};
        margin-bottom: ${({ mb }) => mb || "1em"};
    }

    ${media.mobile`
        && {
			padding: ${({ pl, pr, pt, pb }) => `${pt || "2em"} ${pr || "1.5em"} ${pb || "2em"} ${pl || "1.5em"}`};
		}
    `}
`

function Section({ children, ...props }) {
    return <StyledSection {...props}>{children}</StyledSection>
}

export default Section

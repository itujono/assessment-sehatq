import React, { useState, useEffect } from "react"
import { Section, Heading, Button } from "components"
import { PageHeader, Row, Col, Typography } from "antd"
import { useLocation, useParams, useHistory } from "react-router"
import { ShareAltOutlined } from "@ant-design/icons"
import styled from "styled-components"
import { DUMMY_PRODUCTS } from "utils/dummy"

const BgImage = styled.div`
    height: 180px;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`

const StyledPageHeader = styled(PageHeader)`
    .ant-page-header-heading-extra {
        float: right;
        width: unset;
        padding-top: 0;
    }
`

export default function ProductDetails() {
    const { product = {} } = useLocation()
    const { goBack } = useHistory()
    const { slug } = useParams()
    const [productItem, setProductItem] = useState({})

    useEffect(() => {
        if (slug) {
            const activeProduct = DUMMY_PRODUCTS.find(item => item.slug === slug) || {}
            setProductItem(activeProduct)
            return
        }

        setProductItem(product)
    }, [])

    return (
        <>
            <StyledPageHeader
                className="site-page-header"
                onBack={() => goBack()}
                title={productItem.name}
                subTitle={productItem.price}
                extra={[<Button type="primary" shape="circle" icon={<ShareAltOutlined />} />]}
            />
            <Section>
                <BgImage>
                    <img src="https://source.unsplash.com/random" alt="Random BG" />
                </BgImage>
                <Heading
                    subheader="About"
                    subheader="Helnomeka design team preferred to design with the HSB color model, which makes it easier for designers to have a clear psychological expectation of color when adjusting colors, as well as facilitate communication in teams."
                />
                <Row>
                    <Col xs={12}></Col>
                    <Col xs={12} className="ta-right">
                        <Typography.Text className="mr2em">{productItem.price}</Typography.Text> &nbsp;
                        <Button type="primary">Buy now</Button>
                    </Col>
                </Row>
            </Section>
        </>
    )
}

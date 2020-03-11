import React, { useState, useEffect } from "react"
import { Section, Heading, Button } from "components"
import { PageHeader, Row, Col, Typography, Popconfirm, message, Popover } from "antd"
import { useLocation, useParams, useHistory } from "react-router"
import {
    ShareAltOutlined,
    HeartOutlined,
    HeartFilled,
    FacebookFilled,
    TwitterSquareFilled,
    InstagramFilled
} from "@ant-design/icons"
import styled from "styled-components"
import { DUMMY_PRODUCTS } from "utils/dummy"
import { useDispatch } from "react-redux"
import { buyProduct } from "../../store/actions/productActions"

const BgImage = styled.div`
    height: 180px;
    margin-bottom: 2em;
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
    const { goBack, push } = useHistory()
    const { slug } = useParams()
    const dispatch = useDispatch()
    const [productItem, setProductItem] = useState({})
    const [isFavorited, setIsFavorited] = useState(false)

    const popoverContent = (
        <Row gutter={16}>
            <Col xs={6}>
                <FacebookFilled style={{ fontSize: 20 }} />
            </Col>
            <Col xs={6}>
                <TwitterSquareFilled style={{ fontSize: 20 }} />
            </Col>
            <Col xs={6}>
                <InstagramFilled style={{ fontSize: 20 }} />
            </Col>
        </Row>
    )

    const handleBuy = () => {
        dispatch(buyProduct(productItem))
        message.loading("Please wait...", 2).then(() => {
            push({ pathname: "/history", isBuyingSuccess: true })
        })
    }

    useEffect(() => {
        if (slug) {
            const activeProduct = DUMMY_PRODUCTS.find(item => item.slug === slug) || {}
            setProductItem(activeProduct)
            return
        }

        setProductItem(product)
    }, [dispatch])

    return (
        <>
            <StyledPageHeader
                className="site-page-header"
                onBack={() => goBack()}
                title={productItem.name}
                subTitle={productItem.price}
                extra={[
                    <Popover content={popoverContent} title="Share this" placement="bottomRight">
                        <Button type="primary" shape="circle" icon={<ShareAltOutlined />} />
                    </Popover>
                ]}
            />
            <Section>
                <BgImage>
                    <img src="https://source.unsplash.com/random" alt="Random BG" />
                </BgImage>
                <Heading
                    content="About"
                    subheader="Helnomeka design team preferred to design with the HSB color model, which makes it easier for designers to have a clear psychological expectation of color when adjusting colors, as well as facilitate communication in teams."
                />
                <Row>
                    <Col xs={12}>
                        <Button
                            type="link"
                            icon={isFavorited ? <HeartFilled /> : <HeartOutlined />}
                            shape="circle"
                            onClick={() => setIsFavorited(prev => !prev)}
                        />
                    </Col>
                    <Col xs={12} className="ta-right">
                        <Typography.Text className="mr2em">{productItem.price}</Typography.Text> &nbsp;
                        <Popconfirm title="Are you sure want to buy this?" onConfirm={handleBuy}>
                            <Button type="primary">Buy now</Button>
                        </Popconfirm>
                    </Col>
                </Row>
            </Section>
        </>
    )
}

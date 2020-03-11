import React, { useEffect } from "react"
import { Section, Button } from "components"
// import { Link } from "react-router-dom"
// import Heading from "components/Heading"
import { useSelector, useDispatch } from "react-redux"
import { fetchCategories, fetchPromoProducts } from "store/actions/productActions"
import { Row, Col, Icon, Input, Avatar, Typography, List } from "antd"
import { StarOutlined } from "@ant-design/icons"
import styled from "styled-components"
import { baseStyles } from "styles"
import { useHistory } from "react-router"

const ScrollerRow = styled(Row)`
    && {
        margin-bottom: 2em;
        padding-top: 1em;
        flex-wrap: nowrap;
        overflow-x: scroll;
        width: auto;
        -webkit-overflow-scrolling: touch;
        &::-webkit-scrollbar {
            display: none;
        }
    }
`

const ListItem = styled(List.Item)`
    border-radius: 8px;
    box-shadow: ${baseStyles.boxShadow.main};
    margin-bottom: 2em;
    padding: 2em;
    transition: all 0.2s ease;
    &:hover {
        box-shadow: ${baseStyles.boxShadow.hover};
    }
    img {
        border-radius: 8px;
    }
`

const BottomBar = styled(Row)`
    text-align: center;
    position: sticky;
    bottom: 0;
    background-color: #f3f3f3;
    .ant-col {
        padding: 1.5em 1em;
    }
`

export default function Home() {
    const dispatch = useDispatch()
    const { push } = useHistory()
    const categories = useSelector(({ product }) => product.categories)
    const promoProducts = useSelector(({ product }) => product.promoProducts)

    useEffect(() => {
        dispatch(fetchCategories())
        dispatch(fetchPromoProducts())
    }, [])

    return (
        <>
            <Section>
                <Row gutter={16} className="mb2em">
                    <Col xs={4}>
                        <StarOutlined />
                    </Col>
                    <Col xs={20}>
                        <Input.Search
                            placeholder="Search everything..."
                            onFocus={() => push("/search")}
                            onSearch={value => console.log({ value })}
                        />
                    </Col>
                </Row>

                <ScrollerRow type="flex" gutter={16}>
                    {categories.map(item => (
                        <Col xs={6} className="ta-center">
                            <div>
                                <Avatar src={item.imageUrl} />
                            </div>
                            <Typography.Text>{item.name}</Typography.Text>
                        </Col>
                    ))}
                </ScrollerRow>

                <List
                    itemLayout="vertical"
                    dataSource={promoProducts}
                    renderItem={item => (
                        <ListItem key={item.id} extra={<img src={item.imageUrl} width="100%" alt={item.title} />}>
                            {item.title}
                        </ListItem>
                    )}
                />
            </Section>
            <BottomBar type="flex" justify="center">
                <Col xs={6}>Home</Col>
                <Col xs={6}>Feed</Col>
                <Col xs={6}>Cart</Col>
                <Col xs={6}>Profile</Col>
            </BottomBar>
        </>
    )
}

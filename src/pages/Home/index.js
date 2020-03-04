import React, { useEffect } from "react"
import { Section, Button } from "components"
// import { Link } from "react-router-dom"
// import Heading from "components/Heading"
import { useSelector, useDispatch } from "react-redux"
import { fetchCategories, fetchPromoProducts } from "store/actions/productActions"
import { Row, Col, Icon, Input, Avatar, Typography, List } from "antd"
import styled from "styled-components"
import { baseStyles } from "styles"

const ScrollerRow = styled(Row)`
    margin-bottom: 2em;
    padding-top: 1em;
    flex-wrap: nowrap;
    overflow-x: scroll;
    width: auto;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
        display: none;
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

export default function Home() {
    const dispatch = useDispatch()
    const categories = useSelector(({ product }) => product.categories)
    const promoProducts = useSelector(({ product }) => product.promoProducts)

    useEffect(() => {
        dispatch(fetchCategories())
        dispatch(fetchPromoProducts())
    }, [])

    return (
        <Section>
            <Row gutter={16} className="mb2em">
                <Col xs={4}>{/* <StarOutline /> */}</Col>
                <Col xs={20}>
                    <Input.Search placeholder="Search everything..." onSearch={value => console.log({ value })} />
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
    )
}

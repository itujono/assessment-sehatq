import React, { useEffect } from "react"
import { Section } from "components"
import { PageHeader, List, Avatar, message } from "antd"
import { useHistory, useLocation } from "react-router-dom"
import { RightOutlined } from "@ant-design/icons"
import { useSelector } from "react-redux"

export default function History() {
    const { goBack, push } = useHistory()
    const { isBuyingSuccess } = useLocation()
    const purchased = useSelector(({ product }) => product.purchased)

    const handleClickProduct = item => {
        push({ pathname: `/product/${item.slug}`, product: item })
    }

    useEffect(() => {
        if (isBuyingSuccess) {
            message.success("You have bought it! :)")
        }
    }, [isBuyingSuccess])

    return (
        <Section pt="0" pl="0">
            <PageHeader className="site-page-header" onBack={() => goBack()} title="Purchase history" />
            <Section>
                <List
                    itemLayout="horizontal"
                    dataSource={purchased}
                    renderItem={item => (
                        <List.Item onClick={() => handleClickProduct(item)}>
                            <List.Item.Meta
                                avatar={<Avatar src="https://source.unsplash.com/random/" alt={item.name} />}
                                title={item.name}
                                description={item.price}
                            />
                            <div>
                                <RightOutlined />
                            </div>
                        </List.Item>
                    )}
                />
            </Section>
        </Section>
    )
}

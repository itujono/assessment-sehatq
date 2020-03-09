import React, { useState } from "react"
import { Section } from "components"
import { PageHeader, Input, List, Avatar } from "antd"
import { useHistory } from "react-router-dom"
import { DUMMY_PRODUCTS } from "utils/dummy"
import { RightOutlined } from "@ant-design/icons"

export default function Search() {
    const { goBack } = useHistory()
    const [searchValue, setSearchValue] = useState("")
    const [products, setProducts] = useState(DUMMY_PRODUCTS)

    const handleSearch = value => {
        setSearchValue(value)
    }

    const handleChange = e => {
        setSearchValue(e.target.value)
        const filtered = DUMMY_PRODUCTS.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase()))
        setProducts(filtered)
    }

    return (
        <Section pt="0" pl="0">
            <PageHeader
                className="site-page-header"
                onBack={() => goBack()}
                title="Search"
                subTitle={
                    <Input.Search
                        name="search"
                        placeholder="Search everything..."
                        onChange={handleChange}
                        onSearch={handleSearch}
                        style={{ width: "100%" }}
                    />
                }
            />
            <Section>
                <List
                    itemLayout="horizontal"
                    dataSource={searchValue.length ? products : []}
                    renderItem={item => (
                        <List.Item>
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

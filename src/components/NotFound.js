import React from "react"
import { Section, Heading } from "."
import { Row, Col } from "antd"
import Button from "./Button"
import { LeftOutlined } from "@ant-design/icons"
import { useHistory } from "react-router"

export default function NotFound() {
    const { goBack } = useHistory()

    return (
        <Section>
            <Row type="flex" justify="center" align="middle">
                <Col lg={12}>
                    <Heading content="Nothing here :(" />
                    <Button icon={<LeftOutlined />} type="primary" onClick={() => goBack()}>
                        Back
                    </Button>
                </Col>
            </Row>
        </Section>
    )
}

import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'

const FormContainer = ({children}) => {
    return (
        <Container id="formContainer" className="">
            <Row className="justify-content-md-center">
                <Col sm={12} md={6}>
                    {children}
                </Col>
            </Row>
        </Container>
    )
}

export default FormContainer

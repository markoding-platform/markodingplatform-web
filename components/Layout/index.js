import Head from 'next/head'
import Container from 'react-bootstrap/Container'

export default function Layout({ children }) {
    return <>
        <Head>
            <title>Markoding Platform</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container fluid>{children}</Container>
    </>
}
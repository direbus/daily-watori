import { readdirSync } from 'fs'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { NextSeo } from 'next-seo'
import path from 'path'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { When } from 'react-if'
import styles from "../../styles/legal-document-reader.module.scss"
import { getDoc } from '../../util/markdown-utl'


interface LegalParam {
  source: MDXRemoteSerializeResult,
  meta: any
  error?: false
}

const sharedComponents = {

}

function LegalDocumentReader({ source, meta }: LegalParam) {
  return (
    <>
      <NextSeo title={meta.title} />

      <main>
        <div className={styles.sectionLegalHeader}>
          <Container>
            <h1>{meta.title}</h1>
            <When condition={!!meta.subtitle}>
              <p className="lead">{meta.subtitle}</p>
            </When>
            <p className="small text-mute">Last Updated: {meta.lastUpdate}</p>
          </Container>
        </div>

        <Container>
          <Row>
            <Col xs={12} md={9}>
              <MDXRemote {...source} components={sharedComponents} />
            </Col>
          </Row>
        </Container>
      </main>
    </>
  )
}

export async function getStaticProps({ params }: any) {
  const { slug } = params;

  const props: LegalParam = {};
  const source = getDoc(path.join("legal", slug as string + ".md"));
  const mdxSource = await serialize(source.content)
  props.source = mdxSource;
  props.meta = source.meta;

  return { props }
}

export async function getStaticPaths() {

  const findPath = path.join(process.cwd(), "docs", "legal");
  const docs: string[] = (await readdirSync(findPath))
    .map(filename => filename.replace(".md", ""));

  return {
    paths: docs.map(doc => {
      return {
        params: {
          slug: doc
        }
      }
    }),
    fallback: false
  }
}
export default LegalDocumentReader

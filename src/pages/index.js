import React, { Component } from 'react'
import Helmet from 'react-helmet'
import GitHubButton from 'react-github-btn'
import { graphql, Link } from 'gatsby'
import Layout from '../layout'
import PostListing from '../components/PostListing'
import ProjectListing from '../components/ProjectListing'
import SimpleListing from '../components/SimpleListing'
import SEO from '../components/SEO'
import config from '../../data/SiteConfig'
import projects from '../../data/projects'
import speaking from '../../data/speaking'
import podcasts from '../../data/podcasts'
import quotes from '../../data/quotes'
import askana from '../../content/images/askana.png'

export default class Index extends Component {
  render() {
    const { data } = this.props

    const latestPostEdges = data.latest.edges
    const popularPostEdges = data.popular.edges

    return (
      <Layout>
        <Helmet title={`${config.siteTitle} – Askana Havika`} />
        <SEO />
        <div className="container">
          <div className="lead">
            <div className="elevator">
              <h1>{`Hey, I'm Askana Havika 👋`} </h1>
              <p>
                {`I'm 3-year-old baby still drinks milk. `}
                {' '}
                This blog build by My Father for posting anythink about my daily activity.
              </p>
              <div className="social-buttons">
                <GitHubButton
                  href="https://github.com/pacutlie"
                  data-size="large"
                  data-show-count="true"
                >
                  pacutlie
                </GitHubButton>
              </div>
            </div>
            <div className="newsletter-section">
              <img src={askana} className="newsletter-avatar" alt="Askana Havika" />
              <div>
                <h3>Email Newsletter</h3>
                <p>
                  I write tutorials. Get an update when something new comes out by signing up below!
                </p>
                <a className="button" href="https://taniarascia.substack.com">
                  Subscribe
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="container front-page">
          <section className="section">
            <h2>
              Latest Articles
              <Link to="/blog" className="view-all">
                View all
              </Link>
            </h2>
            <PostListing simple postEdges={latestPostEdges} />
          </section>

          <section className="section">
            <h2>
              Most Popular
              <Link to="/categories/popular" className="view-all">
                View all
              </Link>
            </h2>
            <PostListing simple postEdges={popularPostEdges} />
          </section>

          <section className="section">
            <h2>Open Source Projects</h2>
            <ProjectListing projects={projects} />
          </section>

          <section className="section">
            <h2>Interviews</h2>
            <SimpleListing simple data={podcasts} />
          </section>

          <section className="section">
            <h2>Talks</h2>
            <SimpleListing simple data={speaking} />
          </section>
        </div>
        <div className="gradient-section">
          <div className="container">
            <h2>Other People Say...</h2>
          </div>
          <div className="quotations">
            {quotes.map(quote => (
              <blockquote className="quotation" key={quote.name}>
                <p>{quote.quote}</p>
                <cite>— {quote.name}</cite>
              </blockquote>
            ))}
          </div>
        </div>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    latest: allMarkdownRemark(
      limit: 5
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            categories
            thumbnail {
              childImageSharp {
                fixed(width: 150, height: 150) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            date
            template
          }
        }
      }
    }
    popular: allMarkdownRemark(
      limit: 9
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { categories: { eq: "Popular" } } }
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            categories
            thumbnail {
              childImageSharp {
                fixed(width: 150, height: 150) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            date
            template
          }
        }
      }
    }
  }
`

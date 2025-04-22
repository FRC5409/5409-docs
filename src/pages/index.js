import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomePage() {
  return (
    <main className={styles.homeSection}>
      <div className={styles.overlay}>
        <h1 className={styles.title}>5409 Documentation Placeholder</h1>
        <Link className={styles.ctaButton} to="/docs/intro">
          Get Started Placeholder
        </Link>
      </div>
    </main>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout>
      <HomePage />
    </Layout>
  );
}

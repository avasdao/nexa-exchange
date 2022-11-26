import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '100% Non-Custodial',
    Svg: require('@site/static/img/key-lock-protect.svg').default,
    description: (
      <>
        Introducing the FIRST "trustless" crypto exchange where you will ALWAYS maintain 100% control of YOUR private keys and YOUR coins.
      </>
    ),
  },
  {
    title: 'Mobile-friendly UI/UX',
    Svg: require('@site/static/img/mobile-friendly.svg').default,
    description: (
      <>
        Get the latest quotes and trade info on-the-go — enjoy a gallery of beautiful charts & graphs that look great on both phones and tablets.
      </>
    ),
  },
  {
    title: 'Decentralized Security',
    Svg: require('@site/static/img/network.svg').default,
    description: (
      <>
        A fully-audited, state-of-the-art security system that lives at the heart of the Exchange is operated by a Federation of AAA Validators.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

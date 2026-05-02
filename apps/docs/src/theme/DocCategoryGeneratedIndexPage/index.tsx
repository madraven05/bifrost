import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {useCurrentSidebarCategory} from '@docusaurus/plugin-content-docs/client';
import type {
  PropSidebarItem,
  PropSidebarItemLink,
} from '@docusaurus/plugin-content-docs';
import {PageMetadata} from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import type {Props} from '@theme/DocCategoryGeneratedIndexPage';
import DocCardList from '@theme/DocCardList';
import DocPaginator from '@theme/DocPaginator';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocVersionBanner from '@theme/DocVersionBanner';
import Heading from '@theme/Heading';

import styles from './styles.module.css';

const COMPONENTS_CATEGORY_SLUG = '/category/components';

function DocCategoryGeneratedIndexPageMetadata({
  categoryGeneratedIndex,
}: Props): ReactNode {
  return (
    <PageMetadata
      title={categoryGeneratedIndex.title}
      description={categoryGeneratedIndex.description}
      keywords={categoryGeneratedIndex.keywords}
      image={useBaseUrl(categoryGeneratedIndex.image)}
    />
  );
}

function flattenDocLinks(items: PropSidebarItem[]): PropSidebarItemLink[] {
  return items.flatMap((item) => {
    if (item.type === 'link') {
      return [item];
    }

    if (item.type === 'category') {
      return flattenDocLinks(item.items);
    }

    return [];
  });
}

function createPreviewSections(items: PropSidebarItem[]): {
  title?: string;
  items: PropSidebarItemLink[];
}[] {
  return items.flatMap((item) => {
    if (item.type === 'category') {
      return [
        {
          title: item.label,
          items: flattenDocLinks(item.items),
        },
      ];
    }

    if (item.type === 'link') {
      return [
        {
          items: [item],
        },
      ];
    }

    return [];
  });
}

function getPreviewVideo(item: PropSidebarItemLink): string | undefined {
  const previewVideo = (item.customProps as {previewVideo?: unknown} | undefined)
    ?.previewVideo;

  return typeof previewVideo === 'string' ? previewVideo : undefined;
}

function isComponentsCategoryPage({
  categoryGeneratedIndex,
}: Props): boolean {
  return categoryGeneratedIndex.slug === COMPONENTS_CATEGORY_SLUG;
}

function ComponentsPreviewGrid({
  items,
}: {
  items: PropSidebarItem[];
}): ReactNode {
  const sections = createPreviewSections(items);

  return (
    <div className={styles.previewSections}>
      {sections.map((section, index) => (
        <section
          key={section.title ?? `section-${index}`}
          className={styles.previewSection}>
          {section.title ? (
            <Heading as="h2" className={styles.sectionTitle}>
              {section.title}
            </Heading>
          ) : null}
          <div className={styles.previewGrid}>
            {section.items.map((item) => {
              const previewVideo = getPreviewVideo(item);

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={styles.previewCard}>
                  <div className={styles.previewFrame}>
                    {previewVideo ? (
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        className={styles.previewVideo}>
                        <source src={previewVideo} type="video/mp4" />
                      </video>
                    ) : (
                      <div className={styles.previewPlaceholder}>
                        Preview coming soon
                      </div>
                    )}
                  </div>
                  <span className={styles.previewLabel}>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

function DocCategoryGeneratedIndexPageContent({
  categoryGeneratedIndex,
}: Props): ReactNode {
  const category = useCurrentSidebarCategory();
  const componentsPage = isComponentsCategoryPage({categoryGeneratedIndex});
  const pageClassName = componentsPage
    ? `${styles.generatedIndexPage} ${styles.componentsPage}`
    : styles.generatedIndexPage;

  return (
    <div className={pageClassName}>
      <DocVersionBanner />
      <DocBreadcrumbs />
      <DocVersionBadge />
      <header className={styles.header}>
        <Heading as="h1" className={styles.title}>
          {categoryGeneratedIndex.title}
        </Heading>
        {categoryGeneratedIndex.description && (
          <p className={styles.description}>
            {categoryGeneratedIndex.description}
          </p>
        )}
      </header>
      <article className="margin-top--lg">
        {componentsPage ? (
          <ComponentsPreviewGrid items={category.items} />
        ) : (
          <DocCardList items={category.items} className={styles.list} />
        )}
      </article>
      <footer className="margin-top--md">
        <DocPaginator
          previous={categoryGeneratedIndex.navigation.previous}
          next={categoryGeneratedIndex.navigation.next}
        />
      </footer>
    </div>
  );
}

export default function DocCategoryGeneratedIndexPage(props: Props): ReactNode {
  return (
    <>
      <DocCategoryGeneratedIndexPageMetadata {...props} />
      <DocCategoryGeneratedIndexPageContent {...props} />
    </>
  );
}

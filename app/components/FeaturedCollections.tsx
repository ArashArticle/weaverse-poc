import { Image } from '@shopify/hydrogen';

import type { HomepageFeaturedCollectionsQuery } from 'storefrontapi.generated';
import { Heading, Section, Grid, Link } from '~/components';

type FeaturedCollectionsProps = HomepageFeaturedCollectionsQuery & {
  title?: string;
  subheading?: string;
  [key: string]: any;
};

export function FeaturedCollections({
  collections,
  title = 'Collections',
  subheading = 'Discover our latest collections.',
  count,
  ...props
}: FeaturedCollectionsProps) {
  const haveCollections = collections?.nodes?.length > 0;
  if (!haveCollections) return null;

  const collectionsWithImage = collections.nodes
    .filter((item) => item.image)
    .slice(0, count);

  return (
    <Section {...props} heading={title}>
      <p>{subheading}</p>
      <Grid items={collectionsWithImage.length}>
        {collectionsWithImage.map((collection) => {
          return (
            <Link key={collection.id} to={`/collections/${collection.handle}`}>
              <div className="grid gap-4">
                <div className="card-image bg-primary/5 aspect-[3/2]">
                  {collection?.image && (
                    <Image
                      alt={`Image of ${collection.title}`}
                      data={collection.image}
                      sizes="(max-width: 32em) 100vw, 33vw"
                      aspectRatio="3/2"
                    />
                  )}
                </div>
                <Heading size="copy">{collection.title}</Heading>
              </div>
            </Link>
          );
        })}
      </Grid>
    </Section>
  );
}

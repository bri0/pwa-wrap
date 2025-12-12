import { UrlInputPage } from "../url-input-page";

export default function CatchAllPage({
  params
}: {
  params: { slug?: string[] };
}) {
  const path = `/${(params.slug ?? []).join("/")}`;
  return (
    <UrlInputPage
      heading="PWA Wrap"
      subheading={`This path (${path}) is not the wrapper route. Paste a URL below to generate a /w/... link.`}
      showHomeLink={true}
    />
  );
}


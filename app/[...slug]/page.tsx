import { UrlInputPage } from "../url-input-page";

export default function CatchAllPage({
  params
}: {
  params: { slug: string[] };
}) {
  const path = `/${(params.slug ?? []).join("/")}`;
  return (
    <UrlInputPage
      heading="PWA Wrap"
      subheading={`This path (${path}) is not a page. Paste a URL below and set it to load it full-screen.`}
      showHomeLink={true}
    />
  );
}


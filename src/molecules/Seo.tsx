import { Helmet } from "react-helmet-async";

export interface SeoProps {
  title: string;
}

function Seo({ title }: SeoProps) {
  return (
    <Helmet titleTemplate="%s | Movies">
      <title>{title}</title>
    </Helmet>
  );
}

export default Seo;

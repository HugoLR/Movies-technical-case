import Seo from "~molecules/Seo";
import Movies from "~organisms/Movies";

function Home() {
  return (
    <>
      <Seo title="Home" />
      <Movies />
    </>
  );
}

export default Home;

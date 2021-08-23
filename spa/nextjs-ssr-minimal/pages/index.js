import Pathname, { getPage } from './[...pathname]';

export async function getServerSideProps(context) {
  const page = await getPage(context);

  return {
    props: page,
  };
}

export default Pathname;

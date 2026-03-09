import TileShop from './dashboard-tile';
import CombinedSlider from './slider';
// import Popular from './dashboard-popular';

const DashboardUser = () => {
  const importAll = (r) => {
  return r.keys().map((item) => {
    const fileName = item.replace('./', '').split('.')[0];
    return {
      url: r(item),
      title: fileName.replace(/-/g, ' ')
    };
  });
};
    const slide = importAll(require.context('../assets/products', false, /\.(png|jpe?g|svg)$/));

  return (
    <>
    {/* <Popular items={dummyItems} /> */}
    <TileShop />
    <CombinedSlider slides={slide} />
    </>
    );
}

export default DashboardUser;
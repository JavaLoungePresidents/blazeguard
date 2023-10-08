import SearchBar from "../src/components/SearchBar";

const Index = () => {
  return (
    <>
      <h1>BlazeGuard</h1>
      {/* Google Map Test */}
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyArBIg50Ku4QTfoyPSW3xbA3cUh_VjZlsI&libraries=places"></script>
      <SearchBar />
    </>
  );
};
export default Index;

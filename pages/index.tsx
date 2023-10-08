import AppNavbar from "@/components/AppNavbar";
import Heading from "@/components/Heading";
import FireMap from "@/components/FireMap";

const dummyCoordinates = { lat: 50, lng: -120 };

const Index = () => {
  return (
    <>
      <AppNavbar />
      <div className="heading container-xl p-0">
        <Heading
          content={
            <h2>
              Live fires near <span>New York, NY.</span>
            </h2>
          }
        />
      </div>
      <div>
        <FireMap coordinates={dummyCoordinates} />
      </div>
    </>
  );
};
export default Index;

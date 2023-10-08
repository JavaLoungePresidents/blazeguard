import AppNavbar from "@/components/AppNavbar";
import Heading from "@/components/Heading";

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
    </>
  );
};
export default Index;

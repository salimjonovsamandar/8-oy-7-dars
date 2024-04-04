import { HashLoader } from "react-spinners";

function index() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <HashLoader color="#36d7b7" speedMultiplier={2} />
    </div>
  );
}

export default index;

import Math from "./Math";

function Home() {
  const wirisScript = document.getElementById("wirisScript");

  if (!wirisScript) {
    const script = document.createElement("script");
    script.src =
      "https://www.wiris.net/demo/plugins/app/WIRISplugins.js?viewer=image";
    script.id = "wirisScript";
    document.head.appendChild(script);
    script.onload = () => {
      console.log("loaded");
    };
  }

  return <div>Home</div>;
}

export default Home;

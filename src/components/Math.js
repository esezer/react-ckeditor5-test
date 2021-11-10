import { useEffect } from "react";

function Math(params) {
  const mString =
    `<p><strong>What is the result ?</strong></p><p>` +
    `<math xmlns="http://www.w3.org/1998/Math/MathML"><mroot><mn>27</mn><mn>3</mn></mroot><mo>&nbsp;</mo><mo>+</mo><mo>&nbsp;</mo><mfrac>` +
    `<mn>9</mn><mn>3</mn></mfrac></math></p>`;

    //const erhan = WirisPlugin.Parser.initParse(mString);

  return (
    <div>

      {/* <div id="htmlParser" dangerouslySetInnerHTML={{ __html: mString }}></div> */}
      <div id="htmlParser">{mString}</div>
    </div>
  );
}

export default Math;

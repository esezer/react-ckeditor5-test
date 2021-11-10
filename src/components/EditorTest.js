import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import parse from "html-react-parser";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import useScript from "../hooks/useScript";
import EditorDialog from "../editor/EditorDialog";
import "../css/ckeditor5-custom.css";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 24,
    display: "block",
  },
  container: {
    display: "flex",
  },
  panel: {
    width: "795px",
    display: "flex",
    justifyContent: "space-between",
    height: "auto",
    paddingInline: 8,
    borderInline: ".3px solid #aec1d2",

    "&:hover": {
      borderInline: ".3px solid #aec1d2",
      borderTopLeftRadius: "0.8rem",
      borderTopRightRadius: "0.8rem",
      backgroundColor: "#f1f1f1",
      cursor: "pointer",
    },
  },
  panel2: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    minWidth: 0,
    padding: 12,
  },
  resultsPanel: {
    overflow: "auto",
    height: "600px",
  },
}));

const mString =
  `<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy ` +
  `text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has ` +
  `survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was ` +
  `popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop ` +
  `publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p><ul><li>Line-1</li><li>Line-2</li></ul>` +
  `<figure class="table"><table><tbody><tr><td><span style="color:hsl(0, 75%, 60%);"><strong>abcd</strong></span></td><td>` +
  `<span style="color:hsl(0, 75%, 60%);"><strong>1234</strong></span></td><td><span style="color:hsl(0, 75%, 60%);">` +
  `<strong>abcd</strong></span></td><td><span style="color:hsl(0, 75%, 60%);"><strong>1234</strong></span></td></tr><tr><td>1234</td>` +
  `<td>abcd</td><td>1234</td><td>abcd</td></tr></tbody></table></figure><p><strong>What is the result ?</strong></p><p>` +
  `<math xmlns="http://www.w3.org/1998/Math/MathML"><mroot><mn>27</mn><mn>3</mn></mroot><mo>&nbsp;</mo><mo>+</mo><mo>&nbsp;</mo><mfrac>` +
  `<mn>9</mn><mn>3</mn></mfrac></math></p>`;

function EditorTest() {
  const classes = useStyles();
  const [running, setRunning] = useState(false);
  const [open, setOpen] = useState(false);
  const [article, setArticle] = useState(mString);
  const [counter, setCounter] = useState(0);
  const [results, setResults] = useState([]);
  const [openStart, setOpenStart] = useState(0);
  const [openEnd, setOpenEnd] = useState(0);
  const [closeStart, setCloseStart] = useState(0);
  const [closeEnd, setCloseEnd] = useState(0);

  const toggleRunning = () => {
    setRunning(!running);
  };

  const handleOpenEnd = (v) => {
    setOpenEnd(v);
  };

  const handleCloseStart = (v) => {
    setCloseStart(v);
  };

  const handleArticle = (v) => {
    setArticle(v);
  };

  const handleCounter = () => {
    const d = new Date().getTime();
    const newResults = results.concat({
      counter: counter + 1,
      open: openEnd - openStart,
      close: d - closeStart,
    });
    setResults(newResults);
    setCounter(counter + 1);

    setCloseStart(0);
    setOpenStart(0);
    setOpenEnd(0);
    setCloseEnd(0);
  };

  useEffect(() => {
    if (running && !open && counter < 200)
      setTimeout(() => handleOpenEditorDialog(), 2000);
  }, [running, open, counter]);

  useEffect(() => {
    if (closeStart > 0 && openStart > 0 && closeStart > openStart)
      handleCounter();
  }, [closeStart, openStart]);

  // useScript(
  //   "https://www.wiris.net/demo/plugins/app/WIRISplugins.js?viewer=image&async=true"
  // );

  const handleOpenEditorDialog = () => {
    const d = new Date().getTime();
    setOpenStart(d);
    setOpen(true);
  };

  console.log(article);

  return (
    <div className={classes.root}>
      <div>
        -- The test will end automatically when the counter reaches 200 --
        <Button
          variant="outlined"
          color="primary"
          onClick={toggleRunning}
          style={{ marginInline: 12 }}
        >
          {running ? "Stop" : "Start"}
        </Button>
        {running && <span> Running...</span>}
      </div>

      <div className={classes.container}>
        {article ? (
          <div className={classes.panel}>
            <div
              className={clsx(classes.panel2, "ck-content")}
              role="button"
              onClick={handleOpenEditorDialog}
              onKeyDown={handleOpenEditorDialog}
            >
              {/* <div>{parse(article)}</div> */}

              <div
                id="htmlParser"
                dangerouslySetInnerHTML={{ __html: article }}
              ></div>
            </div>
          </div>
        ) : (
          <Button
            variant="outlined"
            color="primary"
            onClick={handleOpenEditorDialog}
          >
            Edit
          </Button>
        )}

        <div className={classes.resultsPanel}>
          <h4>Counter: {counter}</h4>
          <ol reversed>
            {results &&
              results
                .sort((a, b) => (a.counter > b.counter ? -1 : 1))
                .map((result, index) => (
                  <li key={result.counter}>
                    open: {result.open} - close: {result.close}
                  </li>
                ))}
          </ol>
        </div>
      </div>

      <EditorDialog
        open={open}
        article={article}
        onHandleArticle={handleArticle}
        onSetOpen={setOpen}
        onHandleOpenEnd={handleOpenEnd}
        onHandleCloseStart={handleCloseStart}
      />
    </div>
  );
}

export default EditorTest;

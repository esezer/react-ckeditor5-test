import { useEffect, useState } from "react";
import clsx from "clsx";
import parse from "html-react-parser";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import useScript from "./hooks/useScript";
import EditorDialog from "./editor/EditorDialog";
import "./css/App.css";
import "./css/ckeditor5-custom.css";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 24,
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

function App() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [article, setArticle] = useState("......");
  const [counter, setCounter] = useState(0);
  const [results, setResults] = useState([]);
  const [duration, setDuration] = useState({
    openStart: 0,
    openEnd: 0,
    closeStart: 0,
    closeEnd: 0,
  });

  useEffect(() => {
    if (duration.closeStart) handleCounter();
  }, [duration]);

  const handleCounter = () => {
    const d = new Date().getTime();
    const newResults = results.concat({
      counter: counter + 1,
      open: duration.openEnd - duration.openStart,
      close: d - duration.closeStart,
    });
    setResults(newResults);
    setCounter(counter + 1);
    setDuration({
      openStart: 0,
      openEnd: 0,
      closeStart: 0,
      closeEnd: 0,
    });
  };

  useScript(
    "https://www.wiris.net/demo/plugins/app/WIRISplugins.js?viewer=image&async=true"
  );

  const handleOpenEditorDialog = () => {
    const d = new Date().getTime();
    setDuration({
      openStart: d,
      openEnd: duration.openEnd,
      closeStart: duration.closeStart,
      closeEnd: duration.closeEnd,
    });
    setOpen(true);
  };

  const mString =
    '<p>What is the result ?</p><p><math xmlns="http://www.w3.org/1998/Math/MathML"><mroot>' +
    "<mn>27</mn><mn>3</mn></mroot><mo>&nbsp;</mo><mo>+</mo><mo>&nbsp;</mo><mfrac><mn>9</mn>" +
    "<mn>3</mn></mfrac></math></p>";

  return (
    <div className={classes.root}>
      {article ? (
        <div className={classes.panel}>
          <div
            className={clsx(classes.panel2, "ck-content")}
            role="button"
            onClick={handleOpenEditorDialog}
            onKeyDown={handleOpenEditorDialog}
          >
            <div>{parse(article)}</div>

            {/* <div dangerouslySetInnerHTML={{ __html: test }}></div> */}
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
      <EditorDialog
        open={open}
        article={article}
        onSetArticle={setArticle}
        onSetOpen={setOpen}
        onDuration={duration}
        onSetDuration={setDuration}
      />
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
  );
}

export default App;

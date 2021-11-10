import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import editorConfiguration from "./Config";
import "./Editor.css";
// import { closeEditorDialog, addImageChange, addImageDelete, updateArticleContent } from '../../store/blogSlice';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingInline: 12,
    height: 64,
  },
  wrapper: {
    display: "flex",
    flexGrow: 1,
    flexShrink: 0,
    flexDirection: "column",
    alignItems: "center",
    padding: 16,
    width: "100%",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function EditorDialog(props) {
  const {
    article,
    onHandleArticle,
    open,
    onSetOpen,
    onHandleOpenEnd,
    onHandleCloseStart,
  } = props;
  const classes = useStyles();
  // const { imageChanges } = useSelector(({ adminApp }) => adminApp.blog);
  const [edited, setEdited] = useState(false);
  const [content, setContent] = useState("");
  const [editor, setEditor] = useState();

  useEffect(() => {
    function handleSetContent() {
      setContent(article);
      const d = new Date().getTime();
      onHandleOpenEnd(d);
      setTimeout(() => handleConfirm(), 2000);
    }
    if (editor && article) handleSetContent();
  }, [editor, article]);

  const closeDialog = () => {
    onSetOpen(false);
  };

  // const changeIncludes = src => {
  // 	return imageChanges.findIndex(x => x.src === src) !== -1;
  // };

  function handleConfirm() {
    // const article = { ...editorContent.article };
    // const articleId = article.id;
    const htmlContent = editor.getData();
    //** imagesAll: current uploaded images on the cloud */
    const imagesAll = [];
    const imagesAdded = [];
    let deletedImages = [];

    //** check images */
    const parser = new DOMParser();
    const parsedHtml = parser.parseFromString(htmlContent, "text/html");
    const images = parsedHtml.images;
    const len = images.length;

    // for (let i = 0; i < len; i++) {
    // 	const imgSrc = images[i].src;
    // 	//** check if any new image object is inserted */
    // 	if (imgSrc.startsWith('data') && !changeIncludes(imgSrc)) {
    // 		const id = FuseUtils.generateGUID();
    // 		dispatch(
    // 			addImageChange({
    // 				articleId,
    // 				id,
    // 				src: imgSrc
    // 			})
    // 		);
    // 		imagesAdded.push(id);
    // 	}
    // 	//** images src starts with http */
    // 	if (imgSrc.startsWith('http')) {
    // 		const lastIndex = imgSrc.indexOf('.jpg?');
    // 		const startIndex = lastIndex - 8;
    // 		const imageId = imgSrc.substring(startIndex, lastIndex);
    // 		imagesAll.push(imageId);
    // 	}
    // }

    // article.images = article.images ? article.images : [];

    // deletedImages = article.images.filter(x => !imagesAll.includes(x) && !imageChanges.find(item => item.id === x));

    // if (deletedImages.length) {
    // 	deletedImages.forEach(imageId => dispatch(addImageDelete({ imageId, articleId })));
    // 	article.images = imagesAll;
    // }
    // article.images = imagesAdded.concat(article.images);

    // dispatch(
    // 	updateArticleContent({
    // 		article,
    // 		content: editor.getData()
    // 	})
    // );

    const d = new Date().getTime();
    onHandleCloseStart(d);
    onHandleArticle(editor.getData());
    closeDialog();
  }

  return (
    <Dialog
      open={open}
      fullScreen
      onClose={closeDialog}
      TransitionComponent={Transition}
      disableEnforceFocus
    >
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={closeDialog}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>

          <Typography color="inherit">Editor</Typography>

          <Button
            variant="outlined"
            color="secondary"
            disabled={!edited}
            onClick={handleConfirm}
          >
            <CheckIcon />
          </Button>
        </Toolbar>
      </AppBar>

      <div className={classes.wrapper}>
        <CKEditor
          editor={Editor}
          config={editorConfiguration}
          data={content}
          onReady={(editor) => {
            setEditor(editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setContent(data);
            setEdited(true);
          }}
          onBlur={(event, editor) => {
            //console.log('Blur.', editor);
          }}
          onFocus={(event, editor) => {
            //console.log('Focus.', editor);
          }}
        />
      </div>
    </Dialog>
  );
}

export default EditorDialog;

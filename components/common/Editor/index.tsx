import React, { FC, memo, Fragment, useState, useEffect } from "react";
// import CKEditor from "react-ckeditor-component";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";

const textContent =
  "<h2>Awesome Rich Content</h2>\n" +
  "<p>Suspendisse id sollicitudin dui. <strong>Vestibulum eu sapien pharetra,</strong> bibendum ligula id, ullamcorper ligula.</p>\n" +
  "\n" +
  "<ul>\n" +
  "        <li>ullamcorper ligula</li>\n" +
  "        <li>Duis vel neque</li>\n" +
  "</ul>\n" +
  "\n" +
  "<p><em>Sed feugiat hendrerit risus, quis efficitur massa facilisis vitae. Aliquam erat volutpat. </em></p>\n";

type Props = {
  editorLoaded: boolean;
};
const editorConfiguration = {
  toolbar: ["bold", "italic"],
};
const TopBar: FC<Props> = ({  }) => {
  const [content, setContent] = useState(textContent);

  const onChange = (evt) => {
    const newContent = evt.editor.getData();
    setContent(newContent);
  };

  const onBlur = (evt) => {
    console.log("onBlur event called with event info: ", evt);
  };

  const afterPaste = (evt) => {
    console.log("afterPaste event called with event info: ", evt);
  };
  const [editorLoaded, setEditorLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
    setEditorLoaded(true);
        
    }, 1000);
  }, []);

  return editorLoaded ? (
    <CKEditor
      editor={Editor}
      config={editorConfiguration}
      data="<p>Hello from CKEditor 5!</p>"
      onChange={(event, editor: any) => {
        const data = editor.getData();
        console.log({ event, editor, data });
      }}
    />
  ) : null;
};

export default memo(TopBar);

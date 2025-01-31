import React, { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import config from "../config";
import { navigate } from "@reach/router";
import ButtonSpinner from "../components/ButtonSpinner";

const SaveNoteButton = (props: { noteId: string; noteContent: string }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState();

  const handleSave = async (event: any) => {
    event.preventDefault();
    setIsSaving(true);

    const { noteId, noteContent } = props;
    const updateNoteURL = `${config.GatewayURL}/notes/${noteId}`;

    try {
      await fetch(updateNoteURL, {
        method: "PUT",
        body: JSON.stringify({ content: noteContent })
      });
      navigate("/");
    } catch (error) {
      setErrorMsg(`${error.toString()} - ${updateNoteURL} - ${noteContent}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
      <Button disabled={isSaving} onClick={handleSave} block>
        {isSaving ? <ButtonSpinner /> : ""}
        {isSaving ? "Saving..." : "Save"}
      </Button>
    </>
  );
};

export default SaveNoteButton;

import React, {Fragment, useEffect, useState} from "react";
import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from "@material-ui/core";
import {ArrowUpward, Folder, InsertDriveFile} from "@material-ui/icons";
import LoadingSpinner from "./LoadingSpinner";
import {VideoPlayer} from "./VideoPlayer";

const ALLOWED_EXTENSIONS = [
  "mp4", "mkv", "ogv", "avi", "flv", "ogg", "webm"
];

export function DirectoryList() {
  const [currentPath, setCurrentPath] = useState("/data");
  const [files, setFiles] = useState([]);
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    fetchPath("/data");
  }, [])

  function handleFileClick(f) {
    setEnabled(false);
    let path = `${currentPath}/${f.name}`;
    if (f.type === "directory") {
      fetchPath(path);
    } else {
      let ext = f.name.split('.').pop();
      if (ALLOWED_EXTENSIONS.includes(ext.toLowerCase())) {
        setUrl(path);
        setEnabled(true);
      }
    }
  }

  function fetchPath(path) {
    setEnabled(false);
    setLoading(true);
    setCurrentPath(path)
    fetch(`${path}/`)
    .then(r => r.json())
    .then(r => {
      setFiles(r);
      setLoading(false);
    })
    .catch(reason => {
      alert(reason);
      setLoading(false);
    });
  }

  function up() {
    let path = currentPath.split('/');
    path.pop();
    fetchPath(path.join('/'));
  }

  return <Fragment>
    {loading ? <LoadingSpinner/> : ""}
    <div style={{padding: "20px"}}>
      <h3>{currentPath}</h3>
      {currentPath === "/data" ? "" :
          <Button
              variant="contained"
              color="default"
              startIcon={<ArrowUpward/>}
              onClick={() => up()}
          >Up</Button>
      }
      {enabled ? <VideoPlayer url={url}/> : ""}
    </div>
    <List>
      {files.map(f => <ListItem button onClick={() => handleFileClick(f)}>
        <ListItemAvatar>
          <Avatar>
            {f.type === "directory" ? <Folder/> : <InsertDriveFile/>}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={f.name} secondary={f.mtime}/>
      </ListItem>)}
    </List>

  </Fragment>
}




import React from "react";
import Customebtn from "./Customebtn";

const FilePicker = ({ file, setfile, readFile }) => {
  return (
    <div className=" filepicker-container">
      <div className=" flex  flex-1 flex-col">
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={(e) => setfile(e.target.files[0])}
        />
        <label htmlFor="file-upload" className="filepicker-label">
          {" "}
          Upload File
        </label>
        <p className=" mt-2 text-white truncate text-x">
          {file === "" ? "File Is Not Selected" : file.name}
        </p>
      </div>
      <div className=" mt-4 gap-3 flex flex-wrap">
        <Customebtn
          type="outline"
          title="Logo"
          handleClick={() => readFile("logo")}
          customeStyles="text-xs"
        />
        <Customebtn
          type="filled"
          title="Full"
          handleClick={() => readFile("full")}
          customeStyles="text-xs"
        />
      </div>
    </div>
  );
};

export default FilePicker;

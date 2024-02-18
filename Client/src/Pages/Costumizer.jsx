import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";
import config from "../config/config";
import State from "../store";
import { download, logoShirt, stylishShirt } from "../assets";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";
import {
  AIPicker,
  ColorPicker,
  FilePicker,
  Tabs,
  Customebtn,
} from "../Components";
const Costumizer = () => {
  const snap = useSnapshot(State);
  const [file, setfile] = useState("");
  const [prompt, setprompt] = useState("");
  const [generatingimg, setgeneratingimg] = useState(false);
  const [activeEditorTab, setactiveEditorTab] = useState("");
  const [activeFilterTab, setactiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  const generateContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return <FilePicker file={file} setfile={setfile} readFile={readFile} />;
      case "aipicker":
        return (
          <AIPicker
            prompt={prompt}
            setprompt={setprompt}
            generatingimg={generatingimg}
            handleSumbit={handleSubmit}
          />
        );

      default:
        return null;
    }
  };
  const handleSubmit = async (type) => {
    if (!prompt) return alert("please enter a prompt");
    try {
      setgeneratingimg(true);
      const response = await fetch("http://localhost:8080/api/v1/dalle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });
      const data = await response.json();
      console.log(data);
      handleDecals(type, `data:Image/png;base64,${data.image}`);
    } catch (error) {
      console.log(error);
      alert(error);
    } finally {
      setgeneratingimg(false);
      setactiveEditorTab("");
    }
  };
  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    State[decalType.stateProperty] = result;

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
        State.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        State.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        State.isLogoTexture = true;
        State.isFullTexture = false;
        break;
    }

    setactiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName],
      };
    });
  };
  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecals(type, result);
      setactiveEditorTab("");
      console.log(result);
    });
  };
  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className=" top-0 left-0 absolute  z-10"
            {...slideAnimation("left")}
          >
            <div className=" flex items-center min-h-screen">
              <div className=" editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tabs
                    key={tab.name}
                    tab={tab}
                    handleClick={() => {
                      setactiveEditorTab(tab.name);
                    }}
                  />
                ))}
                {generateContent()}
              </div>
            </div>
          </motion.div>
          <motion.div
            className=" absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <Customebtn
              type="filled"
              title="Go Back"
              handleClick={() => (State.intro = true)}
              customeStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>
          <motion.div
            className=" filtertabs-container"
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tabs
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => {
                  handleActiveFilterTab(tab.name);
                }}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Costumizer;

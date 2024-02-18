import { useSnapshot } from "valtio";
import { motion, AnimatePresence } from "framer-motion";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "../config/motion";
import { Customebtn } from "../Components";
import State from "../store";
const Home = () => {
  const snap = useSnapshot(State);
  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className="home" {...slideAnimation("left")}>
          <motion.header {...slideAnimation("down")} className=" flex gap-3">
            <img
              className=" w-8 h-8 object-contain"
              src="./threejs.png"
              alt="logo"
            />
            <span className=" text-white text-xl font-bold"> My3D_Shirt </span>
          </motion.header>
          <motion.div className="home-content" {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className="head-text stroke-black">
                LET'S <br className=" xl:block hidden" /> DO IT.
              </h1>
            </motion.div>
            <motion.div
              {...headContentAnimation}
              className=" flex flex-col gap-5"
            >
              <p className="max-w-md font-normal text-[#CCCCCC]">
                Create Your Brand-New T-shirt With Our Cutting-Edge 3D
                Customization Feature.<strong>Unleash Your Imagination</strong>{" "}
                And Define Your Own style!!
              </p>
              <Customebtn
                type="filled"
                title="Customize It"
                handleClick={() => (State.intro = false)}
                customeStyles=" w-fit px-4 py-2.5 font-bold text-sm"
              />
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Home;

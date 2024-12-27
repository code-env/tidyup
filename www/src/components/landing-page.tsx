import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useCallback, useState } from "react";
import { Demo } from "./demo";
import { Button } from "./ui/button";

const LandingPage = () => {
  return (
    <div className="h-full w-full pt-40">
      <div className="max-w-xl  w-full mx-auto flex flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-2">
          <img
            src="/logo.svg"
            alt="tidyup logo"
            className="object-contain size-12"
          />
          <h1 className="font-bold text-5xl">Tidyup</h1>
        </div>
        <p className=" text-neutral-800 text-center text-lg">
          A simple CLI tool to organize your folders and files.
        </p>
        <div className="flex items-center gap-4">
          <Button asChild className="min-w-40">
            <a
              href="https://www.npmjs.com/package/tidyup"
              target="_blank"
              rel="noreferrer"
            >
              Npm Package
            </a>
          </Button>
          <Button asChild variant="outline" className="min-w-40">
            <a
              href="https://github.com/code-env/tidyup"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </Button>
        </div>
        <div className="flex mt-28 flex-col gap-20 w-full">
          <div className="flex flex-col gap-2 ">
            <h2 className="text-xl font-semibold">Installation</h2>
            <Installation />
          </div>
          <div className="flex flex-col gap-2 ">
            <h2 className="text-xl font-semibold">Usage</h2>
            <Demo />
          </div>
        </div>
      </div>
    </div>
  );
};

const Installation = () => {
  const [copying, setCopying] = useState(0);
  const variants = {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0.5 },
  };
  const onCopy = useCallback(() => {
    navigator.clipboard.writeText("npm install -g tidyup");
    setCopying((c) => c + 1);
    setTimeout(() => {
      setCopying((c) => c - 1);
    }, 2000);
  }, []);

  return (
    <div>
      <code className="border h-12 bg-gradient-to-t from-gr1 to-gr2 rounded-md relative flex items-center gap-2 px-4">
        <span>npm install -g tidyup</span>
        <Button
          onClick={onCopy}
          size="icon"
          className="absolute right-1 top-0 bottom-0 my-auto"
          variant="outline"
        >
          <MotionConfig transition={{ duration: 0.15 }}>
            <AnimatePresence initial={false} mode="wait">
              {copying ? (
                <motion.div
                  animate="visible"
                  exit="hidden"
                  initial="hidden"
                  key="check"
                  variants={variants}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="14"
                    height="14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    shapeRendering="geometricPrecision"
                  >
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </motion.div>
              ) : (
                <motion.div
                  animate="visible"
                  exit="hidden"
                  initial="hidden"
                  key="copy"
                  variants={variants}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="14"
                    height="14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    shapeRendering="geometricPrecision"
                  >
                    <path d="M8 17.929H6c-1.105 0-2-.912-2-2.036V5.036C4 3.91 4.895 3 6 3h8c1.105 0 2 .911 2 2.036v1.866m-6 .17h8c1.105 0 2 .91 2 2.035v10.857C20 21.09 19.105 22 18 22h-8c-1.105 0-2-.911-2-2.036V9.107c0-1.124.895-2.036 2-2.036z"></path>
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </MotionConfig>
        </Button>
      </code>
    </div>
  );
};

export default LandingPage;

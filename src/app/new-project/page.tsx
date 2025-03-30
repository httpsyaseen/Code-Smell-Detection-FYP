"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import UploadFile from "@/components/UploadFile";
import Report from "@/components/Report";
import Editor from "@/components/Editor";
import Test from "@/components/Test";

const dummy = [
  {
    endLine: 702,
    path: "janino-master/commons-compiler-jdk/src/main/java/org/codehaus/commons/compiler/jdk/ScriptEvaluator.java",
    smellType: "God Class",
    startLine: 71,
  },
  {
    endLine: 3225,
    path: "janino-master/commons-compiler-tests/src/test/java/org/codehaus/commons/compiler/tests/JlsTest.java",
    smellType: "God Class",
    startLine: 54,
  },
  {
    endLine: 1962,
    path: "janino-master/commons-compiler-tests/src/test/java/org/codehaus/commons/compiler/tests/ReportedBugsTest.java",
    smellType: "God Class",
    startLine: 75,
  },
  {
    endLine: 1636,
    path: "janino-master/janino/src/main/java/org/codehaus/janino/CodeContext.java",
    smellType: "God Class",
    startLine: 62,
  },
  {
    endLine: 181,
    path: "janino-master/janino/src/main/java/org/codehaus/janino/Compiler.java",
    smellType: "Excessive Parameter List",
    startLine: 105,
  },
  {
    endLine: 264,
    path: "janino-master/janino/src/main/java/org/codehaus/janino/ExpressionEvaluator.java",
    smellType: "Excessive Parameter List",
    startLine: 241,
  },
  {
    endLine: 1468,
    path: "janino-master/janino/src/main/java/org/codehaus/janino/IClass.java",
    smellType: "God Class",
    startLine: 52,
  },
  {
    endLine: 4237,
    path: "janino-master/janino/src/main/java/org/codehaus/janino/Parser.java",
    smellType: "God Class",
    startLine: 175,
  },
  {
    endLine: 1371,
    path: "janino-master/janino/src/main/java/org/codehaus/janino/ScriptEvaluator.java",
    smellType: "God Class",
    startLine: 88,
  },
  {
    endLine: 495,
    path: "janino-master/janino/src/main/java/org/codehaus/janino/ScriptEvaluator.java",
    smellType: "Excessive Parameter List",
    startLine: 472,
  },
  {
    endLine: 13677,
    path: "janino-master/janino/src/main/java/org/codehaus/janino/UnitCompiler.java",
    smellType: "God Class",
    startLine: 240,
  },
  {
    endLine: 1920,
    path: "janino-master/janino/src/main/java/org/codehaus/janino/Unparser.java",
    smellType: "God Class",
    startLine: 201,
  },
  {
    endLine: 1139,
    path: "janino-master/janino/src/main/java/org/codehaus/janino/util/AbstractTraverser.java",
    smellType: "God Class",
    startLine: 196,
  },
  {
    endLine: 3518,
    path: "janino-master/janino/src/main/java/org/codehaus/janino/util/ClassFile.java",
    smellType: "God Class",
    startLine: 62,
  },
  {
    endLine: 1416,
    path: "janino-master/janino/src/main/java/org/codehaus/janino/util/DeepCopier.java",
    smellType: "God Class",
    startLine: 186,
  },
];
const old = [
  {
    path: "collegeapplication/admin/Admin.java",
    startLine: 20,
    endLine: 40,
    smellType: "Long Method",
  },
  {
    path: "collegeapplication/chat/ChatData.java",
    startLine: 50,
    endLine: 70,
    smellType: "Duplicate Code",
  },
  {
    path: "collegeapplication/faculty/Faculty.java",
    startLine: 50,
    endLine: 70,
    smellType: "Feature Envy",
  },
  {
    path: "collegeapplication/faculty/Faculty.java",
    startLine: 80,
    endLine: 90,
    smellType: "Complex ",
  },
];

const Page = () => {
  const [zipFile, setZipFile] = useState<File | null>(null);
  const [section, setSection] = useState<string>("upload");

  const [report, setReport] = useState(dummy);

  const sections = {
    upload: (
      <UploadFile
        zipFile={zipFile}
        setZipFile={setZipFile}
        setSection={setSection}
        setReport={setReport}
      />
    ),
    report: (
      <Report zipFile={zipFile} report={report} setSection={setSection} />
    ),
    editor: (
      <Editor zipFile={zipFile} report={report} setSection={setSection} />
    ),
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AnimatePresence mode="wait">
        <motion.div
          key={section}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        >
          {section === "upload" && sections.upload}
          {section === "report" && sections.report}
          {section === "editor" && sections.editor}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Page;

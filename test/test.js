"use strict";
import TextLintTester from "textlint-tester";
const tester = new TextLintTester();
import rule from "../src/index";

const errorMessage = "Found doubled spaces.";

tester.run("trim", rule, {
  valid: [
    "Apple Pen",
    "Pen Pineapple Apple Pen",
  ],
  invalid: [
    {
      text: "Apple  pen",
      errors: [
        {
          message: errorMessage,
          line: 1,
          column: 6
        },
      ]
    },
    {
      text: "Pen   Pineapple",
      errors: [
        {
          message: errorMessage,
          line: 1,
          column: 4
        },
      ]
    },
    {
      text: "Pen  Pineapple   Apple  Pen",
      errors: [
        {
          message: errorMessage,
          line: 1,
          column: 4
        },
        {
          message: errorMessage,
          line: 1,
          column: 15
        },
        {
          message: errorMessage,
          line: 1,
          column: 23
        },
      ]
    },
    {
      text: "Pen  Pineapple   Apple  Pen",
      options: {
        allow: ["Pineapple   Apple"],
      },
      errors: [
        {
          message: errorMessage,
          line: 1,
          column: 4
        },
        {
          message: errorMessage,
          line: 1,
          column: 23
        },
      ]
    },
  ]
});

tester.run("line breaks", rule, {
  valid: [
    "Line one.\nLine two.",
    "Line one.\r\nLine two.", // CRLF is a line break, not two spaces
    "> [!NOTE]\r\n> Text.",
    "- item one\n  continued item", // indentation of a continued line
    "- item one\r\n  continued item",
  ],
  invalid: [
    {
      text: "Line one.\r\nLine  two.",
      output: "Line one.\r\nLine two.", // the fix keeps the line break
      errors: [
        {
          message: errorMessage,
          line: 2,
          column: 5
        },
      ]
    },
    {
      text: "- item one\r\n  continued  item",
      output: "- item one\r\n  continued item",
      errors: [
        {
          message: errorMessage,
          line: 2,
          column: 12
        },
      ]
    },
  ]
});

tester.run("allow option", rule, {
  valid: [
    { // single pattern
      text: "Apple  pen",
      options: {
        allow: [
          "/Apple  pen/"
        ]
      }
    },
    { // multiple patterns
      text: "Apple  pen",
      options: {
        allow: [
          "/Apple  pen/",
          "/Pineapple  Apple/",
        ]
      }
    },
  ],
  invalid: [
    {
      text: "Apple  pen",
      errors: [
        {
          message: errorMessage,
          line: 1,
          column: 6
        },
      ]
    },
  ]
});

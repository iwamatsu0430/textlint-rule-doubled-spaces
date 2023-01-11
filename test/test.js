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

import {BlocklyWorkspace} from 'react-blockly';
import Blockly from "blockly";
import { CodeBlockComponentProps } from "./Types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useAppDispatch } from "../Redux/hooks";

const CodeBlockComponent: React.FC<CodeBlockComponentProps> = ({ sx, jsonBlocks, slot, pageNumber }) => {
  const [jsonBlocksInput, setBlocksInput] = React.useState(jsonBlocks);
  const dispatch = useAppDispatch();

  const initialXml =
  '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="text" x="70" y="30"><field name="TEXT"></field></block></xml>';
    const toolboxCategories = {
    kind: "categoryToolbox",
    contents: [
        {
        kind: "category",
        name: "Logic",
        colour: "#5C81A6",
        contents: [
            {
            kind: "block",
            type: "controls_if",
            },
            {
            kind: "block",
            type: "logic_compare",
            },
        ],
        },
        {
        kind: "category",
        name: "Math",
        colour: "#5CA65C",
        contents: [
            {
            kind: "block",
            type: "math_round",
            },
            {
            kind: "block",
            type: "math_number",
            },
        ],
        },
        {
        kind: "category",
        name: "Custom",
        colour: "#5CA699",
        contents: [
            {
            kind: "block",
            type: "new_boundary_function",
            },
            {
            kind: "block",
            type: "return",
            },
        ],
        },
    ],
    };

    return (
        <BlocklyWorkspace
            toolboxConfiguration={toolboxCategories}
            initialXml={initialXml}
            className="fill-height"
            workspaceConfiguration={{
                grid: {
                spacing: 20,
                length: 3,
                colour: "#ccc",
                snap: true,
                },
            }}
        />
    );
}

export default connect(null, {})(CodeBlockComponent);
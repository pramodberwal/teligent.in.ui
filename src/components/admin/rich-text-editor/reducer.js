import { Value } from 'slate';
import {ON_CHANGE} from './actions';
const initialValue = Value.fromJSON({
 document: {
  nodes: [
   {
    object: 'block',
    type: 'paragraph',
    nodes: [
     {
      object: 'text',
      leaves: [
       {
        text: 'A line of text in a paragraph.',
       },
      ],
     },
    ],
   },
  ],
 },
});
let initialState={
 value:initialValue
};

export default function RichTextEditorReducer(state=initialState,action){
 switch(action.type){
 default :
  return state;
 }

}
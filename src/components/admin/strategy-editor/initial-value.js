import {Value} from 'slate';
const summary = JSON.stringify({
 "document": {
  "nodes": [
   {
    "object": "block",
    "type": "paragraph",
    "nodes": [
     {
      "object": "text",
      "leaves": [
       {
        "text": ""
       }
      ]
     }
    ]
   }
  ]
 }
}); 

export const initialSummary = Value.fromJSON(JSON.parse(summary));
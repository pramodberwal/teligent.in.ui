import {Value} from 'slate';
const subjectSummary = JSON.stringify({
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

export const initialSummary = Value.fromJSON(JSON.parse(subjectSummary));
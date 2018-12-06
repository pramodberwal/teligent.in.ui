import {Value} from 'slate';
const questionDescription = JSON.stringify({
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
        text: 'Desc',
       },
      ],
     },
    ],
   },
  ],
 },
}); 
const optionA= JSON.stringify({
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
        text: 'OptionA',
       },
      ],
     },
    ],
   },
  ],
 },
}); 
const optionB= JSON.stringify({
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
        text: 'OptionB',
       },
      ],
     },
    ],
   },
  ],
 },
}); 
const optionC= JSON.stringify({
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
        text: 'OptionC',
       },
      ],
     },
    ],
   },
  ],
 },
}); 
const optionD= JSON.stringify({
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
        text: 'OptionD',
       },
      ],
     },
    ],
   },
  ],
 },
});  
export const defaultValues = {
 desc:Value.fromJSON(JSON.parse(questionDescription)),
 optionA:Value.fromJSON(JSON.parse(optionA)),
 optionB:Value.fromJSON(JSON.parse(optionB)),
 optionC:Value.fromJSON(JSON.parse(optionC)),
 optionD:Value.fromJSON(JSON.parse(optionD)),
 answer:'',
 typeId:'',
 subjectId:'',
 chapterId:'',
 topicId:'',
 complexityLevel:'1',
 tags:[{name:'',value:''}]  
};


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
        text: 'Default question for testing?',
       },
      ],
     },
    ],
   },
  ],
 },
}); 
const optionADesc = JSON.stringify({
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
        text: 'Option A',
       },
      ],
     },
    ],
   },
  ],
 },
});
const optionBDesc = JSON.stringify({
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
        text: 'Option B',
       },
      ],
     },
    ],
   },
  ],
 },
}); 
const optionCDesc = JSON.stringify({
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
        text: 'Option C',
       },
      ],
     },
    ],
   },
  ],
 },
}); 
const optionDDesc = JSON.stringify({
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
        text: 'Option D',
       },
      ],
     },
    ],
   },
  ],
 },
});

export const defaultQuestion = {
 id:1,
 subject:1,
 chapter:1,
 desc:questionDescription,
 type:1,
 optionA:optionADesc,
 optionB:optionBDesc,
 optionC:optionCDesc,
 optionD:optionDDesc, 
 tags:[{name:'',value:''}]  
};

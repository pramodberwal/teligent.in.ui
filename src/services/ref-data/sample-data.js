
export const  courses=[{
 id:1,
 code:'iit',
 name:'IIT',
},{
 id:2,
 code:'neet',
 name:'NEET',
}];
   
   
   
export const  subjects=[
 {
  id:1,
  code:'physics',
  name:'Physics',
 },
 {
  id:2,
  code:'chemistry',
  name:'Chemistry',
 },
 {
  id:3,
  code:'mathmatics',
  name:'Mathmatics',
 },
 {
  id:4,
  code:'botany',
  name:'Botany',
 },
 {
  id:5,
  code:'zoology',
  name:'Zoology',
 },
];
   
export let course_subject_mapping ={
 iit:['physics','chemistry','mathmatics'],
 neet:['physics','chemistry','botany','zoology'],
};
   
export let chapters = [
 {
  id:1,
  code:'ch01',
  subject:'physics',
  name:'Physics Chapter -1',
  videos:[{name:'Part-1',url:'link'},{name:'Part-2',url:'link'}],
 },
 {
  id:2,
  code:'ch01',
  subject:'mathmatics',
  name:'Mathmatics Chapter -1',
  videos:[{name:'Part-1',url:'link'},{name:'Part-2',url:'link'}],
 },
 {
  id:3,
  code:'ch01',
  subject:'chemistry',
  name:'Chemistry Chapter -1',
  videos:[{name:'Part-1',url:'link'},{name:'Part-2',url:'link'}],
 },
 {
  id:4,
  code:'ch01',
  subject:'botany',
  name:'Botany Chapter -1',
  videos:[{name:'Part-1',url:'link'},{name:'Part-2',url:'link'}],
 },
 {
  id:5,
  code:'ch01',
  subject:'zoology',
  name:'Zoology Chapter -1',
  videos:[{name:'Part-1',url:'link'},{name:'Part-2',url:'link'}],
 },
 {
  id:6,
  code:'ch02',
  subject:'zoology',
  name:'Zoology Chapter -2 New',
  videos:[{name:'Part-1',url:'link'},{name:'Part-2',url:'link'}],
 },
];
   
export let questions=[{
 id:1,
 subject:'physics',
 chapter:'ch01',
 desc:'Question 1?',
 type:'single_choice',
 images:[{name:'Figure1',src:'src'},{name:'Figure2',src:'src'}],
 options:[
  {value:'A',
   desc:'OptionA',
   image:[{name:'Figure1',src:'src'}]
  },
  {value:'B',
   desc:'OptionB',
   image:[{name:'Figure1',src:'src'}]
  },
  {value:'C',
   desc:'OptionC',
   image:[{name:'Figure1',src:'src'}]
  },
  {value:'D',
   desc:'OptionD',
   image:[{name:'Figure1',src:'src'}]
  },
 ],
 tags:[{name:'level',value:'basic'}]  
},
{
 id:2,
 subject:'physics',
 chapter:'ch01',
 desc:'Question 1?',
 type:'single_choice',
 images:[{name:'Figure1',src:'src'},{name:'Figure2',src:'src'}],
 options:[
  {value:'A',
   desc:'OptionA',
   image:[{name:'Figure1',src:'src'}]
  },
  {value:'B',
   desc:'OptionB',
   image:[{name:'Figure1',src:'src'}]
  },
  {value:'C',
   desc:'OptionC',
   image:[{name:'Figure1',src:'src'}]
  },
  {value:'D',
   desc:'OptionD',
   image:[{name:'Figure1',src:'src'}]
  },
 ],
 tags:[{name:'level',value:'basic'}]  
}];
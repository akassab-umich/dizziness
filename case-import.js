(function(root){
 'use strict';
 const norm=v=>String(v??'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
 function parse(value,questions,filename='case.json'){
  if(value?.format==='nebula-patient-case'&&value.answers&&value.patient){
   const answers={};for(const q of questions){const values=[value.answers[q.id]].flat().filter(v=>v!=null);if(q.options&&values.length&&values.every(v=>q.options.includes(v))&&(q.kind==='multi'||values.length===1))answers[q.id]=q.kind==='multi'?values:values[0];}
   return {answers,caseId:value.patient.anonymous_id||filename.replace(/\.json$/i,''),age:value.patient.age,sex:value.patient.sex||'',recorded:value.patient.recorded_labels||[],sources:value.Sources||[],issues:[]};
  }
  if(!value||!Array.isArray(value.Responses)||!Array.isArray(value.Sources)||!value.Sources.length)throw Error('Choose a patient JSON exported by WolverineDataExtractor.');
  const answers={},issues=[],byPrompt=new Map(questions.map(q=>[norm(q.prompt),q]));
  const aliases={'259372':{'stress':'stress, nerves, or anxiety','nerves or anxiety':'stress, nerves, or anxiety','supermarket aisles':'supermarket aisles, malls, or tunnels','malls':'supermarket aisles, malls, or tunnels','tunnels':'supermarket aisles, malls, or tunnels'},'259381':{'panic feeling or a sudden need to leave a place':'panic feeling or sudden need to leave a place'}};
  for(const response of value.Responses){
   const q=byPrompt.get(norm(response.Question)); if(!q||!['single','multi'].includes(q.kind))continue;
   if(!Array.isArray(response.Answers))throw Error('Invalid Answers list.');
   const options=[];
   for(const raw of response.Answers){const key=norm(raw),match=q.options.find(o=>norm(o)===key)||aliases[q.id]?.[key];if(match&&q.options.includes(match)){if(!options.includes(match))options.push(match);}else issues.push({question:q.id,answer:String(raw),reason:'Option not recognized'});}
   if(options.length>1&&options.some(a=>norm(a)==='none of the above')){issues.push({question:q.id,answer:options.join('; '),reason:'None of the above conflicts with other selections'});continue;}
   if(q.kind==='multi'&&options.length)answers[q.id]=options;
   else if(options.length===1)answers[q.id]=options[0];
   else if(options.length>1)issues.push({question:q.id,answer:options.join('; '),reason:'More than one answer for a single-choice question'});
  }
  const labels={'VMigraine':'Migraine','Menieres':"Meniere's",'NeuritisHypofunction':'Neuritis','ScCD':'Third Window','Bilateral wkns':'Bilateral'};
  const age=value.Age==null||value.Age===''?null:Number(value.Age);
  if(age!==null&&(!Number.isInteger(age)||age<0||age>120))throw Error('Invalid age in patient file.');
  for(const q of questions)if(q.showWhen&&!([answers[q.showWhen.questionId]].flat().map(norm).includes(norm(q.showWhen.answer))))delete answers[q.id];
  return {answers,caseId:filename.replace(/\.json$/i,''),age,sex:({female:'Female',male:'Male'})[norm(value.Gender)]||'',recorded:(value.Diagnoses||[]).map(v=>labels[v]||v),sources:value.Sources,issues};
 }
 if(typeof module==='object'&&module.exports)module.exports={parse};
 else {root.LasseCase={parse};document.addEventListener('DOMContentLoaded',()=>{
  const actions=document.getElementById('case-actions'),button=document.createElement('button'),input=document.createElement('input'),info=document.createElement('div');
  button.textContent='Upload JSON';input.type='file';input.accept='.json,application/json';input.hidden=true;info.id='case-source';info.style.cssText='font-size:12px;white-space:normal;padding:4px 10px';
  actions.prepend(button,input);document.getElementById('patient-strip').after(info);
  const load=async file=>{if(!document.getElementById('access-gate').hidden)return;try{if(file.size>5000000)throw Error('Patient JSON is too large.');const c=parse(JSON.parse(await file.text()),root.NEBULA_DATA.questions,file.name);root.NebulaApp.loadCase(c);info.textContent=c.sources.map(s=>`${s.SourceFile||'Latest workbook'} · ${s.SheetName} · case ${s.PatientNumber} · rows ${s.StartRow}–${s.EndRow}`).join(' | ');if(c.issues.length){const details=document.createElement('details'),summary=document.createElement('summary');summary.textContent=`${c.issues.length} answers could not be scored`;details.append(summary);for(const issue of c.issues){const p=document.createElement('p');p.textContent=`Q${issue.question}: ${issue.answer} (${issue.reason})`;details.append(p);}info.append(details);}}catch(e){info.textContent=e.message;}};
  button.onclick=()=>input.click();input.onchange=()=>{if(input.files[0])load(input.files[0]);input.value='';};
  document.addEventListener('dragover',e=>{if(e.dataTransfer.types.includes('Files'))e.preventDefault();});
  document.addEventListener('drop',e=>{if(e.dataTransfer.types.includes('Files')){e.preventDefault();if(e.dataTransfer.files.length===1)load(e.dataTransfer.files[0]);}});
  document.addEventListener('nebula:case-reset',()=>info.textContent='');
 });}
})(typeof window==='undefined'?globalThis:window);

import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
export type WorkspaceRecord={id:string;organisationId:string;module:string;title:string;detail:string;status:"PLANNED"|"ACTIVE"|"COMPLETED";updatedAt:string};
const directory=path.join(process.cwd(),"data"),file=path.join(directory,"workspace-records.json");let queue=Promise.resolve();
async function readAll():Promise<WorkspaceRecord[]>{try{return JSON.parse(await readFile(file,"utf8"))}catch(error){if((error as NodeJS.ErrnoException).code==="ENOENT")return[];throw error}}
async function persist(items:WorkspaceRecord[]){await mkdir(directory,{recursive:true});const temp=`${file}.${process.pid}.tmp`;await writeFile(temp,JSON.stringify(items,null,2),"utf8");await rename(temp,file)}
function exclusive<T>(work:()=>Promise<T>):Promise<T>{const run=queue.then(work,work);queue=run.then(()=>undefined,()=>undefined);return run}
export async function listRecords(org:string,module:string){return(await readAll()).filter(item=>item.organisationId===org&&item.module===module)}
export async function createRecord(input:Omit<WorkspaceRecord,"id"|"updatedAt">){return exclusive(async()=>{const items=await readAll();const record={...input,id:crypto.randomUUID(),updatedAt:new Date().toISOString()};items.unshift(record);await persist(items);return record})}
export async function updateRecord(org:string,id:string,input:Pick<WorkspaceRecord,"title"|"detail"|"status">){return exclusive(async()=>{const items=await readAll(),index=items.findIndex(item=>item.id===id&&item.organisationId===org);if(index<0)return null;items[index]={...items[index],...input,updatedAt:new Date().toISOString()};await persist(items);return items[index]})}
export async function deleteRecord(org:string,id:string){return exclusive(async()=>{const items=await readAll(),next=items.filter(item=>!(item.id===id&&item.organisationId===org));if(next.length===items.length)return false;await persist(next);return true})}

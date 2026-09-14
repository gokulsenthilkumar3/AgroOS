import { NextResponse } from "next/server";
import { z } from "zod";
import { apiError } from "@/lib/api";
import { isOriginAllowed,requireSession } from "@/lib/auth";
import { createRecord,listRecords } from "@/lib/record-repository";
import { allowRequest } from "@/lib/rate-limit";
const input=z.object({module:z.string().regex(/^[a-z-]{2,40}$/),title:z.string().trim().min(2).max(100),detail:z.string().trim().max(500),status:z.enum(["PLANNED","ACTIVE","COMPLETED"]).default("ACTIVE")});
const verified=(r:Request)=>isOriginAllowed(r)&&r.headers.get("x-csrf-token")===r.headers.get("cookie")?.match(/agroos_csrf=([^;]+)/)?.[1];
export async function GET(r:Request){try{const user=await requireSession(),module=new URL(r.url).searchParams.get("module")??"";if(!/^[a-z-]{2,40}$/.test(module))return apiError(400,"VALIDATION_ERROR","Select a valid module.");return NextResponse.json({items:await listRecords(user.organisationId,module)})}catch{return apiError(401,"UNAUTHENTICATED","Sign in is required.")}}
export async function POST(r:Request){try{const user=await requireSession();if(!verified(r))return apiError(403,"CSRF_REJECTED","Request verification failed.");if(!allowRequest(`records:${user.id}`,30,60000))return apiError(429,"RATE_LIMITED","Please wait before trying again.");const parsed=input.safeParse(await r.json());if(!parsed.success)return apiError(400,"VALIDATION_ERROR","Provide valid record values.");const item=await createRecord({...parsed.data,organisationId:user.organisationId});console.info(JSON.stringify({event:"workspace_record.created",recordId:item.id,module:item.module,actorId:user.id}));return NextResponse.json({item},{status:201})}catch{return apiError(401,"UNAUTHENTICATED","Sign in is required.")}}

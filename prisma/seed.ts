import { PrismaClient, Role, UnitCategory } from "@prisma/client";
const db = new PrismaClient();
async function main() {
  const organisation = await db.organisation.upsert({ where:{slug:"green-valley"}, update:{}, create:{name:"Green Valley Collective",slug:"green-valley"} });
  const manager = await db.user.upsert({ where:{email:"anika@hydrogrow.demo"}, update:{}, create:{clerkId:"demo_anika",email:"anika@hydrogrow.demo",name:"Anika Sharma"} });
  await db.membership.upsert({ where:{userId_organisationId:{userId:manager.id,organisationId:organisation.id}}, update:{role:Role.MANAGER}, create:{userId:manager.id,organisationId:organisation.id,role:Role.MANAGER} });
  const farm = await db.farm.create({ data:{organisationId:organisation.id,name:"Sahyadri Integrated Farm",type:"Mixed farm",location:"Pune, Maharashtra",areaValue:12,areaUnit:"acre"} });
  const templates = [{name:"Dairy herd",category:UnitCategory.DAIRY,key:"cattle"},{name:"Free-range poultry",category:UnitCategory.POULTRY,key:"poultry"},{name:"Coconut grove",category:UnitCategory.CROP,key:"horticulture"},{name:"Greenhouse A",category:UnitCategory.GREENHOUSE,key:"protected"},{name:"Honey apiary",category:UnitCategory.APICULTURE,key:"apiary"},{name:"Fish pond 1",category:UnitCategory.AQUACULTURE,key:"aquaculture"}];
  for (const item of templates) await db.productionUnit.create({data:{farmId:farm.id,name:item.name,category:item.category,templateKey:item.key,attributes:{seeded:true}}});
  await db.product.createMany({data:[{organisationId:organisation.id,name:"A2 farm milk",category:"Dairy",price:78,stock:240,unit:"L"},{organisationId:organisation.id,name:"Raw forest honey",category:"Apiary",price:420,stock:32,unit:"500g"},{organisationId:organisation.id,name:"Free-range eggs",category:"Poultry",price:210,stock:1248,unit:"dozen"}]});
  console.log("AgroOS production fixtures seeded.");
}
main().finally(()=>db.$disconnect());

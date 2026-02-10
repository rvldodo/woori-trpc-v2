import { branchesRouter } from "./branches_router";
import { complainTypeRouter } from "./complaint-type_router";
import { complaintsRouter } from "./complaints_router";
import { faqRouter } from "./faqs_router";
import { globalParamsRouter } from "./global-params_router";
import { heroRouter } from "./hero_router";
import { menusRouter } from "./menus_router";
import { milestonesRouter } from "./milestone_router";
import { procurementRouter } from "./procurement_router";
import { productsRouter } from "./products_router";
import { profileCompanyRouter } from "./profile_router";
import { promosRouter } from "./promos_router";
import { uspRouter } from "./usp_router";
import { visiMisiRouter } from "./visi-misi_router";

export const main = {
  faqs: faqRouter,
  menus: menusRouter,
  products: productsRouter,
  globalParams: globalParamsRouter,
  usp: uspRouter,
  promos: promosRouter,
  hero: heroRouter,
  profilCompany: profileCompanyRouter,
  visiMisi: visiMisiRouter,
  milestones: milestonesRouter,
  procurements: procurementRouter,
  branches: branchesRouter,
  complaintType: complainTypeRouter,
  complaints: complaintsRouter,
};

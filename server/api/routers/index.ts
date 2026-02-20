import { aboutUsRouter } from "./about-us_router";
import { boardsRouter } from "./board_router";
import { branchesRouter } from "./branches_router";
import { complainTypeRouter } from "./complaint-type_router";
import { complaintsRouter } from "./complaints_router";
import { faqRouter } from "./faqs_router";
import { globalParamsRouter } from "./global-params_router";
import { heroRouter } from "./hero_router";
import { menusRouter } from "./menus_router";
import { milestonesRouter } from "./milestone_router";
import { paymentMethodRouter } from "./payment-method_router";
import { procurementRouter } from "./procurement_router";
import { productsRouter } from "./products_router";
import { profileCompanyRouter } from "./profile_router";
import { promosRouter } from "./promos_router";
import { publikasiRouter } from "./publications_router";
import { riplayRouter } from "./riplay_router";
import { template3Router } from "./template3_router";
import { template4Router } from "./template4_router";
import { template6Router } from "./template6_router";
import { template7Router } from "./template7_router";
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
  publications: publikasiRouter,
  paymentMethods: paymentMethodRouter,
  riplay: riplayRouter,
  template3: template3Router,
  template4: template4Router,
  template6: template6Router,
  template7: template7Router,
  boards: boardsRouter,
  aboutUs: aboutUsRouter,
};

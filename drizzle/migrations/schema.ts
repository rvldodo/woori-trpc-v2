import {
  pgTable,
  serial,
  timestamp,
  varchar,
  json,
  text,
  boolean,
  integer,
  unique,
  foreignKey,
  date,
  pgEnum,
} from "drizzle-orm/pg-core";
import { Locale } from "next-intl";

// Type definitions for locale-based content
type LocaleContent = Record<Locale, string> & { id: string };
type LocaleContentOptional = Record<Locale, string>;

export const adminStatus = pgEnum("admin_status", ["ACTIVE", "INACTIVE"]);
export const boardType = pgEnum("board_type", ["DIREKSI", "KOMISARIS"]);
export const branchesType = pgEnum("branches_type", ["HE", "ALL"]);
export const paymentType = pgEnum("payment_type", [
  "BANK TRANSFER",
  "VIRTUAL ACCOUNT",
  "MINIMARKET",
  "E-COMMERCE",
  "E-WALLET",
]);
export const roles = pgEnum("roles", ["SUPER_ADMIN", "ADMIN", "EDITOR"]);
export const userType = pgEnum("user_type", ["INDIVIDU", "KORPORAT"]);

export const boards = pgTable("boards", {
  id: serial().primaryKey().notNull(),
  createdTime: timestamp("created_time", { mode: "string" })
    .defaultNow()
    .notNull(),
  updatedTime: timestamp("updated_time", { mode: "string" }),
  deletedTime: timestamp("deleted_time", { mode: "string" }),
  boardType: boardType("board_type"),
  name: varchar({ length: 100 }),
  title: json().$type<LocaleContentOptional>(),
  text: json().$type<LocaleContentOptional>(),
  imgUrl: text("img_url"),
});

export const coordinates = pgTable("coordinates", {
  id: serial().primaryKey().notNull(),
  createdTime: timestamp("created_time", { mode: "string" })
    .defaultNow()
    .notNull(),
  updatedTime: timestamp("updated_time", { mode: "string" }),
  deletedTime: timestamp("deleted_time", { mode: "string" }),
  title: varchar({ length: 100 }),
  idLocation: varchar("id_location", { length: 100 }),
  coordinate: text(),
});

export const faqs = pgTable("faqs", {
  id: serial().primaryKey().notNull(),
  createdTime: timestamp("created_time", { mode: "string" })
    .defaultNow()
    .notNull(),
  updatedTime: timestamp("updated_time", { mode: "string" }),
  deletedTime: timestamp("deleted_time", { mode: "string" }),
  question: json().$type<LocaleContentOptional>(),
  answer: json().$type<LocaleContentOptional>(),
  type: json().$type<LocaleContentOptional>(),
  tags: varchar({ length: 100 }),
  isMain: boolean("is_main").default(false),
});

export const branches = pgTable("branches", {
  id: serial().primaryKey().notNull(),
  createdTime: timestamp("created_time", { mode: "string" })
    .defaultNow()
    .notNull(),
  updatedTime: timestamp("updated_time", { mode: "string" }),
  deletedTime: timestamp("deleted_time", { mode: "string" }),
  name: json().$type<LocaleContentOptional>(),
  phoneNumber: varchar("phone_number", { length: 100 }),
  fax: varchar({ length: 100 }),
  type: branchesType().default("ALL"),
  coordinateId: integer("coordinate_id").array().notNull(),
  category: varchar({ length: 100 }),
  lat: text(),
  long: text(),
  address: varchar({ length: 255 }),
  maxiId: varchar("maxi_id", { length: 100 }),
  imageUrl: text("image_url"),
});

export const admins = pgTable(
  "admins",
  {
    id: serial().primaryKey().notNull(),
    password: text().notNull(),
    status: adminStatus().default("ACTIVE"),
    createdTime: timestamp("created_time", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedTime: timestamp("updated_time", { mode: "string" })
      .defaultNow()
      .notNull(),
    deletedTime: timestamp("deleted_time", { mode: "string" }),
    name: varchar({ length: 100 }),
    loginId: varchar("login_id", { length: 100 }).notNull(),
    roleId: integer(),
  },
  (table) => [unique("admins_login_id_unique").on(table.loginId)],
);

export const complaintTypes = pgTable("complaint-types", {
  id: serial().primaryKey().notNull(),
  createdTime: timestamp("created_time", { mode: "string" })
    .defaultNow()
    .notNull(),
  updatedTime: timestamp("updated_time", { mode: "string" }),
  deletedTime: timestamp("deleted_time", { mode: "string" }),
  type: json().$type<LocaleContentOptional>(),
  isActive: boolean("is_active").default(true),
});

export const globalParams = pgTable("global_params", {
  id: serial().primaryKey().notNull(),
  createdTime: timestamp("created_time", { mode: "string" })
    .defaultNow()
    .notNull(),
  updatedTime: timestamp("updated_time", { mode: "string" }),
  deletedTime: timestamp("deleted_time", { mode: "string" }),
  key: varchar({ length: 100 }),
  value: text(),
  description: text(),
});

export const milestones = pgTable("milestones", {
  id: serial().primaryKey().notNull(),
  createdTime: timestamp("created_time", { mode: "string" })
    .defaultNow()
    .notNull(),
  updatedTime: timestamp("updated_time", { mode: "string" }),
  deletedTime: timestamp("deleted_time", { mode: "string" }),
  year: integer(),
  content: json().$type<LocaleContentOptional>(),
  isActive: boolean("is_active"),
});

export const products = pgTable("products", {
  id: serial().primaryKey().notNull(),
  createdTime: timestamp("created_time", { mode: "string" })
    .defaultNow()
    .notNull(),
  updatedTime: timestamp("updated_time", { mode: "string" }),
  deletedTime: timestamp("deleted_time", { mode: "string" }),
  title: json().$type<LocaleContentOptional>(),
  description: json().$type<LocaleContentOptional>(),
  iconUrl: text("icon_url"),
  redirectUrl: text("redirect_url"),
  isActive: boolean("is_active").default(false),
});

export const news = pgTable("news", {
  id: serial().primaryKey().notNull(),
  createdTime: timestamp("created_time", { mode: "string" })
    .defaultNow()
    .notNull(),
  updatedTime: timestamp("updated_time", { mode: "string" }),
  deletedTime: timestamp("deleted_time", { mode: "string" }),
  title: json().$type<LocaleContentOptional>(),
  content: json().$type<LocaleContentOptional>(),
  imgUrl: text("img_url"),
});

export const visiMisi = pgTable("visi_misi", {
  id: serial().primaryKey().notNull(),
  createdTime: timestamp("created_time", { mode: "string" })
    .defaultNow()
    .notNull(),
  updatedTime: timestamp("updated_time", { mode: "string" }),
  deletedTime: timestamp("deleted_time", { mode: "string" }),
  type: json().$type<LocaleContentOptional>(),
  content: json().$type<LocaleContentOptional>(),
});

export const kebijakanPrivasi = pgTable("kebijakan-privasi", {
  id: serial().primaryKey().notNull(),
  createdTime: timestamp("created_time", { mode: "string" })
    .defaultNow()
    .notNull(),
  updatedTime: timestamp("updated_time", { mode: "string" }),
  deletedTime: timestamp("deleted_time", { mode: "string" }),
  content: json().$type<LocaleContentOptional>(),
});

export const modalSeasonal = pgTable("modal_seasonal", {
  id: serial().primaryKey().notNull(),
  createdTime: timestamp("created_time", { mode: "string" })
    .defaultNow()
    .notNull(),
  updatedTime: timestamp("updated_time", { mode: "string" }),
  deletedTime: timestamp("deleted_time", { mode: "string" }),
  imageUrl: text("image_url"),
  isActive: boolean("is_active").default(false),
  expiredDate: timestamp("expired_date", { mode: "string" }),
});

export const loanSimulations = pgTable(
  "loan_simulations",
  {
    id: serial().primaryKey().notNull(),
    createdTime: timestamp("created_time", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedTime: timestamp("updated_time", { mode: "string" }),
    deletedTime: timestamp("deleted_time", { mode: "string" }),
    userType: userType("user_type"),
    email: varchar({ length: 100 }),
    phoneNumber: varchar("phone_number", { length: 100 }),
    companyName: varchar("company_name", { length: 100 }),
    loanTypeId: integer("loan_type_id").notNull(),
    carPrice: integer("car_price"),
    clientLocation: varchar("client_location", { length: 100 }),
    carBrand: varchar("car_brand", { length: 255 }),
    carModel: varchar("car_model", { length: 255 }),
    carType: varchar("car_type", { length: 255 }),
    carYear: integer("car_year"),
    insuranceType: varchar("insurance_type", { length: 100 }),
    tdpPrice: integer("tdp_price"),
    dpPrice: integer("dp_price"),
    tenorMonth: integer("tenor_month"),
    name: varchar({ length: 100 }),
    branchId: integer("branch_id").notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.loanTypeId],
      foreignColumns: [loanTypes.id],
      name: "loan_simulations_loan_type_id_loan_types_id_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.branchId],
      foreignColumns: [branches.id],
      name: "loan_simulations_branch_id_branches_id_fk",
    }).onDelete("cascade"),
  ],
);

export const files = pgTable("files", {
  id: serial().primaryKey().notNull(),
  createdTime: timestamp("created_time", { mode: "string" })
    .defaultNow()
    .notNull(),
  updatedTime: timestamp("updated_time", { mode: "string" }),
  deletedTime: timestamp("deleted_time", { mode: "string" }),
  name: json().$type<LocaleContentOptional>(),
  fileUrl: text("file_url"),
  meta: text(),
});

export const userOtp = pgTable("user_otp", {
  id: serial().primaryKey().notNull(),
  createdTime: timestamp("created_time", { mode: "string" })
    .defaultNow()
    .notNull(),
  updatedTime: timestamp("updated_time", { mode: "string" }),
  deletedTime: timestamp("deleted_time", { mode: "string" }),
  phoneNumber: varchar("phone_number", { length: 50 }),
  counter: integer(),
});

export const mainNavbar = pgTable("main_navbar", {
  id: serial().primaryKey().notNull(),
  createdTime: timestamp("created_time", { mode: "string" })
    .defaultNow()
    .notNull(),
  updatedTime: timestamp("updated_time", { mode: "string" }),
  deletedTime: timestamp("deleted_time", { mode: "string" }),
  header: json().$type<LocaleContent>(),
  isActive: boolean("is_active"),
});

export const heros = pgTable(
  "heros",
  {
    id: serial().primaryKey().notNull(),
    createdTime: timestamp("created_time", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedTime: timestamp("updated_time", { mode: "string" }),
    deletedTime: timestamp("deleted_time", { mode: "string" }),
    imgUrl: text("img_url"),
    title: json().$type<LocaleContentOptional>(),
    description: json().$type<LocaleContentOptional>(),
    mainNavbarId: integer("main_navbar_id").notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.mainNavbarId],
      foreignColumns: [mainNavbar.id],
      name: "heros_main_navbar_id_main_navbar_id_fk",
    }).onDelete("cascade"),
  ],
);

export const loanTypes = pgTable("loan_types", {
  id: serial().primaryKey().notNull(),
  createdTime: timestamp("created_time", { mode: "string" })
    .defaultNow()
    .notNull(),
  updatedTime: timestamp("updated_time", { mode: "string" }),
  deletedTime: timestamp("deleted_time", { mode: "string" }),
  name: varchar({ length: 100 }),
});

export const usp = pgTable(
  "usp",
  {
    id: serial().primaryKey().notNull(),
    createdTime: timestamp("created_time", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedTime: timestamp("updated_time", { mode: "string" }),
    deletedTime: timestamp("deleted_time", { mode: "string" }),
    title: json().$type<LocaleContentOptional>(),
    description: json().$type<LocaleContentOptional>(),
    loanTypeId: integer("loan_type_id").notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.loanTypeId],
      foreignColumns: [loanTypes.id],
      name: "usp_loan_type_id_loan_types_id_fk",
    }).onDelete("cascade"),
  ],
);

export const uspCards = pgTable(
  "usp_cards",
  {
    id: serial().primaryKey().notNull(),
    createdTime: timestamp("created_time", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedTime: timestamp("updated_time", { mode: "string" }),
    deletedTime: timestamp("deleted_time", { mode: "string" }),
    prefixIcon: text("prefix_icon"),
    suffixIcon: text("suffix_icon"),
    text: json().$type<LocaleContentOptional>(),
    uspId: integer("usp_id").notNull(),
    redirectUrl: text("redirect_url"),
  },
  (table) => [
    foreignKey({
      columns: [table.uspId],
      foreignColumns: [usp.id],
      name: "usp_cards_usp_id_usp_id_fk",
    }).onDelete("cascade"),
  ],
);

export const subNavbar = pgTable(
  "sub_navbar",
  {
    id: serial().primaryKey().notNull(),
    createdTime: timestamp("created_time", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedTime: timestamp("updated_time", { mode: "string" }),
    deletedTime: timestamp("deleted_time", { mode: "string" }),
    subnavbar: json().$type<LocaleContentOptional>(),
    mainNavbarId: integer("main_navbar_id").notNull(),
    isActive: boolean("is_active"),
  },
  (table) => [
    foreignKey({
      columns: [table.mainNavbarId],
      foreignColumns: [mainNavbar.id],
      name: "sub_navbar_main_navbar_id_main_navbar_id_fk",
    }).onDelete("cascade"),
  ],
);

export const template1 = pgTable(
  "template_1",
  {
    id: serial().primaryKey().notNull(),
    createdTime: timestamp("created_time", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedTime: timestamp("updated_time", { mode: "string" }),
    deletedTime: timestamp("deleted_time", { mode: "string" }),
    title: json().$type<LocaleContentOptional>(),
    imgUrl: text("img_url"),
    subNavbarId: integer("sub_navbar_id"),
  },
  (table) => [
    foreignKey({
      columns: [table.subNavbarId],
      foreignColumns: [subNavbar.id],
      name: "template_1_sub_navbar_id_sub_navbar_id_fk",
    }),
  ],
);

export const template2 = pgTable(
  "template_2",
  {
    id: serial().primaryKey().notNull(),
    createdTime: timestamp("created_time", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedTime: timestamp("updated_time", { mode: "string" }),
    deletedTime: timestamp("deleted_time", { mode: "string" }),
    title: json().$type<LocaleContentOptional>(),
    description: json().$type<LocaleContentOptional>(),
    subNavbarId: integer("sub_navbar_id").notNull(),
    subNavbarTabId: integer("sub_navbar_tab_id").notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.subNavbarId],
      foreignColumns: [subNavbar.id],
      name: "template_2_sub_navbar_id_sub_navbar_id_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.subNavbarTabId],
      foreignColumns: [subNavbarTabs.id],
      name: "template_2_sub_navbar_tab_id_sub_navbar_tabs_id_fk",
    }).onDelete("cascade"),
  ],
);

export const subNavbarTabs = pgTable(
  "sub_navbar_tabs",
  {
    id: serial().primaryKey().notNull(),
    createdTime: timestamp("created_time", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedTime: timestamp("updated_time", { mode: "string" }),
    deletedTime: timestamp("deleted_time", { mode: "string" }),
    tabs: json().$type<LocaleContentOptional>(),
    subNavbarId: integer("sub_navbar_id").notNull(),
    isActive: boolean("is_active"),
  },
  (table) => [
    foreignKey({
      columns: [table.subNavbarId],
      foreignColumns: [subNavbar.id],
      name: "sub_navbar_tabs_sub_navbar_id_sub_navbar_id_fk",
    }).onDelete("cascade"),
  ],
);

export const template3 = pgTable(
  "template_3",
  {
    id: serial().primaryKey().notNull(),
    createdTime: timestamp("created_time", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedTime: timestamp("updated_time", { mode: "string" }),
    deletedTime: timestamp("deleted_time", { mode: "string" }),
    title: json().$type<LocaleContentOptional>(),
    companyName: json("company_name").$type<LocaleContentOptional>(),
    address: text(),
    subNavbarId: integer("sub_navbar_id").notNull(),
    subNavbarTabId: integer("sub_navbar_tab_id"),
  },
  (table) => [
    foreignKey({
      columns: [table.subNavbarId],
      foreignColumns: [subNavbar.id],
      name: "template_3_sub_navbar_id_sub_navbar_id_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.subNavbarTabId],
      foreignColumns: [subNavbarTabs.id],
      name: "template_3_sub_navbar_tab_id_sub_navbar_tabs_id_fk",
    }).onDelete("cascade"),
  ],
);

export const template4 = pgTable(
  "template_4",
  {
    id: serial().primaryKey().notNull(),
    createdTime: timestamp("created_time", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedTime: timestamp("updated_time", { mode: "string" }),
    deletedTime: timestamp("deleted_time", { mode: "string" }),
    title: json().$type<LocaleContentOptional>(),
    imgUrl: text("img_url"),
    subNavbarId: integer("sub_navbar_id").notNull(),
    subNavbarTabId: integer("sub_navbar_tab_id"),
  },
  (table) => [
    foreignKey({
      columns: [table.subNavbarId],
      foreignColumns: [subNavbar.id],
      name: "template_4_sub_navbar_id_sub_navbar_id_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.subNavbarTabId],
      foreignColumns: [subNavbarTabs.id],
      name: "template_4_sub_navbar_tab_id_sub_navbar_tabs_id_fk",
    }).onDelete("cascade"),
  ],
);

export const template5 = pgTable(
  "template_5",
  {
    id: serial().primaryKey().notNull(),
    createdTime: timestamp("created_time", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedTime: timestamp("updated_time", { mode: "string" }),
    deletedTime: timestamp("deleted_time", { mode: "string" }),
    title: json().$type<LocaleContentOptional>(),
    subNavbarTabsId: integer("sub_navbar_tabs_id").notNull(),
    imgUrl: text("img_url"),
    subNavbarId: integer("sub_navbar_id").notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.subNavbarTabsId],
      foreignColumns: [subNavbarTabs.id],
      name: "template_5_sub_navbar_tabs_id_sub_navbar_tabs_id_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.subNavbarId],
      foreignColumns: [subNavbar.id],
      name: "template_5_sub_navbar_id_sub_navbar_id_fk",
    }).onDelete("cascade"),
  ],
);

export const template6 = pgTable(
  "template_6",
  {
    id: serial().primaryKey().notNull(),
    createdTime: timestamp("created_time", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedTime: timestamp("updated_time", { mode: "string" }),
    deletedTime: timestamp("deleted_time", { mode: "string" }),
    title: json().$type<LocaleContentOptional>(),
    category: json().$type<LocaleContentOptional>(),
    subNavbarId: integer("sub_navbar_id").notNull(),
    subNavbarTabId: integer("sub_navbar_tab_id").notNull(),
    fileUrl: text("file_url"),
    content: json().$type<LocaleContentOptional>(),
  },
  (table) => [
    foreignKey({
      columns: [table.subNavbarId],
      foreignColumns: [subNavbar.id],
      name: "template_6_sub_navbar_id_sub_navbar_id_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.subNavbarTabId],
      foreignColumns: [subNavbarTabs.id],
      name: "template_6_sub_navbar_tab_id_sub_navbar_tabs_id_fk",
    }).onDelete("cascade"),
  ],
);

export const template6Files = pgTable(
  "template_6_files",
  {
    id: serial().primaryKey().notNull(),
    createdTime: timestamp("created_time", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedTime: timestamp("updated_time", { mode: "string" }),
    deletedTime: timestamp("deleted_time", { mode: "string" }),
    title: json().$type<LocaleContentOptional>(),
    template6Id: integer("template_6_id").notNull(),
    fileId: integer("file_id").notNull(),
    content: text(),
  },
  (table) => [
    foreignKey({
      columns: [table.template6Id],
      foreignColumns: [template6.id],
      name: "template_6_files_template_6_id_template_6_id_fk",
    }),
    foreignKey({
      columns: [table.fileId],
      foreignColumns: [files.id],
      name: "template_6_files_file_id_files_id_fk",
    }),
  ],
);

export const template7 = pgTable(
  "template_7",
  {
    id: serial().primaryKey().notNull(),
    createdTime: timestamp("created_time", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedTime: timestamp("updated_time", { mode: "string" }),
    deletedTime: timestamp("deleted_time", { mode: "string" }),
    title: json().$type<LocaleContentOptional>(),
    description: json().$type<LocaleContentOptional>(),
    date: timestamp({ mode: "string" }),
    imgUrl: text("img_url"),
    subNavbarId: integer("sub_navbar_id").notNull(),
    year: integer(),
  },
  (table) => [
    foreignKey({
      columns: [table.subNavbarId],
      foreignColumns: [subNavbar.id],
      name: "template_7_sub_navbar_id_sub_navbar_id_fk",
    }).onDelete("cascade"),
  ],
);

export const tabsCategories = pgTable("tabs_categories", {
  id: serial().primaryKey().notNull(),
  createdTime: timestamp("created_time", { mode: "string" })
    .defaultNow()
    .notNull(),
  updatedTime: timestamp("updated_time", { mode: "string" }),
  deletedTime: timestamp("deleted_time", { mode: "string" }),
  category: json().$type<LocaleContentOptional>(),
});

export const template8 = pgTable(
  "template_8",
  {
    id: serial().primaryKey().notNull(),
    createdTime: timestamp("created_time", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedTime: timestamp("updated_time", { mode: "string" }),
    deletedTime: timestamp("deleted_time", { mode: "string" }),
    tabsCategoryId: integer("tabs_category_id").notNull(),
    title: json().$type<LocaleContentOptional>(),
    description: json().$type<LocaleContentOptional>(),
    fileId: integer("file_id").notNull(),
    name: varchar({ length: 100 }),
    phoneNumber: varchar("phone_number", { length: 100 }),
    fax: varchar({ length: 100 }),
    email: varchar({ length: 100 }),
    address: varchar({ length: 255 }),
    subNavbarId: integer("sub_navbar_id").notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.tabsCategoryId],
      foreignColumns: [tabsCategories.id],
      name: "template_8_tabs_category_id_tabs_categories_id_fk",
    }),
    foreignKey({
      columns: [table.fileId],
      foreignColumns: [files.id],
      name: "template_8_file_id_files_id_fk",
    }),
    foreignKey({
      columns: [table.subNavbarId],
      foreignColumns: [subNavbar.id],
      name: "template_8_sub_navbar_id_sub_navbar_id_fk",
    }),
  ],
);

export const profilCompany = pgTable(
  "profil_company",
  {
    id: serial().primaryKey().notNull(),
    createdTime: timestamp("created_time", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedTime: timestamp("updated_time", { mode: "string" }),
    deletedTime: timestamp("deleted_time", { mode: "string" }),
    content: json().$type<LocaleContentOptional>(),
    mainNavbarId: integer("main_navbar_id").notNull(),
    isActive: boolean("is_active"),
  },
  (table) => [
    foreignKey({
      columns: [table.mainNavbarId],
      foreignColumns: [mainNavbar.id],
      name: "profil_company_main_navbar_id_main_navbar_id_fk",
    }).onDelete("cascade"),
  ],
);

export const procurements = pgTable("procurements", {
  id: serial().primaryKey().notNull(),
  createdTime: timestamp("created_time", { mode: "string" })
    .defaultNow()
    .notNull(),
  updatedTime: timestamp("updated_time", { mode: "string" }),
  deletedTime: timestamp("deleted_time", { mode: "string" }),
  title: json().$type<LocaleContentOptional>(),
  description: json().$type<LocaleContentOptional>(),
  deadlineDate: timestamp("deadline_date", { mode: "string" }),
  status: boolean(),
  requirements: json().$type<LocaleContentOptional>(),
  category: json().$type<LocaleContentOptional>(),
  files: text().array(),
});

export const procurementFiles = pgTable(
  "procurement_files",
  {
    id: serial().primaryKey().notNull(),
    procurementId: integer("procurement_id").notNull(),
    fileId: integer("file_id").notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.procurementId],
      foreignColumns: [procurements.id],
      name: "procurement_files_procurement_id_procurements_id_fk",
    }),
    foreignKey({
      columns: [table.fileId],
      foreignColumns: [files.id],
      name: "procurement_files_file_id_files_id_fk",
    }),
  ],
);

export const promoSubscription = pgTable(
  "promo_subscription",
  {
    id: serial().primaryKey().notNull(),
    createdTime: timestamp("created_time", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedTime: timestamp("updated_time", { mode: "string" }),
    deletedTime: timestamp("deleted_time", { mode: "string" }),
    userType: userType("user_type"),
    name: varchar({ length: 100 }),
    email: varchar({ length: 100 }),
    phoneNumber: varchar("phone_number", { length: 100 }),
    companyName: varchar("company_name", { length: 100 }),
    isSubscribe: boolean("is_subscribe"),
    promoId: integer("promo_id").notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.promoId],
      foreignColumns: [promos.id],
      name: "promo_subscription_promo_id_promos_id_fk",
    }),
  ],
);

export const profilCompanyContents = pgTable(
  "profil_company_contents",
  {
    id: serial().primaryKey().notNull(),
    createdTime: timestamp("created_time", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedTime: timestamp("updated_time", { mode: "string" }),
    deletedTime: timestamp("deleted_time", { mode: "string" }),
    content: json().$type<LocaleContentOptional>(),
    profilCompanyId: integer("profil_company_id").notNull(),
    isActive: boolean("is_active"),
  },
  (table) => [
    foreignKey({
      columns: [table.profilCompanyId],
      foreignColumns: [profilCompany.id],
      name: "profil_company_contents_profil_company_id_profil_company_id_fk",
    }).onDelete("cascade"),
  ],
);

export const tabsContents = pgTable(
  "tabs_contents",
  {
    id: serial().primaryKey().notNull(),
    createdTime: timestamp("created_time", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedTime: timestamp("updated_time", { mode: "string" }),
    deletedTime: timestamp("deleted_time", { mode: "string" }),
    name: json().$type<LocaleContentOptional>(),
    date: timestamp({ mode: "string" }),
    fileId: integer("file_id").notNull(),
    tabsCategoryId: integer("tabs_category_id").notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.fileId],
      foreignColumns: [files.id],
      name: "tabs_contents_file_id_files_id_fk",
    }),
    foreignKey({
      columns: [table.tabsCategoryId],
      foreignColumns: [tabsCategories.id],
      name: "tabs_contents_tabs_category_id_tabs_categories_id_fk",
    }),
  ],
);

export const productPaymentMethods = pgTable(
  "product_payment_methods",
  {
    id: serial().primaryKey().notNull(),
    createdTime: timestamp("created_time", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedTime: timestamp("updated_time", { mode: "string" }),
    deletedTime: timestamp("deleted_time", { mode: "string" }),
    paymentId: integer("payment_id").notNull(),
    productId: integer("product_id").notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.paymentId],
      foreignColumns: [paymentMethods.id],
      name: "product_payment_methods_payment_id_payment-methods_id_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.productId],
      foreignColumns: [subNavbarTabs.id],
      name: "product_payment_methods_product_id_sub_navbar_tabs_id_fk",
    }).onDelete("cascade"),
  ],
);

export const heroTabs = pgTable(
  "hero_tabs",
  {
    id: serial().primaryKey().notNull(),
    createdTime: timestamp("created_time", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedTime: timestamp("updated_time", { mode: "string" }),
    deletedTime: timestamp("deleted_time", { mode: "string" }),
    imgUrl: text("img_url"),
    title: json().$type<LocaleContentOptional>(),
    subtitle: json().$type<LocaleContentOptional>(),
    subNavbarId: integer("sub_navbar_id"),
  },
  (table) => [
    foreignKey({
      columns: [table.subNavbarId],
      foreignColumns: [subNavbar.id],
      name: "hero_tabs_sub_navbar_id_sub_navbar_id_fk",
    }).onDelete("cascade"),
  ],
);

export const paymentMethods = pgTable("payment-methods", {
  id: serial().primaryKey().notNull(),
  createdTime: timestamp("created_time", { mode: "string" })
    .defaultNow()
    .notNull(),
  updatedTime: timestamp("updated_time", { mode: "string" }),
  deletedTime: timestamp("deleted_time", { mode: "string" }),
  category: paymentType().default("BANK TRANSFER"),
  type: json().$type<LocaleContentOptional>(),
  description: json().$type<LocaleContentOptional>(),
  isActive: boolean("is_active").default(true),
});

export const publikasiPenangananDarurat = pgTable(
  "publikasi_penanganan_darurat",
  {
    id: serial().primaryKey().notNull(),
    createdTime: timestamp("created_time", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedTime: timestamp("updated_time", { mode: "string" }),
    deletedTime: timestamp("deleted_time", { mode: "string" }),
    name: json().$type<LocaleContentOptional>(),
    publicationDate: date("publication_date"),
    fileUrl: text("file_url"),
  },
);

export const promos = pgTable(
  "promos",
  {
    id: serial().primaryKey().notNull(),
    createdTime: timestamp("created_time", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedTime: timestamp("updated_time", { mode: "string" }),
    deletedTime: timestamp("deleted_time", { mode: "string" }),
    title: json().$type<LocaleContentOptional>(),
    termsAndCondition: json().$type<LocaleContentOptional>(),
    loanTypeId: integer("loan_type_id").notNull(),
    imgUrlDesktop: text("img_url_desktop"),
    imgUrlMobile: text("img_url_mobile"),
    isActive: boolean("is_active"),
    mainPromo: boolean("main_promo").default(false),
    deadline: timestamp({ mode: "string" }),
    promoMechanism: json().$type<LocaleContentOptional>(),
  },
  (table) => [
    foreignKey({
      columns: [table.loanTypeId],
      foreignColumns: [loanTypes.id],
      name: "promos_loan_type_id_loan_types_id_fk",
    }).onDelete("cascade"),
  ],
);

export const activityLogs = pgTable("activity_logs", {
  id: serial().primaryKey().notNull(),
  createdTime: timestamp("created_time", { mode: "string" })
    .defaultNow()
    .notNull(),
  updatedTime: timestamp("updated_time", { mode: "string" }),
  deletedTime: timestamp("deleted_time", { mode: "string" }),
  email: varchar({ length: 100 }),
  activity: text(),
  status: varchar({ length: 50 }),
  metadata: text(),
});

export const rolePermissions = pgTable(
  "role_permissions",
  {
    id: serial().primaryKey().notNull(),
    createdTime: timestamp("created_time", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedTime: timestamp("updated_time", { mode: "string" }),
    deletedTime: timestamp("deleted_time", { mode: "string" }),
    roleId: integer("role_id"),
    permissionId: integer("permission_id"),
  },
  (table) => [
    foreignKey({
      columns: [table.roleId],
      foreignColumns: [rolesAdmin.id],
      name: "role_permissions_role_id_roles_admin_id_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.permissionId],
      foreignColumns: [permissions.id],
      name: "role_permissions_permission_id_permissions_id_fk",
    }).onDelete("cascade"),
  ],
);

export const access = pgTable("access", {
  id: serial().primaryKey().notNull(),
  createdTime: timestamp("created_time", { mode: "string" })
    .defaultNow()
    .notNull(),
  updatedTime: timestamp("updated_time", { mode: "string" }),
  deletedTime: timestamp("deleted_time", { mode: "string" }),
  name: varchar({ length: 100 }),
  description: text(),
});

export const syaratDanKetentuan = pgTable("syarat_dan_ketentuan", {
  id: serial().primaryKey().notNull(),
  createdTime: timestamp("created_time", { mode: "string" })
    .defaultNow()
    .notNull(),
  updatedTime: timestamp("updated_time", { mode: "string" }),
  deletedTime: timestamp("deleted_time", { mode: "string" }),
  content: json().$type<LocaleContentOptional>(),
});

export const rolesAdmin = pgTable("roles_admin", {
  id: serial().primaryKey().notNull(),
  createdTime: timestamp("created_time", { mode: "string" })
    .defaultNow()
    .notNull(),
  updatedTime: timestamp("updated_time", { mode: "string" }),
  deletedTime: timestamp("deleted_time", { mode: "string" }),
  name: varchar({ length: 100 }),
  description: text(),
});

export const roleAccess = pgTable(
  "role_access",
  {
    id: serial().primaryKey().notNull(),
    createdTime: timestamp("created_time", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedTime: timestamp("updated_time", { mode: "string" }),
    deletedTime: timestamp("deleted_time", { mode: "string" }),
    roleId: integer("role_id"),
    accessId: integer("access_id"),
  },
  (table) => [
    foreignKey({
      columns: [table.roleId],
      foreignColumns: [rolesAdmin.id],
      name: "role_access_role_id_roles_admin_id_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.accessId],
      foreignColumns: [access.id],
      name: "role_access_access_id_access_id_fk",
    }).onDelete("cascade"),
  ],
);

export const permissions = pgTable("permissions", {
  id: serial().primaryKey().notNull(),
  createdTime: timestamp("created_time", { mode: "string" })
    .defaultNow()
    .notNull(),
  updatedTime: timestamp("updated_time", { mode: "string" }),
  deletedTime: timestamp("deleted_time", { mode: "string" }),
  name: varchar({ length: 100 }),
});

export const rolesMenu = pgTable(
  "roles_menu",
  {
    id: serial().primaryKey().notNull(),
    createdTime: timestamp("created_time", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedTime: timestamp("updated_time", { mode: "string" }),
    deletedTime: timestamp("deleted_time", { mode: "string" }),
    roleId: integer("role_id"),
    accessId: integer("access_id"),
    isApprover: boolean("is_approver").default(false),
    isCreate: boolean("is_create").default(false),
    isRead: boolean("is_read").default(false),
    isUpdate: boolean("is_update").default(false),
    isDelete: boolean("is_delete").default(false),
  },
  (table) => [
    foreignKey({
      columns: [table.roleId],
      foreignColumns: [rolesAdmin.id],
      name: "roles_menu_role_id_roles_admin_id_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.accessId],
      foreignColumns: [access.id],
      name: "roles_menu_access_id_access_id_fk",
    }).onDelete("cascade"),
  ],
);

export const complaints = pgTable(
  "complaints",
  {
    id: serial().primaryKey().notNull(),
    createdTime: timestamp("created_time", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedTime: timestamp("updated_time", { mode: "string" }),
    deletedTime: timestamp("deleted_time", { mode: "string" }),
    name: varchar({ length: 100 }),
    email: varchar({ length: 100 }),
    complaintType: integer("complaint_type"),
    message: text(),
  },
  (table) => [
    foreignKey({
      columns: [table.complaintType],
      foreignColumns: [complaintTypes.id],
      name: "complaints_complaint_type_id_complaint_types_id_fk",
    }).onDelete("cascade"),
  ],
);

export const contents = pgTable("contents", {
  id: serial().primaryKey().notNull(),
  contentName: varchar("content_name", { length: 50 }).notNull(),
  contentPath: varchar("content_path"),
  createdTime: timestamp("created_time", { mode: "string" })
    .defaultNow()
    .notNull(),
  updatedTime: timestamp("updated_time", { mode: "string" })
    .defaultNow()
    .notNull(),
  deletedTime: timestamp("deleted_time", { mode: "string" }),
});

export const groupContents = pgTable("group_contents", {
  id: serial().primaryKey().notNull(),
  groupInitial: varchar("group_initial", { length: 10 }),
  contentName: varchar("content_name", { length: 50 }).notNull(),
  createdTime: timestamp("created_time", { mode: "string" })
    .defaultNow()
    .notNull(),
  updatedTime: timestamp("updated_time", { mode: "string" })
    .defaultNow()
    .notNull(),
  deletedTime: timestamp("deleted_time", { mode: "string" }),
});

export const groups = pgTable("groups", {
  id: serial().primaryKey().notNull(),
  groupName: varchar("group_name", { length: 50 }),
  groupInitial: varchar("group_initial", { length: 10 }).notNull(),
  createdTime: timestamp("created_time", { mode: "string" })
    .defaultNow()
    .notNull(),
  updatedTime: timestamp("updated_time", { mode: "string" })
    .defaultNow()
    .notNull(),
  deletedTime: timestamp("deleted_time", { mode: "string" }),
});

export const employeesGroup = pgTable(
  "employees_group",
  {
    id: serial().primaryKey().notNull(),
    loginId: varchar("login_id", { length: 100 }).notNull(),
    groupInitial: varchar("group_initial", { length: 10 }),
    createdTime: timestamp("created_time", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedTime: timestamp("updated_time", { mode: "string" })
      .defaultNow()
      .notNull(),
    deletedTime: timestamp("deleted_time", { mode: "string" }),
  },
  (table) => [
    foreignKey({
      columns: [table.loginId],
      foreignColumns: [admins.loginId],
      name: "employeeGroups_login_id_fk",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
  ],
);

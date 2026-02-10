-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "public"."admin_status" AS ENUM('ACTIVE', 'INACTIVE');--> statement-breakpoint
CREATE TYPE "public"."board_type" AS ENUM('DIREKSI', 'KOMISARIS');--> statement-breakpoint
CREATE TYPE "public"."branches_type" AS ENUM('HE', 'ALL');--> statement-breakpoint
CREATE TYPE "public"."payment_type" AS ENUM('BANK TRANSFER', 'VIRTUAL ACCOUNT', 'MINIMARKET', 'E-COMMERCE', 'E-WALLET');--> statement-breakpoint
CREATE TYPE "public"."roles" AS ENUM('SUPER_ADMIN', 'ADMIN', 'EDITOR');--> statement-breakpoint
CREATE TYPE "public"."user_type" AS ENUM('INDIVIDU', 'KORPORAT');--> statement-breakpoint
CREATE TABLE "boards" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"board_type" "board_type",
	"name" varchar(100),
	"title" json,
	"text" json,
	"img_url" text
);
--> statement-breakpoint
CREATE TABLE "coordinates" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"title" varchar(100),
	"id_location" varchar(100),
	"coordinate" text
);
--> statement-breakpoint
CREATE TABLE "faqs" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"question" json,
	"answer" json,
	"type" json,
	"tags" varchar(100),
	"is_main" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "branches" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"name" json,
	"phone_number" varchar(100),
	"fax" varchar(100),
	"type" "branches_type" DEFAULT 'ALL',
	"coordinate_id" integer[] NOT NULL,
	"category" varchar(100),
	"lat" text,
	"long" text,
	"address" varchar(255),
	"maxi_id" varchar(100),
	"image_url" text
);
--> statement-breakpoint
CREATE TABLE "admins" (
	"id" serial PRIMARY KEY NOT NULL,
	"password" text NOT NULL,
	"status" "admin_status" DEFAULT 'ACTIVE',
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp DEFAULT now() NOT NULL,
	"deleted_time" timestamp,
	"name" varchar(100),
	"login_id" varchar(100) NOT NULL,
	"roleId" integer,
	CONSTRAINT "admins_login_id_unique" UNIQUE("login_id")
);
--> statement-breakpoint
CREATE TABLE "complaint-types" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"type" json,
	"is_active" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE "global_params" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"key" varchar(100),
	"value" text,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "milestones" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"year" integer,
	"content" json,
	"is_active" boolean
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"title" json,
	"description" json,
	"icon_url" text,
	"redirect_url" text,
	"is_active" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "news" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"title" json,
	"content" json,
	"img_url" text
);
--> statement-breakpoint
CREATE TABLE "visi_misi" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"type" json,
	"content" json
);
--> statement-breakpoint
CREATE TABLE "kebijakan-privasi" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"content" json
);
--> statement-breakpoint
CREATE TABLE "modal_seasonal" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"image_url" text,
	"is_active" boolean DEFAULT false,
	"expired_date" timestamp
);
--> statement-breakpoint
CREATE TABLE "loan_simulations" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"user_type" "user_type",
	"email" varchar(100),
	"phone_number" varchar(100),
	"company_name" varchar(100),
	"loan_type_id" integer NOT NULL,
	"car_price" integer,
	"client_location" varchar(100),
	"car_brand" varchar(255),
	"car_model" varchar(255),
	"car_type" varchar(255),
	"car_year" integer,
	"insurance_type" varchar(100),
	"tdp_price" integer,
	"dp_price" integer,
	"tenor_month" integer,
	"name" varchar(100),
	"branch_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "files" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"name" json,
	"file_url" text,
	"meta" text
);
--> statement-breakpoint
CREATE TABLE "user_otp" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"phone_number" varchar(50),
	"counter" integer
);
--> statement-breakpoint
CREATE TABLE "main_navbar" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"header" json,
	"is_active" boolean
);
--> statement-breakpoint
CREATE TABLE "heros" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"img_url" text,
	"title" json,
	"description" json,
	"main_navbar_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "loan_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"name" varchar(100)
);
--> statement-breakpoint
CREATE TABLE "usp" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"title" json,
	"description" json,
	"loan_type_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "usp_cards" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"prefix_icon" text,
	"suffix_icon" text,
	"text" json,
	"usp_id" integer NOT NULL,
	"redirect_url" text
);
--> statement-breakpoint
CREATE TABLE "sub_navbar" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"subnavbar" json,
	"main_navbar_id" integer NOT NULL,
	"is_active" boolean
);
--> statement-breakpoint
CREATE TABLE "template_1" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"title" json,
	"img_url" text,
	"sub_navbar_id" integer
);
--> statement-breakpoint
CREATE TABLE "template_2" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"title" json,
	"description" json,
	"sub_navbar_id" integer NOT NULL,
	"sub_navbar_tab_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sub_navbar_tabs" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"tabs" json,
	"sub_navbar_id" integer NOT NULL,
	"is_active" boolean
);
--> statement-breakpoint
CREATE TABLE "template_3" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"title" json,
	"company_name" json,
	"address" text,
	"sub_navbar_id" integer NOT NULL,
	"sub_navbar_tab_id" integer
);
--> statement-breakpoint
CREATE TABLE "template_4" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"title" json,
	"img_url" text,
	"sub_navbar_id" integer NOT NULL,
	"sub_navbar_tab_id" integer
);
--> statement-breakpoint
CREATE TABLE "template_5" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"title" json,
	"sub_navbar_tabs_id" integer NOT NULL,
	"img_url" text,
	"sub_navbar_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "template_6" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"title" json,
	"category" json,
	"sub_navbar_id" integer NOT NULL,
	"sub_navbar_tab_id" integer NOT NULL,
	"file_url" text,
	"content" json
);
--> statement-breakpoint
CREATE TABLE "template_6_files" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"title" json,
	"template_6_id" integer NOT NULL,
	"file_id" integer NOT NULL,
	"content" text
);
--> statement-breakpoint
CREATE TABLE "template_7" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"title" json,
	"description" json,
	"date" timestamp,
	"img_url" text,
	"sub_navbar_id" integer NOT NULL,
	"year" integer
);
--> statement-breakpoint
CREATE TABLE "tabs_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"category" json
);
--> statement-breakpoint
CREATE TABLE "template_8" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"tabs_category_id" integer NOT NULL,
	"title" json,
	"description" json,
	"file_id" integer NOT NULL,
	"name" varchar(100),
	"phone_number" varchar(100),
	"fax" varchar(100),
	"email" varchar(100),
	"address" varchar(255),
	"sub_navbar_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "profil_company" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"content" json,
	"main_navbar_id" integer NOT NULL,
	"is_active" boolean
);
--> statement-breakpoint
CREATE TABLE "procurements" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"title" json,
	"description" json,
	"deadline_date" timestamp,
	"status" boolean,
	"requirements" json,
	"category" json,
	"files" text[]
);
--> statement-breakpoint
CREATE TABLE "procurement_files" (
	"id" serial PRIMARY KEY NOT NULL,
	"procurement_id" integer NOT NULL,
	"file_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "promo_subscription" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"user_type" "user_type",
	"name" varchar(100),
	"email" varchar(100),
	"phone_number" varchar(100),
	"company_name" varchar(100),
	"is_subscribe" boolean,
	"promo_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "profil_company_contents" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"content" json,
	"profil_company_id" integer NOT NULL,
	"is_active" boolean
);
--> statement-breakpoint
CREATE TABLE "tabs_contents" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"name" json,
	"date" timestamp,
	"file_id" integer NOT NULL,
	"tabs_category_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_payment_methods" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"payment_id" integer NOT NULL,
	"product_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hero_tabs" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"img_url" text,
	"title" json,
	"subtitle" json,
	"sub_navbar_id" integer
);
--> statement-breakpoint
CREATE TABLE "payment-methods" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"category" "payment_type" DEFAULT 'BANK TRANSFER',
	"type" json,
	"description" json,
	"is_active" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE "publikasi_penanganan_darurat" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"name" json,
	"publication_date" date,
	"file_url" text
);
--> statement-breakpoint
CREATE TABLE "promos" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"title" json,
	"termsAndCondition" json,
	"loan_type_id" integer NOT NULL,
	"img_url_desktop" text,
	"img_url_mobile" text,
	"is_active" boolean,
	"main_promo" boolean DEFAULT false,
	"deadline" timestamp,
	"promoMechanism" json
);
--> statement-breakpoint
CREATE TABLE "activity_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"email" varchar(100),
	"activity" text,
	"status" varchar(50),
	"metadata" text
);
--> statement-breakpoint
CREATE TABLE "role_permissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"role_id" integer,
	"permission_id" integer
);
--> statement-breakpoint
CREATE TABLE "access" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"name" varchar(100),
	"description" text
);
--> statement-breakpoint
CREATE TABLE "syarat_dan_ketentuan" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"content" json
);
--> statement-breakpoint
CREATE TABLE "roles_admin" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"name" varchar(100),
	"description" text
);
--> statement-breakpoint
CREATE TABLE "role_access" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"role_id" integer,
	"access_id" integer
);
--> statement-breakpoint
CREATE TABLE "permissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"name" varchar(100)
);
--> statement-breakpoint
CREATE TABLE "roles_menu" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"role_id" integer,
	"access_id" integer,
	"is_approver" boolean DEFAULT false,
	"is_create" boolean DEFAULT false,
	"is_read" boolean DEFAULT false,
	"is_update" boolean DEFAULT false,
	"is_delete" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "complaints" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp,
	"deleted_time" timestamp,
	"name" varchar(100),
	"email" varchar(100),
	"complaint_type" integer,
	"message" text
);
--> statement-breakpoint
CREATE TABLE "contents" (
	"id" serial PRIMARY KEY NOT NULL,
	"content_name" varchar(50) NOT NULL,
	"content_path" varchar,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp DEFAULT now() NOT NULL,
	"deleted_time" timestamp
);
--> statement-breakpoint
CREATE TABLE "group_contents" (
	"id" serial PRIMARY KEY NOT NULL,
	"group_initial" varchar(10),
	"content_name" varchar(50) NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp DEFAULT now() NOT NULL,
	"deleted_time" timestamp
);
--> statement-breakpoint
CREATE TABLE "groups" (
	"id" serial PRIMARY KEY NOT NULL,
	"group_name" varchar(50),
	"group_initial" varchar(10) NOT NULL,
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp DEFAULT now() NOT NULL,
	"deleted_time" timestamp
);
--> statement-breakpoint
CREATE TABLE "employees_group" (
	"id" serial PRIMARY KEY NOT NULL,
	"login_id" varchar(100) NOT NULL,
	"group_initial" varchar(10),
	"created_time" timestamp DEFAULT now() NOT NULL,
	"updated_time" timestamp DEFAULT now() NOT NULL,
	"deleted_time" timestamp
);
--> statement-breakpoint
ALTER TABLE "loan_simulations" ADD CONSTRAINT "loan_simulations_loan_type_id_loan_types_id_fk" FOREIGN KEY ("loan_type_id") REFERENCES "public"."loan_types"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "loan_simulations" ADD CONSTRAINT "loan_simulations_branch_id_branches_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."branches"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "heros" ADD CONSTRAINT "heros_main_navbar_id_main_navbar_id_fk" FOREIGN KEY ("main_navbar_id") REFERENCES "public"."main_navbar"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "usp" ADD CONSTRAINT "usp_loan_type_id_loan_types_id_fk" FOREIGN KEY ("loan_type_id") REFERENCES "public"."loan_types"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "usp_cards" ADD CONSTRAINT "usp_cards_usp_id_usp_id_fk" FOREIGN KEY ("usp_id") REFERENCES "public"."usp"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sub_navbar" ADD CONSTRAINT "sub_navbar_main_navbar_id_main_navbar_id_fk" FOREIGN KEY ("main_navbar_id") REFERENCES "public"."main_navbar"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "template_1" ADD CONSTRAINT "template_1_sub_navbar_id_sub_navbar_id_fk" FOREIGN KEY ("sub_navbar_id") REFERENCES "public"."sub_navbar"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "template_2" ADD CONSTRAINT "template_2_sub_navbar_id_sub_navbar_id_fk" FOREIGN KEY ("sub_navbar_id") REFERENCES "public"."sub_navbar"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "template_2" ADD CONSTRAINT "template_2_sub_navbar_tab_id_sub_navbar_tabs_id_fk" FOREIGN KEY ("sub_navbar_tab_id") REFERENCES "public"."sub_navbar_tabs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sub_navbar_tabs" ADD CONSTRAINT "sub_navbar_tabs_sub_navbar_id_sub_navbar_id_fk" FOREIGN KEY ("sub_navbar_id") REFERENCES "public"."sub_navbar"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "template_3" ADD CONSTRAINT "template_3_sub_navbar_id_sub_navbar_id_fk" FOREIGN KEY ("sub_navbar_id") REFERENCES "public"."sub_navbar"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "template_3" ADD CONSTRAINT "template_3_sub_navbar_tab_id_sub_navbar_tabs_id_fk" FOREIGN KEY ("sub_navbar_tab_id") REFERENCES "public"."sub_navbar_tabs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "template_4" ADD CONSTRAINT "template_4_sub_navbar_id_sub_navbar_id_fk" FOREIGN KEY ("sub_navbar_id") REFERENCES "public"."sub_navbar"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "template_4" ADD CONSTRAINT "template_4_sub_navbar_tab_id_sub_navbar_tabs_id_fk" FOREIGN KEY ("sub_navbar_tab_id") REFERENCES "public"."sub_navbar_tabs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "template_5" ADD CONSTRAINT "template_5_sub_navbar_tabs_id_sub_navbar_tabs_id_fk" FOREIGN KEY ("sub_navbar_tabs_id") REFERENCES "public"."sub_navbar_tabs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "template_5" ADD CONSTRAINT "template_5_sub_navbar_id_sub_navbar_id_fk" FOREIGN KEY ("sub_navbar_id") REFERENCES "public"."sub_navbar"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "template_6" ADD CONSTRAINT "template_6_sub_navbar_id_sub_navbar_id_fk" FOREIGN KEY ("sub_navbar_id") REFERENCES "public"."sub_navbar"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "template_6" ADD CONSTRAINT "template_6_sub_navbar_tab_id_sub_navbar_tabs_id_fk" FOREIGN KEY ("sub_navbar_tab_id") REFERENCES "public"."sub_navbar_tabs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "template_6_files" ADD CONSTRAINT "template_6_files_template_6_id_template_6_id_fk" FOREIGN KEY ("template_6_id") REFERENCES "public"."template_6"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "template_6_files" ADD CONSTRAINT "template_6_files_file_id_files_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."files"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "template_7" ADD CONSTRAINT "template_7_sub_navbar_id_sub_navbar_id_fk" FOREIGN KEY ("sub_navbar_id") REFERENCES "public"."sub_navbar"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "template_8" ADD CONSTRAINT "template_8_tabs_category_id_tabs_categories_id_fk" FOREIGN KEY ("tabs_category_id") REFERENCES "public"."tabs_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "template_8" ADD CONSTRAINT "template_8_file_id_files_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."files"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "template_8" ADD CONSTRAINT "template_8_sub_navbar_id_sub_navbar_id_fk" FOREIGN KEY ("sub_navbar_id") REFERENCES "public"."sub_navbar"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profil_company" ADD CONSTRAINT "profil_company_main_navbar_id_main_navbar_id_fk" FOREIGN KEY ("main_navbar_id") REFERENCES "public"."main_navbar"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "procurement_files" ADD CONSTRAINT "procurement_files_procurement_id_procurements_id_fk" FOREIGN KEY ("procurement_id") REFERENCES "public"."procurements"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "procurement_files" ADD CONSTRAINT "procurement_files_file_id_files_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."files"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "promo_subscription" ADD CONSTRAINT "promo_subscription_promo_id_promos_id_fk" FOREIGN KEY ("promo_id") REFERENCES "public"."promos"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profil_company_contents" ADD CONSTRAINT "profil_company_contents_profil_company_id_profil_company_id_fk" FOREIGN KEY ("profil_company_id") REFERENCES "public"."profil_company"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tabs_contents" ADD CONSTRAINT "tabs_contents_file_id_files_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."files"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tabs_contents" ADD CONSTRAINT "tabs_contents_tabs_category_id_tabs_categories_id_fk" FOREIGN KEY ("tabs_category_id") REFERENCES "public"."tabs_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_payment_methods" ADD CONSTRAINT "product_payment_methods_payment_id_payment-methods_id_fk" FOREIGN KEY ("payment_id") REFERENCES "public"."payment-methods"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_payment_methods" ADD CONSTRAINT "product_payment_methods_product_id_sub_navbar_tabs_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."sub_navbar_tabs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hero_tabs" ADD CONSTRAINT "hero_tabs_sub_navbar_id_sub_navbar_id_fk" FOREIGN KEY ("sub_navbar_id") REFERENCES "public"."sub_navbar"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "promos" ADD CONSTRAINT "promos_loan_type_id_loan_types_id_fk" FOREIGN KEY ("loan_type_id") REFERENCES "public"."loan_types"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_role_id_roles_admin_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles_admin"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_permission_id_permissions_id_fk" FOREIGN KEY ("permission_id") REFERENCES "public"."permissions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_access" ADD CONSTRAINT "role_access_role_id_roles_admin_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles_admin"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_access" ADD CONSTRAINT "role_access_access_id_access_id_fk" FOREIGN KEY ("access_id") REFERENCES "public"."access"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "roles_menu" ADD CONSTRAINT "roles_menu_role_id_roles_admin_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles_admin"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "roles_menu" ADD CONSTRAINT "roles_menu_access_id_access_id_fk" FOREIGN KEY ("access_id") REFERENCES "public"."access"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "complaints" ADD CONSTRAINT "complaints_complaint_type_id_complaint_types_id_fk" FOREIGN KEY ("complaint_type") REFERENCES "public"."complaint-types"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employees_group" ADD CONSTRAINT "employeeGroups_login_id_fk" FOREIGN KEY ("login_id") REFERENCES "public"."admins"("login_id") ON DELETE cascade ON UPDATE cascade;
*/
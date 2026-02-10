import { relations } from "drizzle-orm/relations";
import { loanTypes, loanSimulations, branches, mainNavbar, heros, usp, uspCards, subNavbar, template1, template2, subNavbarTabs, template3, template4, template5, template6, template6Files, files, template7, tabsCategories, template8, profilCompany, procurements, procurementFiles, promos, promoSubscription, profilCompanyContents, tabsContents, paymentMethods, productPaymentMethods, heroTabs, rolesAdmin, rolePermissions, permissions, roleAccess, access, rolesMenu, complaintTypes, complaints, admins, employeesGroup } from "./schema";

export const loanSimulationsRelations = relations(loanSimulations, ({one}) => ({
	loanType: one(loanTypes, {
		fields: [loanSimulations.loanTypeId],
		references: [loanTypes.id]
	}),
	branch: one(branches, {
		fields: [loanSimulations.branchId],
		references: [branches.id]
	}),
}));

export const loanTypesRelations = relations(loanTypes, ({many}) => ({
	loanSimulations: many(loanSimulations),
	usps: many(usp),
	promos: many(promos),
}));

export const branchesRelations = relations(branches, ({many}) => ({
	loanSimulations: many(loanSimulations),
}));

export const herosRelations = relations(heros, ({one}) => ({
	mainNavbar: one(mainNavbar, {
		fields: [heros.mainNavbarId],
		references: [mainNavbar.id]
	}),
}));

export const mainNavbarRelations = relations(mainNavbar, ({many}) => ({
	heros: many(heros),
	subNavbars: many(subNavbar),
	profilCompanies: many(profilCompany),
}));

export const uspRelations = relations(usp, ({one, many}) => ({
	loanType: one(loanTypes, {
		fields: [usp.loanTypeId],
		references: [loanTypes.id]
	}),
	uspCards: many(uspCards),
}));

export const uspCardsRelations = relations(uspCards, ({one}) => ({
	usp: one(usp, {
		fields: [uspCards.uspId],
		references: [usp.id]
	}),
}));

export const subNavbarRelations = relations(subNavbar, ({one, many}) => ({
	mainNavbar: one(mainNavbar, {
		fields: [subNavbar.mainNavbarId],
		references: [mainNavbar.id]
	}),
	template1s: many(template1),
	template2s: many(template2),
	subNavbarTabs: many(subNavbarTabs),
	template3s: many(template3),
	template4s: many(template4),
	template5s: many(template5),
	template6s: many(template6),
	template7s: many(template7),
	template8s: many(template8),
	heroTabs: many(heroTabs),
}));

export const template1Relations = relations(template1, ({one}) => ({
	subNavbar: one(subNavbar, {
		fields: [template1.subNavbarId],
		references: [subNavbar.id]
	}),
}));

export const template2Relations = relations(template2, ({one}) => ({
	subNavbar: one(subNavbar, {
		fields: [template2.subNavbarId],
		references: [subNavbar.id]
	}),
	subNavbarTab: one(subNavbarTabs, {
		fields: [template2.subNavbarTabId],
		references: [subNavbarTabs.id]
	}),
}));

export const subNavbarTabsRelations = relations(subNavbarTabs, ({one, many}) => ({
	template2s: many(template2),
	subNavbar: one(subNavbar, {
		fields: [subNavbarTabs.subNavbarId],
		references: [subNavbar.id]
	}),
	template3s: many(template3),
	template4s: many(template4),
	template5s: many(template5),
	template6s: many(template6),
	productPaymentMethods: many(productPaymentMethods),
}));

export const template3Relations = relations(template3, ({one}) => ({
	subNavbar: one(subNavbar, {
		fields: [template3.subNavbarId],
		references: [subNavbar.id]
	}),
	subNavbarTab: one(subNavbarTabs, {
		fields: [template3.subNavbarTabId],
		references: [subNavbarTabs.id]
	}),
}));

export const template4Relations = relations(template4, ({one}) => ({
	subNavbar: one(subNavbar, {
		fields: [template4.subNavbarId],
		references: [subNavbar.id]
	}),
	subNavbarTab: one(subNavbarTabs, {
		fields: [template4.subNavbarTabId],
		references: [subNavbarTabs.id]
	}),
}));

export const template5Relations = relations(template5, ({one}) => ({
	subNavbarTab: one(subNavbarTabs, {
		fields: [template5.subNavbarTabsId],
		references: [subNavbarTabs.id]
	}),
	subNavbar: one(subNavbar, {
		fields: [template5.subNavbarId],
		references: [subNavbar.id]
	}),
}));

export const template6Relations = relations(template6, ({one, many}) => ({
	subNavbar: one(subNavbar, {
		fields: [template6.subNavbarId],
		references: [subNavbar.id]
	}),
	subNavbarTab: one(subNavbarTabs, {
		fields: [template6.subNavbarTabId],
		references: [subNavbarTabs.id]
	}),
	template6Files: many(template6Files),
}));

export const template6FilesRelations = relations(template6Files, ({one}) => ({
	template6: one(template6, {
		fields: [template6Files.template6Id],
		references: [template6.id]
	}),
	file: one(files, {
		fields: [template6Files.fileId],
		references: [files.id]
	}),
}));

export const filesRelations = relations(files, ({many}) => ({
	template6Files: many(template6Files),
	template8s: many(template8),
	procurementFiles: many(procurementFiles),
	tabsContents: many(tabsContents),
}));

export const template7Relations = relations(template7, ({one}) => ({
	subNavbar: one(subNavbar, {
		fields: [template7.subNavbarId],
		references: [subNavbar.id]
	}),
}));

export const template8Relations = relations(template8, ({one}) => ({
	tabsCategory: one(tabsCategories, {
		fields: [template8.tabsCategoryId],
		references: [tabsCategories.id]
	}),
	file: one(files, {
		fields: [template8.fileId],
		references: [files.id]
	}),
	subNavbar: one(subNavbar, {
		fields: [template8.subNavbarId],
		references: [subNavbar.id]
	}),
}));

export const tabsCategoriesRelations = relations(tabsCategories, ({many}) => ({
	template8s: many(template8),
	tabsContents: many(tabsContents),
}));

export const profilCompanyRelations = relations(profilCompany, ({one, many}) => ({
	mainNavbar: one(mainNavbar, {
		fields: [profilCompany.mainNavbarId],
		references: [mainNavbar.id]
	}),
	profilCompanyContents: many(profilCompanyContents),
}));

export const procurementFilesRelations = relations(procurementFiles, ({one}) => ({
	procurement: one(procurements, {
		fields: [procurementFiles.procurementId],
		references: [procurements.id]
	}),
	file: one(files, {
		fields: [procurementFiles.fileId],
		references: [files.id]
	}),
}));

export const procurementsRelations = relations(procurements, ({many}) => ({
	procurementFiles: many(procurementFiles),
}));

export const promoSubscriptionRelations = relations(promoSubscription, ({one}) => ({
	promo: one(promos, {
		fields: [promoSubscription.promoId],
		references: [promos.id]
	}),
}));

export const promosRelations = relations(promos, ({one, many}) => ({
	promoSubscriptions: many(promoSubscription),
	loanType: one(loanTypes, {
		fields: [promos.loanTypeId],
		references: [loanTypes.id]
	}),
}));

export const profilCompanyContentsRelations = relations(profilCompanyContents, ({one}) => ({
	profilCompany: one(profilCompany, {
		fields: [profilCompanyContents.profilCompanyId],
		references: [profilCompany.id]
	}),
}));

export const tabsContentsRelations = relations(tabsContents, ({one}) => ({
	file: one(files, {
		fields: [tabsContents.fileId],
		references: [files.id]
	}),
	tabsCategory: one(tabsCategories, {
		fields: [tabsContents.tabsCategoryId],
		references: [tabsCategories.id]
	}),
}));

export const productPaymentMethodsRelations = relations(productPaymentMethods, ({one}) => ({
	paymentMethod: one(paymentMethods, {
		fields: [productPaymentMethods.paymentId],
		references: [paymentMethods.id]
	}),
	subNavbarTab: one(subNavbarTabs, {
		fields: [productPaymentMethods.productId],
		references: [subNavbarTabs.id]
	}),
}));

export const paymentMethodsRelations = relations(paymentMethods, ({many}) => ({
	productPaymentMethods: many(productPaymentMethods),
}));

export const heroTabsRelations = relations(heroTabs, ({one}) => ({
	subNavbar: one(subNavbar, {
		fields: [heroTabs.subNavbarId],
		references: [subNavbar.id]
	}),
}));

export const rolePermissionsRelations = relations(rolePermissions, ({one}) => ({
	rolesAdmin: one(rolesAdmin, {
		fields: [rolePermissions.roleId],
		references: [rolesAdmin.id]
	}),
	permission: one(permissions, {
		fields: [rolePermissions.permissionId],
		references: [permissions.id]
	}),
}));

export const rolesAdminRelations = relations(rolesAdmin, ({many}) => ({
	rolePermissions: many(rolePermissions),
	roleAccesses: many(roleAccess),
	rolesMenus: many(rolesMenu),
}));

export const permissionsRelations = relations(permissions, ({many}) => ({
	rolePermissions: many(rolePermissions),
}));

export const roleAccessRelations = relations(roleAccess, ({one}) => ({
	rolesAdmin: one(rolesAdmin, {
		fields: [roleAccess.roleId],
		references: [rolesAdmin.id]
	}),
	access: one(access, {
		fields: [roleAccess.accessId],
		references: [access.id]
	}),
}));

export const accessRelations = relations(access, ({many}) => ({
	roleAccesses: many(roleAccess),
	rolesMenus: many(rolesMenu),
}));

export const rolesMenuRelations = relations(rolesMenu, ({one}) => ({
	rolesAdmin: one(rolesAdmin, {
		fields: [rolesMenu.roleId],
		references: [rolesAdmin.id]
	}),
	access: one(access, {
		fields: [rolesMenu.accessId],
		references: [access.id]
	}),
}));

export const complaintsRelations = relations(complaints, ({one}) => ({
	complaintType: one(complaintTypes, {
		fields: [complaints.complaintType],
		references: [complaintTypes.id]
	}),
}));

export const complaintTypesRelations = relations(complaintTypes, ({many}) => ({
	complaints: many(complaints),
}));

export const employeesGroupRelations = relations(employeesGroup, ({one}) => ({
	admin: one(admins, {
		fields: [employeesGroup.loginId],
		references: [admins.loginId]
	}),
}));

export const adminsRelations = relations(admins, ({many}) => ({
	employeesGroups: many(employeesGroup),
}));
import {
	getFooterSettings,
	getClosingProfileSettings,
	getInterfaceSettings,
	getNavigationSettings,
	getSiteSettings,
} from "@/data/cms";
import type { BaseLayoutProps } from "@/types/layouts/BaseLayout.types";

export interface LayoutData extends Required<
	Pick<BaseLayoutProps, "title" | "description" | "language" | "header" | "footer" | "closingProfile" | "loadingScreen" | "skipToContent">
> {}

export async function getLayoutData(): Promise<LayoutData> {
	const [siteSettings, navigation, interfaceSettings, footer, closingProfile] =
		await Promise.all([
			getSiteSettings(),
			getNavigationSettings(),
			getInterfaceSettings(),
			getFooterSettings(),
			getClosingProfileSettings(),
		]);

	const { site, metadata } = siteSettings;
	const logo = {
		siteName: site.name,
		image: site.logo ? { src: site.logo } : undefined,
		lightImage: site.logoLight ? { src: site.logoLight } : undefined,
		darkImage: site.logoDark ? { src: site.logoDark } : undefined,
	};

	return {
		title: metadata.title,
		description: metadata.description,
		language: metadata.language,
		skipToContent: interfaceSettings.skipToContent,
		header: {
			logo,
			navigation: {
				items: navigation.navItems,
				desktopLabel: interfaceSettings.navigation.primaryLabel,
				mobileLabel: interfaceSettings.navigation.mobileLabel,
			},
			action: {
				href: `mailto:${site.email}`,
				label: site.contactLabel,
				mobileLabel: site.email,
			},
			menuControl: {
				openLabel: interfaceSettings.openMenu,
				closeLabel: interfaceSettings.closeMenu,
			},
		},
		footer: {
			brand: {
				logo,
				description: footer.brandDescription,
			},
			columns: [
				{
					id: "explore",
					label: footer.menuLabel,
					items: navigation.footerNavItems,
				},
				{
					id: "resources",
					label: footer.resourcesLabel,
					items: navigation.resourceLinks,
				},
				{
					id: "connect",
					label: interfaceSettings.navigation.footerSocialLabel,
					items: navigation.socialLinks,
				},
			],
			contact: {
				label: site.contactLabel,
				email: site.email,
				locationLabel: footer.locationLabel,
				location: site.location,
			},
			legalLinks: navigation.legalLinks,
			copyright: `${footer.copyrightSymbol} ${new Date().getFullYear()} ${site.name}`,
		},
		loadingScreen: {
			logo,
			data: interfaceSettings.loadingScreen,
		},
		closingProfile: {
			data: {
				id: closingProfile.id,
				eyebrow: closingProfile.eyebrow,
				nameLines: closingProfile.nameLines,
				roleLabel: closingProfile.roleLabel,
				followAction: {
					...closingProfile.followAction,
					icon: "arrowUpRight",
					variant: "outline",
				},
				emailAction: {
					href: `mailto:${site.email}`,
					label: `${closingProfile.emailActionLabel}: ${site.email}`,
					icon: "arrowUpRight",
					variant: "outline",
				},
				locationLabel: closingProfile.locationLabel,
				location: site.location,
				portrait: closingProfile.portraits?.expanded,
			},
		},
	};
}

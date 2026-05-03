/**
 * Global personal identity and portfolio metadata.
 *
 * @remarks
 * Acts as the primary branding source across the application:
 * - Hero sections
 * - Footer attribution
 * - Contact and social links
 */
export const personal = {
	name: 'Mohamed Fathy',
	title: 'Full-Stack Developer · Backend-Focused',
	tagline: 'I build systems that think — not just apps that click.',
	bio: `
I'm a full-stack engineer who obsesses over clean architecture, 
real-world constraints, and the gap between 'it works' and 'it's well-designed.' 
I built Beggy — a production-grade monorepo with JWT + OAuth auth, RBAC, CSRF protection, Docker, 
and a full testing pyramid — because I believe side projects should solve real engineering problems, not just demonstrate syntax.
`,
	location: 'Giza, Egypt',
	email: 'mofathy1833@gmail.com',
	github: 'https://github.com/Mofathy183',
	linkedin: 'https://www.linkedin.com/in/mohamed-fathy-8376812b5/',
	cv: '/cv/Mohamed_Fathy_CV.pdf',
};

/**
 * Categorized representation of the developer's technical skill set.
 *
 * @remarks
 * Structured into domains (Backend, Frontend, Architecture, Testing, External Services)
 * for presentation and recruitment readability rather than runtime usage.
 */
export const techStack = [
	{
		category: 'Backend',
		items: [
			'TypeScript',
			'Node.js',
			'ExpressJS',
			'Prisma',
			'PostgreSQL',
			'REST APIs',
			'JWT',
			'OAuth 2.0',
			'CSRF Protection',
			'CASL (RBAC)',
		],
	},
	{
		category: 'Frontend',
		items: [
			'React',
			'Next.js',
			'Tailwind CSS v4',
			'shadcn/ui',
			'Redux Toolkit',
			'React Hook Form',
			'Zod',
		],
	},
	{
		category: 'Architecture',
		items: [
			'Monorepo (Turborepo)',
			'pnpm Workspaces',
			'Layered Architecture',
			'Shared Types (Zod)',
			'Docker',
			'CI/CD',
		],
	},
	{
		category: 'Testing',
		items: [
			'Vitest',
			'Supertest',
			'Playwright E2E',
			'React Testing Library',
			'Storybook',
		],
	},
	{
		category: 'External Services',
		items: ['Google OAuth', 'Facebook OAuth', 'Resend (email)'],
	},
];

/**
 * Central domain model for the Beggy portfolio case study.
 *
 * @remarks
 * This object functions as a content-driven CMS layer powering all UI sections.
 * It defines:
 * - Product narrative (tagline, description)
 * - Technical stack
 * - System architecture
 * - API surface
 * - Engineering challenges
 * - Testing strategy
 * - Visual media (screenshots & videos)
 */
export const beggy = {
	tagline:
		'Smart travel packing assistant with constraint-based container management',
	description:
		'Beggy is a full-stack monorepo that models real-world packing constraints — weight limits, volume capacity, and item counts — and prevents invalid states like overweight or overflow. It handles multi-mechanism auth, RBAC, and a polymorphic container system that serves both bags and suitcases through one shared service layer.',
	github: 'https://github.com/Mofathy183/Beggy-backend',
	demo: '',
	stack: [
		'TypeScript',
		'ExpressJS',
		'Next.js',
		'React',
		'PostgreSQL',
		'Prisma 7',
		'Turborepo',
		'CASL',
		'Docker',
		'Playwright',
		'Zod 4',
		'pnpm',
	],

	/**
	 * High-level engineering selling points of the Beggy system.
	 *
	 * @remarks
	 * Each entry represents a key architectural or system design decision
	 * intended for technical audience storytelling.
	 */
	highlights: [
		{
			icon: '🧳',
			title: 'Constraint-based packing',
			body: 'Bags and suitcases enforce real physical limits — weight, volume, and item capacity — with computed status (in progress, near limit, overweight) that responds dynamically as items are packed.',
		},
		{
			icon: '🔐',
			title: 'Production-grade auth',
			body: 'JWT access + refresh token rotation, Google and Facebook OAuth, CSRF double-submit cookie protection, bcrypt, and CASL RBAC — five auth mechanisms coexisting in one clean system.',
		},
		{
			icon: '🏗️',
			title: 'Monorepo architecture',
			body: 'Turborepo + pnpm workspaces with a @beggy/shared package as the single source of truth for Zod schemas and TypeScript types — consumed by both API and web, eliminating type drift.',
		},
		{
			icon: '🧪',
			title: 'Full testing pyramid',
			body: 'Unit tests (Vitest + Faker), integration tests against a real test DB (Supertest), E2E flows (Playwright) covering auth, items, bags, and packing — and visual/a11y tests via Storybook.',
		},
	],

	/**
	 * Logical system architecture layers of the Beggy monorepo.
	 *
	 * @remarks
	 * Defines separation of concerns across frontend, backend, database,
	 * shared contract layer, and external services.
	 */
	architecture: [
		{
			layer: 'Next.js (App Router)',
			role: 'Frontend',
			detail: 'React · Tailwind v4 · shadcn/ui · Redux Toolkit · CASL · RTK Query',
		},
		{
			layer: 'Express REST API',
			role: 'Backend',
			detail: 'TypeScript · Prisma ORM · Pino logging · Swagger docs · SWC compiler',
		},
		{
			layer: 'PostgreSQL',
			role: 'Database',
			detail: 'Prisma 7 with multi-file models · Role-based access · Migration system',
		},
		{
			layer: '@beggy/shared',
			role: 'Shared contract',
			detail: 'Zod 4 schemas · TypeScript types · Enums · Validation constraints',
		},
		{
			layer: 'External Services',
			role: 'Auth & email',
			detail: 'Google OAuth · Facebook OAuth · Resend (transactional email)',
		},
	],

	/**
	 * Public-facing REST API surface of the Beggy backend.
	 *
	 * @remarks
	 * Used for documentation and system design visualization rather than runtime consumption.
	 */
	apiEndpoints: [
		{
			method: 'POST',
			path: '/auth/login',
			description: 'Email/password auth with JWT + CSRF token',
		},
		{
			method: 'GET',
			path: '/auth/google',
			description: 'Initiate Google OAuth flow',
		},
		{
			method: 'GET',
			path: '/auth/csrf-token',
			description: 'Fetch CSRF token before mutations',
		},
		{
			method: 'GET',
			path: '/bags',
			description: 'List bags with container status',
		},
		{
			method: 'POST',
			path: '/containers/:id/pack',
			description: 'Pack an item into a container',
		},
		{
			method: 'POST',
			path: '/containers/move',
			description: 'Move item between containers',
		},
		{
			method: 'GET',
			path: '/containers/:id/state',
			description: 'Get live weight/capacity metrics',
		},
	],

	/**
	 * Real-world engineering problems encountered during development.
	 *
	 * @remarks
	 * Each entry follows a structured narrative:
	 * problem → solution → result
	 *
	 * This is the most important section for demonstrating engineering maturity.
	 */
	challenges: [
		{
			title: 'Polymorphic container system',
			what: 'Bags and suitcases are physically different but share identical packing behaviour — pack, unpack, move, and weight/capacity tracking.',
			how: 'Designed a single `Container` model in Prisma that backs both bags and suitcases. All packing logic routes through `ContainerService` regardless of type, with a `ContainerType` enum for any domain-specific branching. This eliminated duplicated service code and made the pack/unpack/move endpoints generic.',
			result: 'One `/containers` route serves both entity types. Adding new container types in the future requires zero changes to the packing logic.',
		},
		{
			title: 'Packing page capacity limits bug',
			what: "The packing page's progress bars were showing 100% the moment any item was added — the bars looked broken from day one.",
			how: "Root cause: `ContainerStateDTO.metrics.currentWeight` is how much is currently packed — not the limit. I was passing it as `maxWeight`, so current always equalled max. Fixed by threading the bag's `maxWeight`/`maxCapacity` from the bag DTO through a Redux packing context slice set at navigation time. `PackingPageClient` validates the context matches the current `containerId` and shows a fallback for direct URL navigation.",
			result: 'Accurate progress bars across all containers. The fix exposed a clean separation: "current usage" lives in ContainerStateDTO, "physical limits" live on the bag/suitcase entity.',
		},
		{
			title: 'CSRF + JWT + OAuth in one auth system',
			what: 'Three auth mechanisms need to coexist: local email/password with JWT cookies, Google and Facebook OAuth, and CSRF protection for all state-mutating requests.',
			how: "Used `csrf-csrf` double-submit cookie pattern. CSRF middleware runs after Passport and before routes, with `/docs` (Swagger) explicitly bypassed. OAuth callbacks redirect to the frontend's `/auth/callback` route which hydrates the Redux auth slice from the session. All tokens are HttpOnly cookies — never in localStorage.",
			result: 'A single `/auth/me` endpoint serves all three auth paths identically. The frontend never touches raw tokens.',
		},
		{
			title: 'Type safety across the monorepo',
			what: 'API validation schemas and frontend form schemas started drifting — a field renamed on the backend would silently break a form.',
			how: 'Created `@beggy/shared` as a workspace package consumed by both `@beggy/api` and `@beggy/web`. All Zod schemas, TypeScript types, enums, and validation constraints live there. Zod resolver in React Hook Form points to the same schema the API validates against.',
			result: 'A type error in `@beggy/shared` now fails the build across the entire monorepo before any runtime surprises. Schema drift is impossible.',
		},
	],

	/**
	 * Multi-layer testing strategy for the Beggy system.
	 *
	 * @remarks
	 * Represents a full testing pyramid covering:
	 * - unit tests
	 * - integration tests
	 * - E2E tests
	 * - visual and accessibility testing
	 */
	testing: {
		summary: 'Beggy has multi-layer test coverage across the full stack.',
		layers: [
			{
				label: 'API unit tests',
				tool: 'Vitest + Faker',
				coverage: 'Services, controllers, mappers, utilities',
			},
			{
				label: 'API integration tests',
				tool: 'Vitest + Supertest',
				coverage:
					'Full HTTP request/response cycle against real test DB',
			},
			{
				label: 'Web component tests',
				tool: 'Vitest + Testing Library',
				coverage: 'React components and hooks',
			},
			{
				label: 'E2E tests',
				tool: 'Playwright',
				coverage:
					'Auth flow, items CRUD, bags management, packing workspace',
			},
			{
				label: 'Visual / a11y',
				tool: 'Storybook + Playwright',
				coverage: 'Browser-rendered stories with accessibility audits',
			},
		],
	},

	/**
	 * Structured media gallery for the Beggy application.
	 *
	 * @remarks
	 * Each group represents a product domain (Authentication, Packing, Admin)
	 * and contains both image and video assets for UI demonstration.
	 */
	screenshots: [
		{
			group: 'Authentication',
			items: [
				{
					id: 'auth-login',
					label: 'Sign in',
					caption:
						'JWT + CSRF token flow. Email/password, Google OAuth, and Facebook OAuth all route through one auth middleware.',
					type: 'image' as const,
					images: {
						light: ['screenshots/light/auth-login'],
						dark: ['screenshots/dark/auth-login'],
					},
				},
				{
					id: 'auth-signup',
					label: 'Create account',
					caption:
						'Zod-validated form with React Hook Form. Same schema validates on client and server — no drift possible.',
					type: 'image' as const,
					images: {
						light: ['screenshots/light/auth-signup'],
						dark: ['screenshots/dark/auth-signup'],
					},
				},
			],
		},
		{
			group: 'Packing workspace',
			items: [
				{
					id: 'bags-list',
					label: 'Bags',
					caption:
						'Live container status — weight and capacity computed from packed items in real time.',
					type: 'video' as const,
					video: 'screenshots/videos/bags.mp4',
				},
				{
					id: 'bag-detail',
					label: 'Bag detail',
					caption:
						'Weight progress bar and items list. Physical limits enforced — overweight state blocks packing.',
					type: 'image' as const,
					images: {
						light: ['screenshots/light/bag-detail'],
						dark: ['screenshots/dark/bag-detail'],
					},
				},
				{
					id: 'packing-page',
					label: 'Packing workspace',
					caption:
						'Pack / unpack / move items between containers. Progress bars pull from real constraint limits.',
					type: 'image' as const,
					images: {
						light: ['screenshots/light/packing-page'],
						dark: ['screenshots/dark/packing-page'],
					},
				},
			],
		},
		{
			group: 'Admin & inventory',
			items: [
				{
					id: 'items-list',
					label: 'Item library',
					caption:
						'Personal inventory with filters, sorting, and CRUD dialogs. RTK Query powered — optimistic updates.',
					type: 'video' as const,
					video: 'screenshots/videos/items.mp4',
				},
				{
					id: 'users-list',
					label: 'User management',
					caption:
						'RBAC-protected admin view. Role changes, status badges, paginated list with filters.',
					type: 'image' as const,
					images: {
						light: ['screenshots/light/users-list'],
						dark: ['screenshots/dark/users-list'],
					},
				},
				{
					id: 'dashboard',
					label: 'Dashboard',
					caption:
						'Dashboard page with aggregated stats and recent activity. Onboarding nudge when dashboard is incomplete.',
					type: 'image' as const,
					images: {
						light: ['screenshots/light/dashboard'],
						dark: ['screenshots/dark/dashboard'],
					},
				},
				{
					id: 'profile',
					label: 'Profile',
					caption:
						'Profile page with user details and settings. Onboarding nudge when profile is incomplete.',
					type: 'video' as const,
					video: 'screenshots/videos/profile.mp4',
				},
			],
		},
	],
};

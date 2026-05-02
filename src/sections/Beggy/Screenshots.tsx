import { useEffect, useRef, useState } from 'react';
import { beggy } from '@/data/portfolio';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogDescription,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import {
	Play,
	Pause,
	Sun,
	Moon,
	Image,
	Video,
	Maximize2,
	X,
	Volume2,
} from 'lucide-react';

/**
 * Represents a single media item (image or video) from the portfolio dataset.
 *
 * @remarks
 * This type is derived from the Beggy content schema and ensures
 * strict alignment between UI rendering and backend/content structure.
 */
type ScreenshotItem = (typeof beggy.screenshots)[number]['items'][number];

/**
 * Video thumbnail card with lazy playback control and intersection-based auto pause.
 *
 * @remarks
 * - Automatically pauses when out of viewport to save resources
 * - Uses dual-source fallback (WebM → MP4) for optimal browser support
 * - Maintains internal playback state separate from DOM video state
 */
const VideoCard = ({
	item,
	onOpen,
}: {
	item: ScreenshotItem & { type: 'video' };
	onOpen: () => void;
}) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [playing, setPlaying] = useState(false);
	const [hovered, setHovered] = useState(false);

	useEffect(() => {
		const el = videoRef.current;
		if (!el) return;
		const obs = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) {
					el.pause();
					setPlaying(false);
				}
			},
			{ threshold: 0.2 }
		);
		obs.observe(el);
		return () => obs.disconnect();
	}, []);

	/**
	 * Toggles video playback state from user interaction.
	 *
	 * @remarks
	 * Stops event propagation to prevent triggering parent navigation/open behavior.
	 */
	const togglePlay = (e: React.MouseEvent) => {
		e.stopPropagation();
		const el = videoRef.current;
		if (!el) return;
		if (el.paused) {
			el.play();
			setPlaying(true);
		} else {
			el.pause();
			setPlaying(false);
		}
	};

	// Derive paths: "screenshots/videos/bags.mp4" → webm sibling
	const mp4Src = `/${item.video}`;
	const webmSrc = `/${item.video.replace(/\.mp4$/, '.webm')}`;

	return (
		<div className="flex flex-col h-full w-full">
			<div
				className="relative overflow-hidden rounded-t-xl bg-muted cursor-pointer aspect-video group/card"
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				onClick={onOpen}
			>
				{/*
				 * <source> order matters: browser picks the first format it supports.
				 * WebM (VP9) is smaller and faster; MP4 (H.264) is the fallback.
				 */}
				<video
					ref={videoRef}
					loop
					muted
					playsInline
					className="w-full h-full object-cover"
					onPlay={() => setPlaying(true)}
					onPause={() => setPlaying(false)}
					onEnded={() => setPlaying(false)}
				>
					<source src={webmSrc} type="video/webm" />
					<source src={mp4Src} type="video/mp4" />
				</video>

				<div
					className={cn(
						'absolute inset-0 bg-background/40 backdrop-blur-[1px] transition-opacity duration-200',
						playing && !hovered ? 'opacity-0' : 'opacity-100'
					)}
				/>

				<div
					className={cn(
						'absolute inset-0 flex items-center justify-center transition-opacity duration-200',
						playing && !hovered ? 'opacity-0' : 'opacity-100'
					)}
				>
					<button
						onClick={togglePlay}
						className="relative z-10 w-11 h-11 rounded-full bg-background/90 border border-border flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110"
						aria-label={playing ? 'Pause' : 'Play'}
					>
						{playing ? (
							<Pause size={15} className="text-primary" />
						) : (
							<Play
								size={15}
								className="text-primary fill-primary ml-0.5"
							/>
						)}
					</button>
				</div>

				<div className="absolute top-2 right-2 z-20 flex items-center gap-1.5">
					<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-background/80 backdrop-blur-sm border border-border text-muted-foreground text-[10px] font-mono">
						no audio
					</span>
					<button
						onClick={(e) => {
							e.stopPropagation();
							onOpen();
						}}
						className="w-6 h-6 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
						aria-label="Open fullscreen"
					>
						<Maximize2 size={10} />
					</button>
				</div>
			</div>

			<div className="flex-1 p-4 border border-t-0 border-border rounded-b-xl bg-card">
				<div className="flex items-center gap-2 mb-1.5">
					<span className="text-sm font-medium text-foreground font-heading">
						{item.label}
					</span>
					<Badge variant="ghost" className="gap-1 text-[10px] py-0">
						<Video size={9} />
						video
					</Badge>
				</div>
				<p className="text-xs text-muted-foreground leading-relaxed">
					{item.caption}
				</p>
			</div>
		</div>
	);
};

/**
 * Responsive image card with optional light/dark theme variants.
 *
 * @remarks
 * Supports runtime theme switching between pre-rendered assets.
 * Falls back gracefully when only a single variant exists.
 */
const ImageCard = ({
	item,
	onOpen,
}: {
	item: ScreenshotItem & { type: 'image' };
	onOpen: (theme: 'light' | 'dark') => void;
}) => {
	const hasVariants =
		item.images.light.length > 0 && item.images.dark.length > 0;
	const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>('light');

	const src =
		activeTheme === 'light'
			? `/${item.images.light[0]}.webp`
			: `/${item.images.dark[0]}.webp`;

	return (
		<div className="flex flex-col h-full">
			<div
				className="relative overflow-hidden rounded-t-xl bg-muted aspect-video cursor-zoom-in group/card"
				onClick={() => onOpen(activeTheme)}
			>
				<img
					src={src}
					alt={item.label}
					className="w-full h-full object-cover object-top transition-opacity duration-300"
					loading="lazy"
				/>

				<div className="absolute inset-0 bg-background/0 group-hover/card:bg-background/20 transition-colors duration-200 flex items-center justify-center">
					<div className="opacity-0 group-hover/card:opacity-100 transition-opacity duration-200 w-9 h-9 rounded-full bg-background/90 border border-border flex items-center justify-center shadow-lg">
						<Maximize2 size={14} className="text-foreground" />
					</div>
				</div>

				<div className="absolute top-2 right-2 z-10 flex items-center gap-1.5">
					{hasVariants && (
						<Tabs
							value={activeTheme}
							onValueChange={(v) =>
								setActiveTheme(v as 'light' | 'dark')
							}
						>
							<TabsList
								className="h-7 p-0.5 bg-background/80 backdrop-blur-sm border border-border shadow-sm"
								onClick={(e) => e.stopPropagation()}
							>
								<TabsTrigger
									value="light"
									className="h-5 px-2 gap-1 text-[10px] data-[state=active]:bg-background"
									onClick={(e) => e.stopPropagation()}
								>
									<Sun size={9} />
									Light
								</TabsTrigger>
								<TabsTrigger
									value="dark"
									className="h-5 px-2 gap-1 text-[10px] data-[state=active]:bg-background"
									onClick={(e) => e.stopPropagation()}
								>
									<Moon size={9} />
									Dark
								</TabsTrigger>
							</TabsList>
							<TabsContent value="light" className="hidden" />
							<TabsContent value="dark" className="hidden" />
						</Tabs>
					)}
					<button
						onClick={(e) => {
							e.stopPropagation();
							onOpen(activeTheme);
						}}
						className="w-6 h-6 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
						aria-label="Open fullscreen"
					>
						<Maximize2 size={10} />
					</button>
				</div>
			</div>

			<div className="flex-1 p-4 border border-t-0 border-border rounded-b-xl bg-card">
				<div className="flex items-center gap-2 mb-1.5">
					<span className="text-sm font-medium text-foreground font-heading">
						{item.label}
					</span>
					<Badge variant="ghost" className="gap-1 text-[10px] py-0">
						<Image size={9} />
						{hasVariants ? 'light / dark' : 'screenshot'}
					</Badge>
				</div>
				<p className="text-xs text-muted-foreground leading-relaxed">
					{item.caption}
				</p>
			</div>
		</div>
	);
};

/**
 * Discriminated union representing fullscreen media preview state.
 *
 * @remarks
 * Acts as the single source of truth for the modal viewer.
 * Ensures type-safe branching between image and video rendering modes.
 */
type LightboxState =
	| {
			type: 'image';
			label: string;
			caption: string;
			initialTheme: 'light' | 'dark';
			lightSrc: string;
			darkSrc: string;
	  }
	| { type: 'video'; src: string; label: string; caption: string }
	| null;

/**
 * Fullscreen media preview container supporting images and videos.
 *
 * @remarks
 * Handles:
 * - Image theme switching (light/dark variants)
 * - Video autoplay on open
 * - Loading state synchronization for smooth transitions
 *
 *! Note: Internal state reset is triggered by prop identity comparison.
 * This works but is sensitive to render timing in concurrent React modes.
 */
const Lightbox = ({
	state,
	onClose,
}: {
	state: LightboxState;
	onClose: () => void;
}) => {
	const videoRef = useRef<HTMLVideoElement>(null);

	/**
	 * Local override for image theme selection inside the lightbox.
	 *
	 * @remarks
	 * Overrides initial theme from navigation context.
	 * Resets automatically when a new media item is opened.
	 */
	const [themeOverride, setThemeOverride] = useState<'light' | 'dark' | null>(
		null
	);
	const [lastStateRef, setLastStateRef] = useState<LightboxState>(null);
	if (state !== lastStateRef) {
		setLastStateRef(state);
		setThemeOverride(null);
	}

	const activeTheme: 'light' | 'dark' =
		themeOverride ??
		(state?.type === 'image' ? state.initialTheme : 'light');

	const imageSrc =
		state?.type === 'image'
			? activeTheme === 'light'
				? state.lightSrc
				: state.darkSrc
			: '';

	const hasVariants =
		state?.type === 'image' &&
		state.lightSrc !== '' &&
		state.darkSrc !== '';

	/**
	 * Tracks image loading lifecycle to prevent flicker during theme switches.
	 *
	 * @remarks
	 * Uses both:
	 * - `onLoad` event (network-loaded images)
	 * - `ref.complete` check (cached images)
	 */
	const [imgLoaded, setImgLoaded] = useState(false);
	const [prevImageSrc, setPrevImageSrc] = useState('');
	if (imageSrc !== prevImageSrc) {
		setPrevImageSrc(imageSrc);
		setImgLoaded(false);
	}

	// Auto-play video on open
	useEffect(() => {
		if (state?.type === 'video' && videoRef.current) {
			videoRef.current.play().catch(() => {});
		}
	}, [state]);

	// Derive webm sibling for the dialog video too
	const videoWebmSrc =
		state?.type === 'video' ? state.src.replace(/\.mp4$/, '.webm') : '';

	return (
		<Dialog
			open={state !== null}
			onOpenChange={(open) => {
				if (!open) onClose();
			}}
		>
			{/*
			 * max-w-5xl! overrides shadcn's hardcoded max-w-lg.
			 * We go even wider here — 7xl (80rem) — so the image gets
			 * real estate to breathe, with the sidebar alongside it.
			 */}
			<DialogContent className="max-w-7xl! w-[96vw] p-0 border-0 bg-transparent shadow-none overflow-hidden [&>button]:hidden">
				<DialogTitle className="sr-only">
					{state?.label ?? 'Screenshot'}
				</DialogTitle>
				<DialogDescription className="sr-only">
					{state?.caption ?? ''}
				</DialogDescription>

				<div className="flex flex-col rounded-2xl overflow-hidden ring-1 ring-border shadow-2xl">
					{/* ── IMAGE layout: media left, sidebar right ── */}
					{state?.type === 'image' && (
						<div className="flex flex-col lg:flex-row bg-background min-h-0">
							{/* Media pane */}
							<div className="relative flex-1 min-w-0 bg-muted flex items-center justify-center overflow-hidden">
								{/*
								 * Image stays in DOM but invisible (opacity-0) until loaded.
								 * ref callback handles cached images that never fire onLoad.
								 * Both together eliminate the "old image flash" on theme switch.
								 */}
								<img
									key={imageSrc}
									src={imageSrc}
									alt={state.label}
									ref={(el) => {
										if (el?.complete) setImgLoaded(true);
									}}
									className={cn(
										'w-full h-full object-contain object-top',
										'max-h-[60vh] lg:max-h-[85vh]',
										'transition-opacity duration-300',
										imgLoaded ? 'opacity-100' : 'opacity-0'
									)}
									onLoad={() => setImgLoaded(true)}
								/>

								{/* Shimmer — z-10 so it sits above the invisible img */}
								{!imgLoaded && (
									<div className="absolute inset-0 z-10 flex items-center justify-center bg-muted">
										<div className="absolute inset-0 animate-pulse bg-muted-foreground/10" />
										<div className="relative z-10 w-8 h-8 rounded-full border-2 border-border border-t-primary animate-spin" />
									</div>
								)}

								{/* Close button */}
								<button
									onClick={onClose}
									className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-background transition-all"
									aria-label="Close"
								>
									<X size={14} />
								</button>
							</div>

							{/* Info sidebar — single source of truth for theme switching */}
							<div className="flex flex-col justify-between w-full lg:w-80 xl:w-96 shrink-0 border-t lg:border-t-0 lg:border-l border-border bg-card p-6">
								<div>
									<Badge
										variant="ghost"
										className="gap-1 text-[10px] mb-4"
									>
										<Image size={9} />
										{hasVariants
											? 'light / dark'
											: 'screenshot'}
									</Badge>

									<h3 className="text-base font-semibold text-foreground font-heading leading-snug mb-3">
										{state.label}
									</h3>

									<p className="text-sm text-muted-foreground leading-relaxed">
										{state.caption}
									</p>
								</div>

								{/*
								 * SINGLE theme switcher — only here in the sidebar.
								 * The duplicate top-left overlay toggle has been removed
								 * so there's one obvious place to switch themes.
								 */}
								{hasVariants && (
									<div className="mt-6 pt-4 border-t border-border">
										<p className="text-[11px] text-muted-foreground font-mono mb-2">
											Viewing
										</p>
										<div className="flex gap-2">
											<button
												onClick={() =>
													setThemeOverride('light')
												}
												className={cn(
													'flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md border text-[11px] font-mono transition-all',
													activeTheme === 'light'
														? 'bg-primary/10 border-primary/40 text-primary'
														: 'border-border text-muted-foreground hover:text-foreground hover:border-border/80'
												)}
											>
												<Sun size={10} />
												light
											</button>
											<button
												onClick={() =>
													setThemeOverride('dark')
												}
												className={cn(
													'flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md border text-[11px] font-mono transition-all',
													activeTheme === 'dark'
														? 'bg-primary/10 border-primary/40 text-primary'
														: 'border-border text-muted-foreground hover:text-foreground hover:border-border/80'
												)}
											>
												<Moon size={10} />
												dark
											</button>
										</div>
									</div>
								)}
							</div>
						</div>
					)}

					{/* ── VIDEO layout: media top, info bar bottom ── */}
					{state?.type === 'video' && (
						<div className="flex flex-col bg-background">
							<div className="relative bg-zinc-950">
								{/*
								 * WebM first (smaller, better quality on Chrome/Firefox).
								 * MP4 fallback for Safari and older browsers.
								 */}
								<video
									ref={videoRef}
									loop
									muted
									playsInline
									controls
									className="w-full max-h-[82vh] block"
								>
									<source
										src={videoWebmSrc}
										type="video/webm"
									/>
									<source src={state.src} type="video/mp4" />
								</video>

								<button
									onClick={onClose}
									className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-all"
									aria-label="Close"
								>
									<X size={14} />
								</button>
							</div>

							<div className="flex items-start justify-between gap-6 px-6 py-5 border-t border-border bg-card">
								<div className="flex-1 min-w-0">
									<div className="flex items-center gap-2 mb-1.5">
										<span className="text-sm font-semibold text-foreground font-heading">
											{state.label}
										</span>
										<Badge
											variant="ghost"
											className="gap-1 text-[10px] py-0"
										>
											<Video size={9} />
											video
										</Badge>
									</div>
									<p className="text-xs text-muted-foreground leading-relaxed">
										{state.caption}
									</p>
								</div>

								<div className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted border border-border text-[11px] font-mono text-muted-foreground">
									<Volume2 size={10} />
									no audio
								</div>
							</div>
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
};

/**
 * UI metadata mapping for screenshot groups.
 *
 * @remarks
 * Decouples backend grouping keys from user-facing labels and descriptions.
 * Enables safe evolution of internal grouping structure without UI breaking changes.
 */
const groupMeta: Record<string, { label: string; description: string }> = {
	Authentication: {
		label: 'Authentication',
		description:
			'Local email + password, Google OAuth, and Facebook OAuth — all three paths handled by one middleware stack with CSRF protection.',
	},
	'Packing workspace': {
		label: 'Packing workspace',
		description:
			'The core domain — bags enforce real weight and capacity limits. Pack, unpack, and move items between containers with live status feedback.',
	},
	'Admin & inventory': {
		label: 'Admin & inventory',
		description:
			'RBAC-protected admin views, a personal item library, and user profile management. Role changes, paginated filters, and optimistic updates via RTK Query.',
	},
};

/**
 * Main portfolio media gallery section.
 *
 * @remarks
 * Orchestrates:
 * - grouped media rendering
 * - lightbox state management
 * - image/video routing logic
 *
 * Acts as the domain-level container for the screenshot feature.
 */
const Screenshots = () => {
	const [lightbox, setLightbox] = useState<LightboxState>(null);

	/**
	 * Opens an image in fullscreen lightbox with a predefined theme.
	 *
	 * @param item - Image item from the screenshot dataset
	 * @param theme - Initial theme variant (light or dark)
	 */
	const openImage = (
		item: ScreenshotItem & { type: 'image' },
		theme: 'light' | 'dark'
	) => {
		setLightbox({
			type: 'image',
			label: item.label,
			caption: item.caption,
			initialTheme: theme,
			lightSrc: item.images.light[0]
				? `/${item.images.light[0]}.webp`
				: '',
			darkSrc: item.images.dark[0] ? `/${item.images.dark[0]}.webp` : '',
		});
	};

	/**
	 * Opens a video in fullscreen lightbox.
	 *
	 * @param item - Video item from the screenshot dataset
	 */
	const openVideo = (item: ScreenshotItem & { type: 'video' }) => {
		setLightbox({
			type: 'video',
			src: `/${item.video}`,
			label: item.label,
			caption: item.caption,
		});
	};

	return (
		<div className="mb-16">
			<div className="mb-10">
				<h3 className="text-lg font-medium text-foreground font-heading mb-2">
					Screenshots & recordings
				</h3>
				<p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
					Real screens from the running app. Image cards include light
					and dark variants — use the switcher in the top-right
					corner. Click any card to open it fullscreen. Video
					recordings have no audio.
				</p>
			</div>

			<div className="space-y-14">
				{beggy.screenshots.map((group) => {
					const meta = groupMeta[group.group];
					return (
						<div key={group.group}>
							<div className="mb-6">
								<div className="flex items-center gap-3 mb-2">
									<Badge
										variant="default"
										className="text-xs"
									>
										{meta?.label ?? group.group}
									</Badge>
									<div className="flex-1 h-px bg-border" />
									<span className="text-xs text-muted-foreground font-mono shrink-0">
										{group.items.length}{' '}
										{group.items.length === 1
											? 'item'
											: 'items'}
									</span>
								</div>
								{meta?.description && (
									<p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">
										{meta.description}
									</p>
								)}
							</div>

							<div
								className={cn(
									'grid gap-4',
									group.items.length === 1
										? 'grid-cols-1 max-w-lg'
										: group.items.length === 2
											? 'grid-cols-1 sm:grid-cols-2'
											: group.items.length === 4
												? 'grid-cols-1 sm:grid-cols-2'
												: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
								)}
							>
								{group.items.map((item) => (
									<div
										key={item.id}
										className="screenshot-card rounded-xl overflow-hidden"
									>
										{item.type === 'video' ? (
											<VideoCard
												item={item}
												onOpen={() => openVideo(item)}
											/>
										) : (
											<ImageCard
												item={item}
												onOpen={(theme) =>
													openImage(item, theme)
												}
											/>
										)}
									</div>
								))}
							</div>
						</div>
					);
				})}
			</div>

			<Lightbox state={lightbox} onClose={() => setLightbox(null)} />
		</div>
	);
};

export default Screenshots;

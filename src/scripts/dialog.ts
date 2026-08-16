const resetDialogMedia = (dialog: HTMLDialogElement): void => {
	dialog.querySelectorAll<HTMLVideoElement>("[data-video-file]").forEach((video) => {
		video.pause();
		video.currentTime = 0;
	});

	dialog.querySelectorAll<HTMLIFrameElement>("[data-video-embed]").forEach((frame) => {
		const src = frame.src;
		frame.src = "";
		frame.src = src;
	});
};

export function initDialogs(): void {
	document.querySelectorAll<HTMLDialogElement>("[data-dialog]").forEach((dialog) => {
		if (dialog.dataset.dialogReady === "true") return;
		dialog.dataset.dialogReady = "true";

		document
			.querySelectorAll<HTMLElement>(`[data-dialog-open="${dialog.id}"]`)
			.forEach((trigger) => {
				trigger.addEventListener("click", () => dialog.showModal());
			});

		dialog.querySelectorAll<HTMLElement>("[data-dialog-close]").forEach((trigger) => {
			trigger.addEventListener("click", () => dialog.close());
		});

		dialog.addEventListener("click", (event) => {
			if (event.target === dialog) dialog.close();
		});

		dialog.addEventListener("close", () => resetDialogMedia(dialog));
	});
}

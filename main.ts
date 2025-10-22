import { Plugin, WorkspaceLeaf } from 'obsidian';

// Remember to rename these classes and interfaces!
interface UpdateSpentTimeSettings {
}

const DEFAULT_SETTINGS: UpdateSpentTimeSettings = {
}

export default class UpdateSpentTime extends Plugin {
	settings: UpdateSpentTimeSettings;

	private boundContainers: WeakSet<HTMLElement> = new WeakSet();

	async onload() {
		// Listen for leaf changes
		this.registerEvent(
			this.app.workspace.on("active-leaf-change", (leaf: WorkspaceLeaf) => {
				this.bindTimerButtons(leaf);
			})
		);
	}

	onunload() { }

	private bindTimerButtons(leaf: WorkspaceLeaf) {
		const container = leaf.view.containerEl;
		if (this.boundContainers.has(container)) return;
		this.boundContainers.add(container);

		// Delegated click listener
		container.addEventListener("click", async (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			const btn = target.closest(".simple-time-tracker-btn");
			if (!btn) return;

			const label = btn.getAttribute("aria-label") || "";
			if (label === "End") {
				await this.updateSpentPropertyForNote(leaf);
			}
		});
	}

	// Pass the app explicitly so `this` isn’t lost
	async updateSpentPropertyForNote(leaf: WorkspaceLeaf) {
		const note = leaf.view.file;
		if (!note) return;

		// Find the total time from the last timer div
		const timers = document.querySelectorAll('.simple-time-tracker-timer-time');
		if (!timers.length) return;

		const lastTimer = timers[timers.length - 1];
		if (!lastTimer || lastTimer == null) return;

		const spentTime = lastTimer.textContent.trim();

		await leaf.app.fileManager.processFrontMatter(note, (frontmatter) => {
			frontmatter["spent"] = spentTime;
		});

		await leaf.view.app.fileManager.processFrontMatter(note, (frontmatter) => {
			frontmatter["spent"] = spentTime;
		});
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

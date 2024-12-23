export class Score {
	private scoreElement: HTMLElement;
	private score: number;

	constructor(scoreElmentId: string) {
		this.scoreElement = document.getElementById(scoreElmentId) as HTMLElement;
		this.score = 0;
		this.updateScoreElement();
	}

	public getScore(): number {
		return this.score;
	}

	public updateScore(newScore: number) {
		this.score = newScore;
		this.updateScoreElement();
	}

	private updateScoreElement() {
		this.scoreElement.textContent = `Score: ${this.score}`;
	}

	public resetScore() {
		this.score = 0;
		this.updateScoreElement();
	}
}

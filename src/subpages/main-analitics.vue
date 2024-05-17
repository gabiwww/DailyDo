<template>
	<div class="home">
		<MainHeader />
		<MainMobileHeader />
		<div class="home-content">
			<div class="home-text">
				<h1>Statystyki</h1>
			</div>
			<div class="home-box">
				<div class="home-box-left">
					<h2>Aktualna passa</h2>
					<p>8 dni</p>
				</div>
				<div class="home-box-right">
					<h2>Nadjłuższa passa</h2>
					<p>25 dni</p>
				</div>
			</div>
			<div class="activities">
				<div class="activities-content" @click="toggleActivities">
					<div class="activities-top">
						<h2>Uwzględnione aktywności</h2>
						<img
							:class="{ active: isActivitiesOpen }"
							src="@assets/arrow-down.svg"
							alt=""
						/>
					</div>
					<div class="activities-bottom" :class="{ active: isActivitiesOpen }">
						<div class="activities-item">
							<div class="activities-item-left">
								<img src="@assets/square-pink.svg" alt="" />
								<h2>Krótki spacer</h2>
							</div>
							<div class="activities-item-right">
								<img src="@assets/eye.svg" alt="" />
							</div>
						</div>
						<div class="activities-item">
							<div class="activities-item-left">
								<img src="@assets/square-yellow.svg" alt="" />
								<h2>Przerwa na kawę</h2>
							</div>
							<div class="activities-item-right">
								<img src="@assets/eye.svg" alt="" />
							</div>
						</div>
						<div class="activities-item">
							<div class="activities-item-left">
								<img src="@assets/square-green.svg" alt="" />
								<h2>Aktywność 3</h2>
							</div>
							<div class="activities-item-right">
								<img src="@assets/eye-closed.svg" alt="" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="analitics">
				<div class="analitics-top">
					<p>Wyświetl</p>
					<a href="#" class="active">Ostatni rok</a>
					<a href="#">Ostatnie pół roku</a>
					<a href="#">Ostatni miesiąc</a>
					<a href="#">Ostatni tydzień</a>
				</div>
				<canvas ref="chart"></canvas>
			</div>
		</div>
	</div>
</template>

<script>
import MainHeader from '@main-components/main-header.vue';
import MainMobileHeader from '@main-components/main-mobile-header.vue';
import { Chart, registerables } from 'chart.js';

export default {
	components: {
		MainHeader,
		MainMobileHeader,
	},
	data() {
		return {
			isActivitiesOpen: false,
			chart: null,
		};
	},
	methods: {
		toggleActivities() {
			this.isActivitiesOpen = !this.isActivitiesOpen;
		},
	},
	mounted() {
		Chart.register(...registerables);
		this.chart = new Chart(this.$refs.chart, {
			type: 'line',
			data: {
				labels: [
					'kwiecień',
					'maj',
					'czerwiec',
					'lipiec',
					'sierpień',
					'wrzesień',
				],
				datasets: [
					{
						data: [20, 40, 20, 100, 60, 80],
						borderColor: '#FFB800',
						pointBackgroundColor: '#FFB800',
						pointRadius: 8,
						fill: false,
					},
					{
						data: [60, 80, 60, 40, 20, 40],
						borderColor: '#C200FF',
						pointBackgroundColor: '#C200FF',
						fill: false,
						pointRadius: 8,
					},
				],
			},
			options: {
				responsive: true,
				scales: {
					y: {
						beginAtZero: true,
					},
				},
				plugins: {
					legend: {
						display: false,
					},
				},
			},
		});
	},
};
</script>

<style lang="scss" scoped>
.home {
	width: 100%;
	height: 1024px;
	align-items: center;
	flex-direction: column;
	background: url('@assets/bg2.png');
	position: relative;
	.home-content {
		width: 95%;
		margin-left: auto;
		margin-right: auto;
		.home-text {
			padding-top: 2rem;
			margin-bottom: 2rem;
			h1 {
				text-align: center;
				font-size: 32px;
				font-weight: 700;
				color: var(--blue);
				text-transform: uppercase;
			}
		}

		.home-box {
			width: 770px;
			margin-left: auto;
			margin-right: auto;
			display: flex;
			margin-bottom: 4rem;
			justify-content: center;
			.home-box-left {
				margin-right: 2rem;
				h2 {
					font-size: 16px;
					font-weight: 700;
					color: var(--blue);
				}
				p {
					font-size: 24px;
					font-weight: 600;
					color: var(--blue);
					text-align: center;
				}
			}

			.home-box-right {
				h2 {
					font-size: 16px;
					font-weight: 700;
					color: var(--blue);
				}
				p {
					font-size: 24px;
					font-weight: 600;
					color: var(--blue);
					text-align: center;
				}
			}
		}
		.activities {
			margin-bottom: 2rem;
			width: 770px;
			margin-left: auto;
			margin-right: auto;
			display: flex;
			justify-content: center;
			.activities-content {
				width: 360px;
				background-color: var(--white-opacity);
				border-radius: 15px;
				padding: 1rem;
				box-shadow: var(--shadow);
				cursor: pointer;
				.activities-top {
					display: flex;
					align-items: center;
					justify-content: space-between;
					h2 {
						font-size: 16px;
						color: var(--blue);
						font-weight: 700;
					}
					img {
						transition: 0.5s;
						&.active {
							transform: rotate(180deg);
						}
					}
				}
				.activities-bottom {
					display: none;
					.activities-item:first-child {
						margin-top: 1rem;
					}
					.activities-item:not(:last-child) {
						margin-bottom: 1rem;
					}
					.activities-item {
						display: flex;
						justify-content: space-between;
						height: 48px;
						align-items: center;
						.activities-item-left {
							display: flex;
							img {
								margin-right: 1rem;
							}
							h2 {
								font-size: 16px;
								color: var(--blue);
								font-weight: 700;
								text-transform: uppercase;
							}
						}
					}
					&.active {
						display: block;
					}
				}
			}
		}
		.analitics {
			width: 770px;
			height: 455px;
			margin-left: auto;
			margin-right: auto;
			background-color: var(--white-opacity);
			border-radius: 15px;
			padding: 1rem;
			box-shadow: var(--shadow);
			.analitics-top {
				display: flex;
				margin-bottom: 1rem;
				p {
					font-size: 16px;
					font-weight: 400;
					color: var(--blue);
					margin-right: 1rem;
				}
				a {
					font-size: 16px;
					font-weight: 400;
					color: var(--light-blue);
					margin-right: 1rem;
					text-decoration: none;
					text-underline-offset: 4px;
					transition: 0.5s;
					&:hover {
						color: var(--blue);
						text-decoration: underline;
					}
					&.active {
						color: var(--blue);
						font-weight: 700;
						text-decoration: underline;
					}
				}
			}
		}
	}
	.mobile-header {
		display: none;
	}
}

@media screen and (max-width: 1200px) {
	.home {
		.header {
			display: none;
		}
		.mobile-header {
			display: flex;
		}
		.home-content {
			.home-box {
				display: flex;
				justify-content: center;
				text-align: center;
				width: 100%;
			}
			.activities {
				width: 100%;
				.activities-content {
					width: 100%;
				}
			}
			.analitics {
				width: 100%;
				height: 100%;
			}
			.home-text {
				h1 {
					font-size: 24px;
					text-align: left;
				}
			}
		}
	}
}
</style>

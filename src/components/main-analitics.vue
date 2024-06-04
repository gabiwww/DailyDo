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
        <div class="activities-content">
          <div class="activities-top">
            <h2>Uwzględnione aktywności</h2>
            <img
              :class="{ active: isActivitiesOpen }"
              src="@assets/arrow-down.svg"
              alt=""
              @click="toggleActivities"
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
          <a
            href="#"
            @click.prevent="displayChart('year')"
            :class="{ active: selectedChart === 'year' }"
            >Ostatni rok</a
          >
          <a
            href="#"
            @click.prevent="displayChart('sixMonths')"
            :class="{ active: selectedChart === 'sixMonths' }"
            >Ostatnie pół roku</a
          >
          <a
            href="#"
            @click.prevent="displayChart('month')"
            :class="{ active: selectedChart === 'month' }"
            >Ostatni miesiąc</a
          >
          <a
            href="#"
            @click.prevent="displayChart('week')"
            :class="{ active: selectedChart === 'week' }"
            >Ostatni tydzień</a
          >
        </div>
        <canvas ref="chart"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import MainHeader from "@main-components/main-header.vue";
import MainMobileHeader from "@main-components/main-mobile-header.vue";
import { Chart, registerables } from "chart.js";
import { api } from "../lib/api";

export default {
  components: {
    MainHeader,
    MainMobileHeader,
  },
  data() {
    this.myChart = null;
    return {
      data: null,
      isActivitiesOpen: false,
      selectedChart: "year",
      chartData: {
        year: {
          labels: [
            "Czerwiec",
            "Lipiec",
            "Sierpień",
            "Wrzesień",
            "Październik",
            "Listopad",
            "Grudzień",
            "Styczeń",
            "Luty",
            "Marzec",
            "Kwiecień",
            "Maj",
          ],
          data: [null, null, null, 40, 50, 60, 10, 20, 0, 60, 70, 75],
        },
        sixMonths: {
          labels: ["Grudzień","Styczeń", "Luty", "Marzec", "Kwiecień", "Maj"],
          data: [10, 20, 30, 40, 50, 60],
        },
        month: {
          labels: ["Tydzień 5", "Tydzień 4", "Tydzień 3", "Tydzień 2", "Ten tydzień"],
          data: [30, 10, 20, 100, 80],
        },
        week: {
          labels: [
            "Niedziela",
            "Poniedziałek",
            "Wtorek",
            "Środa",
            "Czwartek",
            "Piątek",
            "Sobota",
          ],
          data: [0,0,100,100,0,100,0],
        },
      },
    };
  },

  methods: {
    toggleActivities() {
      this.isActivitiesOpen = !this.isActivitiesOpen;
    },

    displayChart(type) {
      this.selectedChart = type;
      const chartInfo = this.chartData[type];
      this.chart.data.labels = chartInfo.labels;

      let newData = [];
      if (type === "year") {
        newData = chartInfo.data.slice(0, 12);
      } else if (type === "sixMonths") {
        newData = chartInfo.data.slice(0, 6);
      } else if (type === "month") {
        newData = chartInfo.data.slice(0, 5);
      } else if (type === "week") {
        newData = chartInfo.data;
      }

      this.chart.data.datasets[0].data = newData;

      this.chart.update();
    },
  },

  async mounted() {
    try {
      const response = await api({
        url: "/statistics/${habit}",
        method: "GET",
      });
      const fetchedData = await response.json();

      this.data = fetchedData;

      this.displayChart(this.selectedChart);

    } catch (error) {
      console.log(error);
    }

    Chart.register(...registerables);
    this.chart = new Chart(this.$refs.chart, {
      type: "line",
      data: {
        labels: ["Grudzień","Styczeń", "Luty", "Marzec", "Kwiecień", "Maj"],
        datasets: [
          {
            data: [20, 40, 20, 100, 60, 80],
            borderColor: "#FFB800",
            pointBackgroundColor: "#FFB800",
            pointRadius: 8,
            fill: false,
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
    this.displayChart(this.selectedChart);
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 1024px;
  align-items: center;
  flex-direction: column;
  background: rgb(15, 71, 135);
  background: linear-gradient(
    90deg,
    rgba(15, 71, 135, 0.6) 0%,
    rgba(255, 255, 255, 1) 50%,
    rgba(15, 71, 135, 0.6) 100%
  );
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

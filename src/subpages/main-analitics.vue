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
              src="@/assets/arrow-down.svg"
              alt=""
              @click="toggleActivities"
            />
          </div>
          <div class="activities-bottom" :class="{ active: isActivitiesOpen }">
            <div v-for="(habit, index) in data" :key="habit.id" class="activities-item">
              <div class="activities-item-left">
                <div :style="{ backgroundColor: getColor(index) }" class="color-box"></div>
                <h2>{{ habit.name }}</h2>
              </div>
              <div class="activities-item-right">
                <img
                  :src="habit.visible ? eyeClosed : eyeOpen"
                  alt="Visibility Icon"
                  @click="toggleVisibility(habit)"
                />
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
import eyeOpen from '@/assets/eye.svg';
import eyeClosed from '@/assets/eye-closed.svg';

export default {
  components: {
    MainHeader,
    MainMobileHeader,
  },
  data() {
    return {
      myChart: null,
      data: null,
      activities: [],
      isActivitiesOpen: false,
      selectedChart: "year",
      eyeOpen: eyeOpen,
      eyeClosed: eyeClosed,
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
          data: [
            [30, 40, 50, 60, 70, 80, 90, 20, 10, 40, 50, 60], // MEETING
            [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120], // SPOTKANIE
            [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160], // KAWA
            [20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130], // SPOTKAN1
            [15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 115, 125], // SPOTKANIE2
            [5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 115] // SPOTKANIE3
          ]
        },
        sixMonths: {
          labels: ["Grudzień", "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj"],
          data: [
            [10, 20, 30, 40, 50, 60], // MEETING
            [5, 15, 25, 35, 45, 55], // SPOTKANIE
            [25, 35, 45, 55, 65, 75], // KAWA
            [10, 15, 20, 25, 30, 35], // SPOTKAN1
            [20, 25, 30, 35, 40, 45], // SPOTKANIE2
            [15, 20, 25, 30, 35, 40] // SPOTKANIE3
          ]
        },
        month: {
          labels: ["Tydzień 5", "Tydzień 4", "Tydzień 3", "Tydzień 2", "Ten tydzień"],
          data: [
            [5, 10, 15, 20, 25], // MEETING
            [10, 20, 30, 40, 50], // SPOTKANIE
            [15, 30, 45, 60, 75], // KAWA
            [20, 40, 60, 80, 100], // SPOTKAN1
            [10, 25, 40, 55, 70], // SPOTKANIE2
            [5, 20, 35, 50, 65] // SPOTKANIE3
          ]
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
          data: [
            [10, 20, 30, 40, 50, 60, 70], // MEETING
            [5, 15, 25, 35, 45, 55, 65], // SPOTKANIE
            [15, 30, 45, 60, 75, 90, 105], // KAWA
            [10, 20, 30, 40, 50, 60, 70], // SPOTKAN1
            [5, 15, 25, 35, 45, 55, 65], // SPOTKANIE2
            [0, 10, 20, 30, 40, 50, 60] // SPOTKANIE3
          ]
        },
      },
      colors: ["#FFB800", "#FF5733", "#33FF57", "#3357FF", "#FF33A8", "#A833FF", "#33FFF3"]
    };
  },
  
  methods: {
    toggleActivities() {
      this.isActivitiesOpen = !this.isActivitiesOpen;
    },

    displayChart(type) {
      if (!this.data) return;

      this.selectedChart = type;
      const chartInfo = this.chartData[type];
      this.chart.data.labels = chartInfo.labels;

      const newDatasets = this.data
        .map((habit, index) => {
          if (habit.visible) {
            return {
              label: habit.name,
              data: chartInfo.data[index],
              borderColor: this.getColor(index),
              pointBackgroundColor: this.getColor(index),
              pointRadius: 8,
              fill: false,
            };
          }
          return null;
        })
        .filter(dataset => dataset !== null);

      this.chart.data.datasets = newDatasets;
      this.chart.update();
    },

    getColor(index) {
      return this.colors[index % this.colors.length];
    },

    toggleVisibility(habit) {
      habit.visible = !habit.visible;
      this.displayChart(this.selectedChart);
    }
  },

  async mounted() {
    try {
      const response = await api({
        url: "/habits",
        method: "GET",
      });
      const fetchedData = await response.json();
      this.data = fetchedData.habits.map(habit => ({
        ...habit,
        visible: true, // ustawiamy pole visible na true dla każdego habit
      }));

      this.displayChart(this.selectedChart);
    } catch (error) {
      console.log(error);
    }

    Chart.register(...registerables);
    this.chart = new Chart(this.$refs.chart, {
      type: "line",
      data: {
        labels: [],
        datasets: []
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
              align-items: center;
              margin-right: auto;
              .color-box {
                width: 24px;
                height: 24px;
                margin-right: 1rem;
              }
              h2 {
                font-size: 16px;
                color: var(--blue);
                font-weight: 700;
                text-transform: uppercase;
              }
            }

            .activities-item-right {
              display: flex;
              align-items: center;
              img {
                width: 24px;
                height: 24px;
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

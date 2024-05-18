<template>
  <div class="home">
    <MainHeader />
    <MainMobileHeader />
    <div class="home-content">
      <div class="home-text">
        <h1>Aktywności</h1>
      </div>
      <div
        v-for="(activity, index) in activities"
        :key="index"
        class="home-box"
      >
        <div :class="{ 'box-top': true, active: isActive[index] }">
          <h2>{{ activity.title }}</h2>
          <img
            :class="{ active: isActive[index] }"
            src="@assets/arrow-down.svg"
            @click="toggleActive(index)"
            alt=""
          />
        </div>
        <div class="box-mid">
          <p>{{ activity.schedule }}</p>
        </div>
        <div class="box-bottom" :class="{ active: isActive[index] }">
          <input type="checkbox" />
          <p>{{ activity.note }}</p>
        </div>
      </div>
      <div class="home-bottom">
        <button class="home-bottom-btn" @click="manageActivities">
          Zarządzaj aktywnościami
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import MainHeader from "@main-components/main-header.vue";
import MainMobileHeader from "@main-components/main-mobile-header.vue";
import { api } from "../lib/api";

export default {
  components: {
    MainHeader,
    MainMobileHeader,
  },
  data() {
    return {
      isActive: [],
      activities: [],
    };
  },
  async mounted() {
    try {
      const response = await api({ url: "/habits", method: "GET" });
      const data = await response.json();

      this.activities = data?.habits.filter((item)=>{
        const date = new Date();
        const daysOfWeek = [
          'SUNDAY',
          'MONDAY',
          'TUESDAY',
          'WEDNESDAY',
          'THURSDAY',
          'FRIDAY',
          'SATURDAY',
        ];
        const currentDayOfWeek = daysOfWeek[date.getDay()];
        const daysUpper = item.days.map((day)=>day.toUpperCase());
       if(daysUpper.includes(currentDayOfWeek)){return true} else {return false}

        }).map((habit) => ({
        title: habit.name,
        schedule:
          habit.days.length === 7
            ? "Codziennie"
            : habit.days.map((day) => day.toLowerCase()).join(", ") +
              ` | ${habit.hour}`,
        note: habit.note,
      }));
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    toggleActive(index) {
      this.isActive[index] = !this.isActive[index];
    },
    manageActivities() {
      this.$router.push("/main-manage");
    },
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
    .home-text {
      padding-top: 2rem;
      margin-bottom: 2rem;
      h1 {
        text-align: center;
        color: var(--blue);
        font-size: 32px;
        font-weight: 700;
        text-transform: uppercase;
      }
    }
    .home-box:not(:last-child) {
      margin-bottom: 2rem;
    }
    .home-box {
      margin-left: auto;
      margin-right: auto;
      width: 643px;
      padding: 1rem;
      background-color: var(--white-opacity);
      border-radius: 15px;
      cursor: pointer;
      box-shadow: var(--shadow);
      .box-top {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
        h2 {
          font-size: 22px;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--blue);
        }
        img {
          transition: 0.5s;
          &.active {
            transform: rotate(180deg);
          }
        }
      }
      .box-mid {
        color: var(--light-blue);
        margin-bottom: 1rem;
      }
      .box-bottom {
        display: none;
        input {
          width: 20px;
          height: 20px;
          margin-right: 1rem;
          cursor: pointer;
        }
        p {
          font-size: 18px;
          color: var(--blue);
          font-weight: 700;
        }
        &.active {
          display: flex;
        }
      }
    }
    .home-bottom {
      position: fixed;
      bottom: 1rem;
      left: 42%;
      .home-bottom-btn {
        width: 240px;
        height: 41px;
        font-size: 16px;
        font-weight: 700;
        border-radius: 25px;
        background-color: var(--blue);
        border: 1px solid var(--blue);
        color: var(--white);
        margin-bottom: 1rem;
        box-shadow: var(--shadow);
        cursor: pointer;
      }
    }
    .home-list {
      position: absolute;
      left: auto;
      top: 150px;
      display: flex;
      margin-left: 3rem;
      img {
        margin-right: 1rem;
      }
      p {
        font-size: 12px;
        color: var(--blue);
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
      .home-text {
        h1 {
          width: 95%;
          margin-left: auto;
          margin-right: auto;
          font-size: 24px;
          text-align: left;
        }
      }
      .home-box {
        width: 95%;
      }
      .home-list {
        display: none;
      }
      .home-bottom {
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
}
</style>

<template>
  <div class="home">
    <MainHeader />
    <MainMobileHeader />
    <div class="home-content">
      <div class="home-text">
        <h1>Zarządzanie aktywnościami</h1>
        <p>Dodaj lub edytuj swoje codzienne aktywności</p>
      </div>
      <div
        v-for="(activity, index) in activities"
        :key="index"
        class="home-box"
        @click="toggleActive(index)"
      >
        <div :class="{ 'box-top': true, active: isActive[index] }">
          <h2>{{ activity.title }}</h2>
          <img
            :class="{ active: isActive[index] }"
            src="@assets/arrow-down.svg"
            alt=""
          />
        </div>
        <div class="box-mid">
          <p>{{ activity.schedule }}</p>
        </div>
        <div class="box-bottom" :class="{ active: isActive[index] }">
          <div class="box-bottom-left">
            <img src="@assets/analitics.svg" alt="" />
          </div>
          <div class="box-bottom-right">
            <router-link to="/main-edit-activity">
              <img src="@assets/edit.svg" alt="" />
            </router-link>
            <img src="@assets/trash.svg" alt="" @click="deleteOption" />
          </div>
        </div>
      </div>
      <div class="home-bottom">
        <button class="home-bottom-btn" @click="addActivity">
          Dodaj aktywność
        </button>
      </div>
      <div class="home-list" style="cursor: pointer" @click="backToActivities">
        <img src="@assets/arrow-left.svg" alt="" />
        <p>wróć do listy aktywności</p>
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

      this.activities = data?.habits.map((habit) => ({
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
    addActivity() {
      this.$router.push("/main-add-activity");
    },
    backToActivities() {
      this.$router.push("/main-activity");
    },
    deleteOption() {
      if (confirm("Czy chcesz usunąć aktywność?")) {
        console.log("Tak");
        //Tutaj funkcja back-end, która powinna usunąć
      } else {
        console.log("Nie");
        //Tutaj funkcja back-end, która powinna anulować
      }
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
  .home-content {
    width: 95%;
    margin-left: auto;
    margin-right: auto;
    .home-text {
      text-align: center;
      padding-top: 2rem;
      margin-bottom: 2rem;
      h1 {
        font-size: 32px;
        text-transform: uppercase;
        color: var(--blue);
        font-weight: 700;
        margin-bottom: 1rem;
      }
      p {
        font-size: 24px;
        font-weight: 400;
        color: var(--blue);
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
        .box-bottom-right {
          img:not(:last-child) {
            margin-right: 1rem;
          }
        }
        &.active {
          display: flex;
          justify-content: space-between;
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
          font-size: 24px;
          text-align: left;
        }
        p {
          text-align: left;
        }
      }
      .home-box {
        width: 100%;
      }
      .home-bottom {
        left: 50%;
        transform: translateX(-50%);
      }
      .home-list {
        display: none;
      }
    }
  }
}
</style>

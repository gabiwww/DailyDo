<template>
  <div class="mobile-header">
    <div class="mobile-header-content">
      <div class="mobile-header-logo">
        <router-link to="/">DailyDo</router-link>
      </div>
      <div class="mobile-header-menu">
        <img
          src="@assets/menu.svg"
          class="open-menu"
          :class="{ active: isMenuOpen }"
          alt=""
          @click="toggleMenu"
        />
        <img
          src="@assets/close-menu.svg"
          class="close-menu"
          :class="{ active: !isMenuOpen }"
          alt=""
          @click="toggleMenu"
        />
      </div>
    </div>
  </div>
  <div class="mobile-header-main-menu" :class="{ active: isMenuOpen }">
    <div class="mobile-header-menu-content">
      <div class="mobile-header-menu-link">
         <router-link to="/main-activity">Aktywności</router-link>
      </div>
      <div class="mobile-header-menu-link">
        <router-link to="/main-analitics">Statystyki</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>

<style scoped>
/* Tu możesz umieścić style CSS dla komponentu */
.mobile-header-main-menu {
  display: none;
}
.mobile-header-main-menu.active {
  display: block;
}
</style>

<style lang="scss" scoped>
.mobile-header {
  display: none;
}
@media screen and (max-width: 1200px) {
  .mobile-header {
    display: flex;
  }
  .mobile-header-main-menu {
    top: 80px;
    height: 100%;
    width: 100%;
    position: absolute;
    left: -100%;
    background-color: var(--blue);
    border-top: 1px solid var(--white);
    transition: 0.5s;
    z-index: 999;
    &.active {
      left: 0;
    }
    .mobile-header-menu-content {
      width: 95%;
      margin-left: auto;
      margin-right: auto;
      .mobile-header-menu-link:first-child {
        margin-top: 2rem;
      }
      .mobile-header-menu-link:not(:last-child) {
        margin-bottom: 1rem;
      }
      .mobile-header-menu-link {
        height: 40px;
        display: flex;
        align-items: center;
        border-top: 1px solid var(--white-opacity);
        border-bottom: 1px solid var(--white-opacity);
        a {
          color: var(--white);
          text-decoration: none;
          font-weight: 600;
          font-size: 16px;
        }
      }
    }
  }
  .mobile-header {
    background-color: var(--blue);
    height: 80px;
    display: flex;
    z-index: 999;
    .mobile-header-content {
      width: 95%;
      margin-left: auto;
      margin-right: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .mobile-header-logo {
        flex: 1;
        text-align: center;
        a {
          font-size: 24px;
          color: var(--white);
          font-weight: 700;
          text-decoration: none;
        }
      }
      .mobile-header-menu {
        flex: 0;
        margin-left: auto;
        display: flex;
        .open-menu {
          display: block;
          cursor: pointer;
          &.active {
            display: none;
          }
        }
        .close-menu {
          display: block;
          cursor: pointer;
          &.active {
            display: none;
          }
        }
      }
    }
  }
}
</style>

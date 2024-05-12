<template>
  <div class="home">
    <MainHeader />
    <MainMobileHeader />
    <div class="home-content">
      <div class="home-text">
        <h1>Nowa aktywność</h1>
      </div>
      <div class="home-box">
        <div class="box-text">
          <h2>Nazwa*</h2>
        </div>
        <div class="box-input">
          <input type="text" placeholder="wpisz nazwę aktywności" />
        </div>
        <div class="box-text">
          <h2>Notatka</h2>
        </div>
        <div class="box-input">
          <input type="text" placeholder="wpisz dodatkowe informacje" />
        </div>
      </div>
      <div class="home-box">
        <div class="box-text">
          <h2>Cykliczność*</h2>
        </div>
        <div class="home-box-columns">
          <div class="home-box-left">
            <div class="box-desc">
              <p>Dni tygodnia</p>
            </div>
            <div class="box-cal">
              <div class="box-cal-item">
                <h3>Codziennie</h3>
                <input type="checkbox" />
              </div>
              <div class="box-cal-item">
                <h3>Poniedziałki</h3>
                <input type="checkbox" />
              </div>
              <div class="box-cal-item">
                <h3>Wtorki</h3>
                <input type="checkbox" />
              </div>
              <div class="box-cal-item">
                <h3>Środy</h3>
                <input type="checkbox" />
              </div>
              <div class="box-cal-item">
                <h3>Czwartki</h3>
                <input type="checkbox" />
              </div>
              <div class="box-cal-item">
                <h3>Piątki</h3>
                <input type="checkbox" />
              </div>
            </div>
          </div>
          <div class="home-box-right">
            <div class="box-desc">
              <p>Godzina</p>
            </div>
            <div class="box-select">
              <span class="select-styled">
                <select>
                  <option value="8:00">8:00</option>
                  <option value="9:00">9:00</option>
                  <option value="10:00">10:00</option>
                </select>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="home-bottom">
        <button class="home-bottom-btn">Zapisz</button>
      </div>
      <div class="home-list">
        <img src="@assets/arrow-left.svg" alt="" />
        <p>wróć do listy aktywności</p>
      </div>
    </div>
  </div>
</template>

<script>
import MainHeader from "@main-components/main-header.vue";
import MainMobileHeader from "@main-components/main-mobile-header.vue";

export default {
  components: {
    MainHeader,
    MainMobileHeader,
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 1024px;
  align-items: center;
  flex-direction: column;
  background: url("@assets/bg2.png");
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
    .home-box {
      margin-left: auto;
      margin-right: auto;
      width: 643px;
      padding: 1rem;
      background-color: var(--white-opacity);
      border-radius: 15px;
      cursor: pointer;
      box-shadow: var(--shadow);
      .box-text {
        margin-bottom: 1rem;
        h2 {
          font-size: 22px;
          color: var(--blue);
          font-weight: 600;
        }
      }
      .box-input:not(:last-of-type) {
        input {
          width: 100%;
          border-radius: 15px;
          font-size: 16px;
          border: none;
          box-shadow: var(--shadow);
          font-weight: 700;
          color: var(--light-blue);
          padding-left: 1rem;
          margin-bottom: 1rem;
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
        }
        ::placeholder {
          color: var(--light-blue);
          opacity: 1;
        }
      }
      .box-input:last-child {
        input {
          width: 100%;
          border-radius: 15px;
          font-size: 16px;
          border: none;
          box-shadow: var(--shadow);
          font-weight: 700;
          color: var(--light-blue);
          padding-left: 1rem;
          margin-bottom: 1rem;
          padding-top: 0.5rem;
          padding-bottom: 4rem;
        }
        ::placeholder {
          color: var(--light-blue);
          opacity: 1;
        }
      }
      .home-box-columns {
        .home-box-left {
          .box-desc {
            margin-bottom: 1rem;
            p {
              font-size: 14px;
              color: var(--light-blue);
              font-weight: 400;
            }
          }
          .box-cal {
            display: flex;
            justify-content: space-between;
            margin-bottom: 1rem;
            .box-cal-item:first-child {
              display: flex;
              align-items: center;
              flex-direction: column;
              h3 {
                margin-bottom: 1rem;
                font-size: 16px;
                color: var(--blue);
                font-weight: 700;
              }
            }
            .box-cal-item:not(:first-child) {
              display: flex;
              align-items: center;
              flex-direction: column;
              h3 {
                margin-bottom: 1rem;
                font-size: 16px;
                color: var(--blue);
                font-weight: 400;
              }
            }
          }
        }
        .home-box-right {
          .box-desc {
            margin-bottom: 1rem;
            p {
              font-size: 14px;
              color: var(--light-blue);
              font-weight: 400;
            }
          }
          .box-select {
            .select-styled {
              select {
                width: 162px;
                height: 31px;
                border: none;
                box-shadow: var(--shadow);
                color: var(--light-blue);
                border-radius: 15px;
                padding-left: 1rem;
                font-size: 14px;
                font-weight: 600;
                -webkit-appearance: none;
                background: url("@assets/arrow-down.svg");
                background-repeat: no-repeat;
                background-position-x: 90%;
                background-position-y: 50%;
                cursor: pointer;
              }
            }
          }
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
        background-color: var(--light-blue);
        border: 1px solid var(--light-blue);
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
    .home-box:not(:last-child) {
      margin-bottom: 2rem;
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
      .home-list {
        display: none;
      }
      .home-text {
        width: 95%;
        margin-left: auto;
        margin-right: auto;
        h1 {
          text-align: left;
          font-size: 24px;
        }
      }
      .home-box {
        width: 95%;
        margin-left: auto;
        margin-right: auto;
        .home-box-columns {
          display: flex;
          .home-box-left {
            width: calc(50% - 1rem);
            .box-cal {
              display: flex;
              flex-direction: column;
              .box-cal-item:first-child {
                flex-direction: row;
                input {
                  margin-left: 1rem;
                  position: relative;
                  bottom: 8px;
                }
              }
              .box-cal-item:not(:first-child) {
                flex-direction: row;
                input {
                  margin-left: 1rem;
                  position: relative;
                  bottom: 8px;
                }
              }
            }
          }
          .home-box-right {
            width: calc(50% - 1rem);
          }
        }
      }
      .home-bottom {
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
}
</style>

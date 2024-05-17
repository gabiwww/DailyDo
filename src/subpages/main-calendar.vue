<template>
  <div class="home">
    <MainHeader />
    <MainMobileHeader />
    <div class="home-content">
      <div class="home-text">
        <h1>Kalendarz</h1>
        <p>
          Synchronizuj z Kalendarzem Google
          <img src="@assets/calendar.svg" alt="" />
        </p>
      </div>
      <div class="home-columns">
        <div class="home-left">
          <div class="home-left-top">
            <h2>Dzisiaj</h2>
            <p>22.09.2024 - środa</p>
          </div>
          <div class="home-left-item">
            <p>9:00 Spotkanie z szefem</p>
          </div>
          <div class="home-left-item">
            <div class="home-left-checkbox">
              <input type="checkbox" />
              <h2>10:00 Przerwa na kawę</h2>
            </div>
            <div class="home-left-icon">
              <img src="@assets/arrow-down.svg" alt="" />
            </div>
          </div>
          <div class="home-left-item">
            <p>10:15 Daily</p>
          </div>
          <div class="home-left-item">
            <div class="home-left-checkbox">
              <input type="checkbox" />
              <h2>12:00 Krótki spacer</h2>
            </div>
            <div class="home-left-icon">
              <img src="@assets/arrow-down.svg" alt="" />
            </div>
          </div>
        </div>
        <div class="home-right">
          <div class="home-select">
            <span class="select-styled">
              <select>
                <option value="Wrzesień 2024">Wrzesień 2024</option>
                <option value="Listopad 2024">Październik 2024</option>
                <option value="Listopad 2024">Listopad 2024</option>
              </select>
            </span>
          </div>
          <div class="home-stripe-first">
            <div class="home-stripe-content">
              <div class="day-item">
                <p>Pn</p>
              </div>
              <div class="day-item">
                <p>Wt</p>
              </div>
              <div class="day-item">
                <p>Śr</p>
              </div>
              <div class="day-item">
                <p>Czw</p>
              </div>
              <div class="day-item">
                <p>Pt</p>
              </div>
              <div class="day-item">
                <p>Sb</p>
              </div>
              <div class="day-item">
                <p>Ndz</p>
              </div>
            </div>
          </div>
          <div class="home-stripe-second">
            <div class="arrow-left">
              <img src="@assets/arrow-left-light.svg" alt="" />
            </div>
            <div class="arrow-right">
              <img src="@assets/arrow-right-dark.svg" alt="" />
            </div>
            <div class="home-stripe-content">
              <div class="day-item">
                <p>18</p>
              </div>
              <div class="day-item">
                <p>19</p>
              </div>
              <div class="day-item">
                <p>20</p>
              </div>
              <div class="day-item">
                <p>21</p>
              </div>
              <div class="day-item">
                <p>22</p>
              </div>
              <div class="day-item">
                <p>23</p>
              </div>
              <div class="day-item">
                <p>24</p>
              </div>
            </div>
          </div>
          <div class="home-box">
            <div class="box-text">
              <h2>22.09.2024 - środa</h2>
            </div>
            <div class="box-item">
              <h3>9:00</h3>
              <p>Spotkanie z szefem</p>
            </div>
            <div class="box-item">
              <h4>10:00</h4>
              <h2>Przerwa na kawę</h2>
            </div>
            <div class="box-item">
              <h3>10:15</h3>
              <p>Daily</p>
            </div>
            <div class="box-item">
              <h4>12:00</h4>
              <h2>Krótki spacer</h2>
            </div>
          </div>
          <div class="home-box">
            <div class="box-text">
              <h2>23.09.2024 - czwartek</h2>
            </div>
            <div class="box-item">
              <h4>10:00</h4>
              <h2>Przerwa na kawę</h2>
            </div>
            <div class="box-item">
              <h3>10:15</h3>
              <p>Daily</p>
            </div>
            <div class="box-item">
              <h3>11:00</h3>
              <p>Spotkanie z działem marketingu</p>
            </div>
            <div class="box-item">
              <h4>12:00</h4>
              <h2>Krótki spacer</h2>
            </div>
          </div>
          <div class="home-box">
            <div class="box-text">
              <h2>24.09.2024 - piątek</h2>
            </div>
            <div class="box-item">
              <h4>10:00</h4>
              <h2>Przerwa na kawę</h2>
            </div>
            <div class="box-item">
              <h3>10:15</h3>
              <p>Daily</p>
            </div>
            <div class="box-item">
              <h4>12:00</h4>
              <h2>Krótki spacer</h2>
            </div>
          </div>
        </div>
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
        color: var(--blue);
        font-size: 32px;
        font-weight: 700;
        text-transform: uppercase;
        margin-bottom: 1rem;
      }
      p {
        font-size: 16px;
        color: var(--light-blue);
        font-weight: 700;
        text-align: center;
        img {
          padding-left: 1rem;
        }
      }
    }
    .home-columns {
      display: flex;
      justify-content: space-around;
      .home-left {
        width: calc(40% - 1rem);
        height: 100%;
        padding: 1rem;
        background-color: var(--white-opacity);
        border-radius: 15px;
        cursor: pointer;
        box-shadow: var(--shadow);
        .home-left-top {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
          h2 {
            font-size: 22px;
            font-weight: 700;
            color: var(--blue);
            text-transform: uppercase;
            margin-right: 1rem;
          }
          p {
            font-size: 16px;
            font-weight: 700;
            color: var(--blue);
          }
        }
        .home-left-item:not(:last-child) {
          border-bottom: 1px solid rgb(15, 71, 135, 0.1);
        }
        .home-left-item {
          height: 52px;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          p {
            font-size: 16px;
            color: var(--blue);
            font-weight: 400;
          }
          .home-left-checkbox {
            display: flex;
            align-items: center;
            input {
              margin-right: 1rem;
            }
            h2 {
              font-size: 16px;
              font-weight: 700;
              color: var(--blue);
              text-transform: uppercase;
            }
          }
        }
      }
      .home-right {
        width: calc(40% - 1rem);
        background-color: var(--white-opacity);
        border-radius: 15px;
        cursor: pointer;
        box-shadow: var(--shadow);
        .home-select {
          padding: 1rem;

          .select-styled {
            select {
              width: 162px;
              height: 31px;
              border: none;
              box-shadow: var(--shadow);
              color: var(--blue);
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
        .home-stripe-first {
          width: 100%;
          margin-left: auto;
          margin-right: auto;
          padding-bottom: 0.5rem;
          padding-top: 0.5rem;
          .home-stripe-content {
            width: 85%;
            margin-left: auto;
            margin-right: auto;
            display: flex;
            justify-content: space-between;
            position: relative;
            .day-item {
              p {
                font-size: 16px;
                font-weight: 400;
                color: var(--blue);
              }
            }
          }
        }
        .home-stripe-second {
          width: 100%;
          margin-left: auto;
          margin-right: auto;
          background-color: var(--white);
          padding-bottom: 0.5rem;
          padding-top: 0.5rem;
          position: relative;
          .arrow-left {
            position: absolute;
            left: 10px;
          }
          .arrow-right {
            position: absolute;
            right: 10px;
          }
          .home-stripe-content {
            width: 85%;
            margin-left: auto;
            margin-right: auto;
            display: flex;
            justify-content: space-between;
            position: relative;
            .day-item {
              p {
                font-size: 16px;
                font-weight: 400;
                color: var(--blue);
              }
            }
          }
        }
        .home-box {
          border-bottom: 1px solid rgb(15, 71, 135, 0.1);
          .box-text {
            width: 95%;
            margin-left: auto;
            margin-right: auto;
            padding-top: 1rem;
            h2 {
              font-size: 16px;
              font-weight: 700;
              color: var(--blue);
            }
          }
          .box-item:not(:last-child) {
            border-bottom: 1px solid rgb(15, 71, 135, 0.1);
          }
          .box-item {
            width: 95%;
            margin-left: auto;
            margin-right: auto;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            h3 {
              font-size: 16px;
              font-weight: 400;
              color: var(--blue);
            }
            h4 {
              font-size: 16px;
              font-weight: 700;
              color: var(--blue);
            }
            p {
              font-size: 16px;
              font-weight: 400;
              color: var(--blue);
            }
            h2 {
              font-size: 16px;
              font-weight: 700;
              color: var(--blue);
            }
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
      .home-text {
        h1 {
          text-align: left;
          font-size: 24px;
        }
        p {
          text-align: left;
          font-size: 14px;
        }
      }
      .home-columns {
        flex-direction: column;
        .home-left {
          width: 100%;
          margin-bottom: 2rem;
        }

        .home-right {
          width: 100%;
        }
      }
    }
  }
}
</style>

import styled from "styled-components";

export const GameDiv = styled.div`
  @import "../mixins/mixins";
  @import "../common/variables";
  position: relative;

  @include respond-to("screen-xs") {
    padding-bottom: 64px;
  }

  .chart-page {
    .chart-markup-table {
      &.time-axis {
        display: none !important;
      }
    }
  }

  .controls-row {
    @include respond-to("screen-xs") {
      margin-top: 24px !important;
    }

    @include respond-to("screen-sm") {
      margin-top: 0 !important;
    }

    @include respond-to("screen-md") {
      margin-top: -24px !important;
    }
  }

  .mobile-game-btn {
    position: fixed;
    bottom: 0;
    padding: 16px 8px;
    width: 100%;
    background: linear-gradient(326.9deg, #13132b 5.79%, #135e87 283.21%);
    z-index: 99;

    .game-btn {
      padding: 8px;
      //   font-weight: 700;

      &.long {
        color: #1d385a;
        background: linear-gradient(180deg, #5eff5b 0%, #30cf2d 100%);
      }

      &.short {
        background: linear-gradient(180deg, #ff2d2e 0%, #8f0001 100%);
      }

      &.close {
        background: linear-gradient(180deg, #991bf9 0%, #6400b0 100%);
      }

      &.next-day {
        background: linear-gradient(180deg, #02a3fe 0%, #7d40ff 100%);
      }
    }
  }

  .game-section {
    // padding: 24px;
    // background: $bg-color;
    border-radius: 14px;

    &.chart-container {
      height: 60vh;

      .chart-summary {
        display: flex;

        .summary {
          margin-right: 16px !important;
          font-size: 14px;

          .summary-value {
            color: $accent-color;
          }
        }
      }

      .game-body {
        padding: 0;
        height: 88%;

        iframe {
          border-bottom-left-radius: 14px;
          border-bottom-right-radius: 14px;
        }
      }
    }

    .game-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 24px;
      height: 70px;
      background: $bg-color;
      border-top-left-radius: 14px;
      border-top-right-radius: 14px;

      .header-title {
        display: flex;
        align-items: center;

        .img-container {
          padding: 4px;
          border-radius: 12px;

          &.practice {
            background: linear-gradient(180deg, #991bf9 0%, #6400b0 100%);
          }

          &.rank {
            background: linear-gradient(180deg, #ff2d2e 0%, #8f0001 100%);
          }

          &.casual {
            background: linear-gradient(180deg, #56ccf2 0%, #0081ab 100%);
          }

          &.tournament {
            background: linear-gradient(180deg, #ffa640 0%, #ea7d00 100%);
          }

          .icon {
            width: 30px;
          }
        }

        .game-mode {
          font-weight: 700;
          text-transform: capitalize;
        }
      }

      .end-game-btn {
        color: #6a6ba0;
        cursor: pointer;
        text-decoration: underline;
        transition: 0.35s;

        @include on-event() {
          color: #fff;
        }
      }
    }

    .game-body {
      padding: 16px 24px;
      // background: $bg-color;
      border-bottom-left-radius: 14px;
      border-bottom-right-radius: 14px;

      .user-container {
        display: flex;
        align-items: center;
        padding: 0 24px;
        margin: 8px 0 24px 0;

        .user-info {
          .user-name {
            font-weight: 700;
          }

          .username {
            color: #6a6ba0;
          }
        }
      }

      .game-info {
        margin: 8px 0;
        padding: 16px 8px;
        background: linear-gradient(
          180deg,
          rgba(2, 163, 254, 0.1) 0%,
          rgba(125, 64, 255, 0.1) 100%
        );
        border-radius: 14px;

        .categ {
          text-align: center;

          .title {
            color: #6a6ba0;
            font-size: 14px;
          }

          .value {
            .gain-loss-icon {
              margin-right: 4px;
              width: 32px;
            }

            &.plus {
              color: #5eff5b;
            }

            &.minus {
              color: #ff2d2e;
            }
          }
        }
      }

      .position-leverage {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .position-container {
          font-size: 13px;
          color: #6a6ba0;

          .amount {
            color: #fff;
            font-weight: 600;
          }
        }

        .options-container {
          display: flex;
          align-items: center;

          @include respond-to("screen-xs") {
            flex-direction: column;
          }

          @include respond-to("screen-sm") {
            flex-direction: column;
          }

          @include respond-to("screen-md") {
            flex-direction: column;
          }
        }

        .leverage-container {
          display: flex;
          align-items: center;
          justify-content: flex-end;

          &.stoploss {
            margin-left: 8px;

            @include respond-to("screen-xs") {
              margin-left: 0;
              margin-top: 8px;
            }

            @include respond-to("screen-sm") {
              margin-left: 0;
              margin-top: 8px;
            }

            @include respond-to("screen-md") {
              margin-left: 0;
              margin-top: 8px;
            }
          }

          small {
            color: #6a6ba0;
          }

          select {
            padding: 8px;
            // margin-left: auto;
            width: 100px;
            background: #161c29;
            border-color: #161c29;
            color: #fff;
            font-size: 12px;
            text-align: center;
            cursor: pointer;

            &:disabled {
              cursor: not-allowed;
            }

            &::after {
              display: none;
            }

            &:focus {
              box-shadow: none;
            }

            option {
              @include on-event() {
                background-color: #161c29 !important;
              }
            }
          }
        }
      }

      .btn-container {
        .game-btn {
          padding: 8px;
          //   font-weight: 700;

          &.long {
            color: #1d385a;
            background: linear-gradient(180deg, #5eff5b 0%, #30cf2d 100%);
          }

          &.short {
            background: linear-gradient(180deg, #ff2d2e 0%, #8f0001 100%);
          }

          &.close {
            background: linear-gradient(180deg, #991bf9 0%, #6400b0 100%);
          }

          &.next-day {
            background: linear-gradient(180deg, #02a3fe 0%, #7d40ff 100%);
          }
        }
      }
    }

    &.controls-container {
      height: 100%;
      background: $bg-color;
    }

    &.history-container {
      height: 100%;
      background: $bg-color;

      .head {
        color: #6a6ba0;
      }

      .game-mode {
        font-weight: 700;
      }

      .history-list {
        max-height: 280px;
        overflow: hidden;

        @include on-event() {
          overflow: overlay;
        }

        .history-item {
          &:first-child {
            margin-top: 16px;
          }

          .history-data {
            &.plus {
              color: #5eff5b;
            }

            &.minus {
              color: #ff2d2e;
            }
          }
        }
      }
    }
  }
`;

export const ChartDiv = styled.div`
  margin: 10px;
  height: 60vh;
  min-height: 60vh;
`;

export const ContainerDiv = styled.div`
  margin-bottom: 5rem;
`;

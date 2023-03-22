import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    user_2: {
      type: Object,
    },
    gain_loss: {
      type: Number,
      required: true,
    },
    profit: {
      type: Number,
      required: true,
    },
    game_mode: {
      type: String,
      required: true,
    },
    replay: {
      type: String,
    },
    owner: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("History", historySchema);

import mongoose from "mongoose";

const challengerSchema = new mongoose.Schema(
  {
    challenger: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    game_mode: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      // required: true,
    },
    to_challenge: {
      type: String,
      required: true,
    },
    history_id: {
      type: String,
      // required: true,
    },
    gain_loss: {
      type: Number,
      required: true,
    },
    profit: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Challenger", challengerSchema);

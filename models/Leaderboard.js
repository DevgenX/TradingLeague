import mongoose from "mongoose";

const leaderboardSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    mmr: {
      type: Number,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Leaderboard", leaderboardSchema);

import mongoose from "mongoose";

const bracketSchema = new mongoose.Schema(
  {
    nextGame: {
      type: Number,
    },
    bracketNo: {
      type: Number,
    },
    roundNo: {
      type: Number,
    },
    status: {
      type: Number,
    },
    teamNames: [],
    tournament_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Tournament",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Bracket", bracketSchema);

import { NextResponse } from "next/server";
import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://bentarramadhan:bentar@cvbentarramadhan.618cs.mongodb.net/?retryWrites=true&w=majority&appName=cvBentarramadhan";

// Koneksi MongoDB
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("✅ MongoDB Connected (rating)");
};

// Schema Rating
const ratingSchema = new mongoose.Schema({
  rating: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Rating = mongoose.models.Rating || mongoose.model("Rating", ratingSchema);

// POST: Tambah rating
export async function POST(req) {
  try {
    await connectDB();
    const { rating } = await req.json();

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 });
    }

    const newRating = new Rating({ rating });
    await newRating.save();
    return NextResponse.json(newRating, { status: 201 });
  } catch (error) {
    console.error("❌ Error in POST rating:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// GET: Ambil semua rating
export async function GET() {
  try {
    await connectDB();
    const ratings = await Rating.find().sort({ createdAt: -1 });
    return NextResponse.json(ratings, { status: 200 });
  } catch (error) {
    console.error("❌ Error in GET rating:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

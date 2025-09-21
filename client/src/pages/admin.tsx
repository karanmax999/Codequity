import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react"; // 👁 icons

const API_BASE = "http://localhost:8000/api/v1/admin"; // backend URL

interface Card {
  _id: string;
  Date: string;
  Hadding: string;
  Discription: string;
  location: string;
  Image: string;
  ImageId?: string;
  Link: string;
}

interface CardFormData {
  Date: string;
  Hadding: string;
  Discription: string;
  location: string;
  image: File | null;
  Link: string;
}

export default function AdminPanel() {
  const [password, setPassword] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [cards, setCards] = useState<Card[]>([]);
  const [formData, setFormData] = useState<CardFormData>({
    Date: "",
    Hadding: "",
    Discription: "",
    location: "",
    image: null,
    Link: "",
  });

  // Login
  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API_BASE}/login`, { password });
      if (res.data.success) {
        setIsLoggedIn(true);
      } else {
        alert("Invalid password!");
      }
    } catch (err) {
      console.error(err);
      alert("Error logging in");
    }
  };

  // Fetch cards
  const fetchCards = async () => {
    try {
      const res = await axios.get<Card[]>(`${API_BASE}/events`);
      setCards(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchCards();
  }, [isLoggedIn]);

  // Add card
  const handleAddCard = async (e: FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("Date", formData.Date);
    data.append("Hadding", formData.Hadding);
    data.append("Discription", formData.Discription);
    data.append("location", formData.location);
    data.append("Link", formData.Link);
    if (formData.image) data.append("image", formData.image);

    try {
      await axios.post(`${API_BASE}/create`, data);
      fetchCards();
      setFormData({
        Date: "",
        Hadding: "",
        Discription: "",
        location: "",
        image: null,
        Link: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Delete card
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_BASE}/event/${id}`);
      fetchCards();
    } catch (err) {
      console.error(err);
    }
  };

  // UI
  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <div className="bg-gray-900 p-6 rounded shadow-md w-80">
          <h2 className="text-xl font-bold mb-4">Admin Login</h2>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              className="border border-gray-700 bg-black text-white p-2 w-full pr-10"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <button
            onClick={handleLogin}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full mt-4"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      {/* Add Card Form */}
      <form
        onSubmit={handleAddCard}
        className="bg-gray-900 p-4 rounded shadow-md mb-6 grid gap-2"
      >
        <input
          type="text"
          placeholder="Date"
          className="border border-gray-700 bg-black text-white p-2"
          value={formData.Date}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, Date: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Hadding"
          className="border border-gray-700 bg-black text-white p-2"
          value={formData.Hadding}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, Hadding: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Discription"
          className="border border-gray-700 bg-black text-white p-2"
          value={formData.Discription}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, Discription: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Location"
          className="border border-gray-700 bg-black text-white p-2"
          value={formData.location}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, location: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Link (URL)"
          className="border border-gray-700 bg-black text-white p-2"
          value={formData.Link}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, Link: e.target.value })
          }
        />
        <input
          type="file"
          className="border border-gray-700 bg-black text-white p-2"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFormData({
              ...formData,
              image: e.target.files ? e.target.files[0] : null,
            })
          }
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Add Card
        </button>
      </form>

      {/* Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((c) => (
          <div key={c._id} className="bg-gray-900 p-4 rounded shadow-md">
            <img
              src={c.Image}
              alt={c.Hadding}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="text-lg font-bold mt-2">{c.Hadding}</h2>
            <p>{c.Discription}</p>
            <p className="text-sm text-gray-400">
              {c.Date} - {c.location}
            </p>
            <p className="text-blue-400 underline">
              <a href={c.Link} target="_blank" rel="noopener noreferrer">
                Visit Link
              </a>
            </p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleDelete(c._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
              {/* TODO: Add Edit feature here */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

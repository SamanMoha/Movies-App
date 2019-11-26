import axios from "axios";

const API_TOKEN = 'b5cb676487907eeeaf0fdbe36ce765ff'

export default axios.create({
  baseURL: "https://cors-anywhere.herokuapp.com/https://api.themoviedb.org/3",
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNWNiNjc2NDg3OTA3ZWVlYWYwZmRiZTM2Y2U3NjVmZiIsInN1YiI6IjVkZGQwM2RhNDI4NGVhMDAxMWY5ZmEwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xtzkz898dX8FPWZQ-Pko8jpbA29cePGDno1HnytLPec',
		//'api_key': 'b5cb676487907eeeaf0fdbe36ce765ff',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*'
  },
  responseType: "json"
});

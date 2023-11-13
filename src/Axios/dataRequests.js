import axios from "axios";
const baseURL = "http://localhost:5000/";

export async function GetData(url) {
    axios
        .get(baseURL + url)
        .then(data => {return data})
        .catch(err => {
            console.log(err);
            return null;
        });
}

export async function PostData(url, data) {
    axios
        .post(baseURL + url, data)
        .then(data => {return data})
        .catch(err => {
            console.log(err);
            return null;
        });
} 
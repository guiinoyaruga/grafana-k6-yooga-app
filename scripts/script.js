import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 2,
  duration: "5s",
};

export default function () {
  http.get("https://app.yooga.com.br/");
  sleep(3);
}

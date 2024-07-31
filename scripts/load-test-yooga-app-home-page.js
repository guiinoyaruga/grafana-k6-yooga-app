import http from "k6/http";
import { sleep , check} from "k6";

export const options = {
  stageS: [
    {duration:"5s", target: 10},
    {duration:"10s", target: 15},
    {duration:"1m30s", target: 30},
    {duration:"5m", target: 30},
  ],
};

export default function () {
  const resHomePage = http.get("https://app.yooga.com.br/");
  check(resHomePage, { "Ao acessar a página, o status foi 200": (r) => r.status == 200 });
  sleep(1);
}
